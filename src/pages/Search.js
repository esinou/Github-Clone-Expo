import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { getByUsername, getRepository, getUsersFollowers, getUsersFollowing, searchThis } from '../api/Github';

const Search = ({ octokit, navigation }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [repos, setRepos] = useState([]);
    const [reposPage, setReposPage] = useState(1);
    const [issues, setIssues] = useState([]);
    const [issuesPage, setIssuesPage] = useState(1);

    const onLoadMore = async (getFunction, currentPage, setNextPage, setData, data) => {
        let nextPageData = await getFunction(10, currentPage);

        if (currentPage === 1) {
            await nextPageData.data.items.shift();
            await nextPageData.data.items.shift();
        }

        setData([...data, ...nextPageData.data.items]);
        setNextPage(currentPage + 1);
    };

    const searchUsers = async (perPage, page) => searchThis(octokit, 'users', search, perPage, page);
    const searchRepos = async (perPage, page) => searchThis(octokit, 'repos', search, perPage, page);
    const searchIssues = async (perPage, page) => searchThis(octokit, 'issuesAndPullRequests', search, perPage, page);

    const searchEverything = async () => {
        if (search !== '') {
            resetResults();

            await searchSomething('users', setUsers, search, 2, usersPage);
            await searchSomething('repos', setRepos, search, 2, reposPage);
            await searchSomething('issuesAndPullRequests', setIssues, search, 2, issuesPage);
        }
    };

    const searchSomething = async (path, setValue, q, perPage, page) => {
        try {
            const req = await searchThis(octokit, path, q, perPage, page);
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
            followers: await getUsersFollowers(octokit, username),
            following: await getUsersFollowing(octokit, username),
            octokit: octokit,
            lastScreen: 'Search',
        });
    };

    const onPressRepoRow = async (owner, repo) => {
        navigation.navigate('SearchDetailsRepo', {
            repo: await getRepository(octokit, owner, repo),
            octokit,
            lastScreen: 'Search',
        });
    };

    const onPressIssueRow = async (issue, repo_url) => {
        const repo = await octokit.request(`GET ${repo_url}`);
        const comments = await octokit.request(`GET ${issue.comments_url}`);

        navigation.navigate('SearchDetailsIssue', {
            issue,
            repo: repo.data,
            comments: comments.data,
            octokit,
            lastScreen: 'Search',
        });
    };

    const resetResults = () => {
        setUsers([]);
        setRepos([]);
        setIssues([]);
        setUsersPage(1);
        setReposPage(1);
        setIssuesPage(1);
    };

    useEffect(() => {
        resetResults();
    }, [search]);

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
                    <DisplayRow
                        list={users}
                        onPressRow={onPressUserRow}
                        displayType={DisplayType.user}
                        onLoadMore={() => onLoadMore(searchUsers, usersPage, setUsersPage, setUsers, users)}
                        label="Users"
                    />
                ) : (
                    <></>
                )}
                {repos.length ? (
                    <DisplayRow
                        list={repos}
                        onPressRow={onPressRepoRow}
                        displayType={DisplayType.repo}
                        onLoadMore={() => onLoadMore(searchRepos, reposPage, setReposPage, setRepos, repos)}
                        label="Repositories"
                    />
                ) : (
                    <></>
                )}
                {issues.length ? (
                    <DisplayRow
                        list={issues}
                        onPressRow={onPressIssueRow}
                        displayType={DisplayType.issue}
                        onLoadMore={() => onLoadMore(searchIssues, issuesPage, setIssuesPage, setIssues, issues)}
                        label="Issues"
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
