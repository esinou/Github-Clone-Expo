import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { getRepository, getUserRepos, getUserStarred, octokitGETRequest } from '../api/Github';

const Home = ({ octokit, navigation }) => {
    const [repos, setRepos] = useState([]);
    const [reposPage, setReposPage] = useState(1);
    const [issues, setIssues] = useState([]);
    const [pulls, setPulls] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoritesPage, setFavoritesPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setReposPage(1);
        setFavoritesPage(1);
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
        const repo = await octokitGETRequest(octokit, repo_url);
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
        const issuesPos = pull.issue_url.search('/issues');
        const repo = await octokitGETRequest(octokit, pull.issue_url.substring(0, issuesPos));
        const comments = await octokitGETRequest(octokit, pull.comments_url);

        navigation.navigate('SearchDetailsPull', {
            repo: repo.data,
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

        if (issuesUrlList.length > 0) {
            const issuesPromise = issuesUrlList.map(async (element) => {
                const repoIssues = await octokitGETRequest(octokit, element);

                return repoIssues.data;
            });

            Promise.all(issuesPromise).then((result) => {
                setIssues(result.reduce((prev, curr) => [...prev, ...curr]));
            });
        }

        if (pullsUrlList.length > 0) {
            const pullsPromise = pullsUrlList.map(async (element) => {
                const repoPulls = await octokitGETRequest(octokit, element);

                return repoPulls.data;
            });

            Promise.all(pullsPromise).then((result) => {
                setPulls(result.reduce((prev, curr) => [...prev, ...curr]));
            });
        }
    };

    const onLoadMore = async (getFunction, currentPage, setNextPage, setData, data) => {
        let nextPageData = await getFunction(octokit, 10, currentPage);

        if (currentPage === 1) {
            await nextPageData.data.shift();
            await nextPageData.data.shift();
        }

        setData([...data, ...nextPageData.data]);
        setNextPage(currentPage + 1);
        await getUserIssuesAndPR([...data, ...nextPageData.data]);
    };

    const getAllUserData = async () => {
        setRepos([]);
        setIssues([]);
        setPulls([]);
        setFavorites([]);
        setReposPage(1);
        setFavoritesPage(1);

        const userRepos = await getUserRepos(octokit, 2, 0);
        const userFavorites = await getUserStarred(octokit, 2, 0);

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
                        onLoadMore={() => onLoadMore(getUserRepos, reposPage, setReposPage, setRepos, repos)}
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
                        loadingMode="old"
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
                        loadingMode="old"
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
                        onLoadMore={() =>
                            onLoadMore(getUserStarred, favoritesPage, setFavoritesPage, setFavorites, favorites)
                        }
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
