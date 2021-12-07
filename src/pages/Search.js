import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { getByUsername, getIssue, getRepository, searchThis } from '../api/Github';

const Search = ({ octokit, navigation }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [issuesAndPullRequests, setIssuesAndPullRequests] = useState([]);

    const searchEverything = async () => {
        if (search !== '') {
            setUsers([]);
            setRepos([]);
            setIssuesAndPullRequests([]);

            await searchSomething('users', setUsers, search);
            await searchSomething('repos', setRepos, search);
            await searchSomething('issuesAndPullRequests', setIssuesAndPullRequests, search);
        }
    };

    const searchSomething = async (path, setValue, q) => {
        try {
            const req = await searchThis(octokit, path, q);
            if (req?.status === 200 && req?.data?.items) {
                setValue(req.data.items);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onPressUserRow = async (username) => {
        navigation.navigate('SearchDetailsUser', {
            user: await getByUsername(octokit, username),
        });
    };

    const onPressRepoRow = async (owner, repo) => {
        navigation.navigate('SearchDetailsRepo', {
            repo: await getRepository(octokit, owner, repo),
        });
    };

    const onPressIssueRow = async (owner, repo, issue_number) => {
        navigation.navigate('SearchDetailsIssue', {
            issue: await getIssue(octokit, owner, repo, issue_number),
        });
    };

    return (
        <StyledContainerStartingTop>
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <StyledSearchRow>
                    <StyledInputContainer>
                        <Input value={search} disabled={false} onChange={setSearch} placeholder="Search something..." />
                    </StyledInputContainer>
                    <StyledButtonContainer>
                        <Button onPress={searchEverything} icon="search" />
                    </StyledButtonContainer>
                </StyledSearchRow>
                {users.length ? (
                    <DisplayRow list={users} onPressRow={onPressUserRow} displayType={DisplayType.user} label="Users" />
                ) : (
                    <></>
                )}
                {repos.length ? (
                    <DisplayRow
                        list={repos}
                        onPressRow={onPressRepoRow}
                        displayType={DisplayType.repo}
                        label="Repositories"
                    />
                ) : (
                    <></>
                )}
                {issuesAndPullRequests.length ? (
                    <DisplayRow
                        list={issuesAndPullRequests}
                        onPressRow={onPressIssueRow}
                        displayType={DisplayType.issue}
                        label="Issues & PR"
                    />
                ) : (
                    <></>
                )}
            </StyledScrollView>
        </StyledContainerStartingTop>
    );
};

const StyledInputContainer = styled.View`
    display: flex;
    flex: 4;
    margin-right: 15px;
`;

const StyledButtonContainer = styled.View`
    display: flex;
    flex: 1;
`;

const StyledSearchRow = styled.View`
    display: flex;
    flex-direction: row;
    position: relative;
    margin-top: 5px;
`;

export default Search;
