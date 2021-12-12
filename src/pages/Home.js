import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { getRepository, getUserRepos, getUserStarred, octokitGETRequest } from '../api/Github';

const Home = ({ octokit, navigation }) => {
    const [repos, setRepos] = useState([]);
    const [issues, setIssues] = useState([]);
    const [pulls, setPulls] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getAllUserData();
        setRefreshing(false);
    }, []);

    const onPressRepoRow = async (owner, repo) => {
        navigation.navigate('SearchDetailsRepo', {
            repo: await getRepository(octokit, owner, repo),
            octokit,
            lastScreen: 'Home',
        });
    };

    const onPressIssueRow = async (issue, repo_url) => {
        const repo = await octokit.request(`GET ${repo_url}`);
        const comments = await octokitGETRequest(octokit, issue.comments_url);

        navigation.navigate('SearchDetailsIssue', {
            issue,
            repo: repo.data,
            comments: comments.data,
            octokit,
            lastScreen: 'Home',
        });
    };

    const onPressPullRow = async (pull) => {
        const comments = await octokitGETRequest(octokit, pull.comments_url);

        navigation.navigate('SearchDetailsPull', {
            pull,
            comments: comments.data,
            octokit,
            lastScreen: 'Home',
        });
    };

    const getUserIssuesAndPR = (repos) => {
        let issuesUrlList = [];
        let pullsUrlList = [];

        repos.forEach((element) => {
            if (element.open_issues_count > 0) {
                issuesUrlList.push(`https://api.github.com/repos/${element.owner.login}/${element.name}/issues`);
                pullsUrlList.push(`https://api.github.com/repos/${element.owner.login}/${element.name}/pulls`);
            }
        });

        const issuesPromise = issuesUrlList.map(async (element) => {
            const repoIssues = await octokitGETRequest(octokit, element);

            return repoIssues.data;
        });

        const pullsPromise = pullsUrlList.map(async (element) => {
            const repoPulls = await octokitGETRequest(octokit, element);

            return repoPulls.data;
        });

        Promise.all(issuesPromise).then((result) => {
            setIssues(
                result.reduce((prev, curr) => {
                    return [...prev, ...curr];
                })
            );
        });

        Promise.all(pullsPromise).then((result) => {
            setPulls(
                result.reduce((prev, curr) => {
                    return [...prev, ...curr];
                })
            );
        });
    };

    const getAllUserData = async () => {
        await setRepos([]);
        await setIssues([]);
        await setFavorites([]);

        const userRepos = await getUserRepos(octokit);
        const userFavorites = await getUserStarred(octokit);

        getUserIssuesAndPR(userRepos.data);

        setRepos(userRepos.data);
        setFavorites(userFavorites.data);
    };

    const navigateToCreateRepo = () => {
        navigation.navigate('CreateRepository', {
            octokit,
        });
    };

    useEffect(async () => {
        await getAllUserData();
    }, []);

    return (
        <StyledContainerStartingTop>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {repos.length ? (
                    <DisplayRow
                        list={repos}
                        onPressRow={onPressRepoRow}
                        displayType={DisplayType.repo}
                        label="My repositories"
                    />
                ) : (
                    <></>
                )}
                {issues.length ? (
                    <DisplayRow
                        list={issues}
                        onPressRow={onPressIssueRow}
                        displayType={DisplayType.issue}
                        label="My issues"
                    />
                ) : (
                    <></>
                )}
                {pulls.length ? (
                    <DisplayRow
                        list={pulls}
                        onPressRow={onPressPullRow}
                        displayType={DisplayType.pull}
                        label="My pull requests"
                    />
                ) : (
                    <></>
                )}
                {favorites.length ? (
                    <DisplayRow
                        list={favorites}
                        onPressRow={onPressRepoRow}
                        displayType={DisplayType.favorite}
                        label="My favorites"
                    />
                ) : (
                    <></>
                )}
            </StyledScrollView>
            <StyledPlusContainer onPress={navigateToCreateRepo}>
                <Ionicons name="add-outline" size={35} color="white" />
            </StyledPlusContainer>
        </StyledContainerStartingTop>
    );
};

const StyledPlusContainer = styled.TouchableOpacity`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 45px;
    border-radius: 15px;
    height: 45px;
    bottom: 10px;
    right: 0px;
    background-color: black;
`;

export default Home;
