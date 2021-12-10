import React, { useCallback, useEffect, useState } from 'react';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { getRepository, getUserIssues, getUserRepos, getUserStarred } from '../api/Github';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native';

const Home = ({ octokit, navigation }) => {
    const [repos, setRepos] = useState([]);
    const [issues, setIssues] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(async () => {
        await getAllUserData();
    }, []);

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

    const getAllUserData = async () => {
        await setRepos([]);
        await setIssues([]);
        await setFavorites([]);

        const userRepos = await getUserRepos(octokit);
        const userIssues = await getUserIssues(octokit);
        const userFavorites = await getUserStarred(octokit);

        setRepos(userRepos.data);
        setIssues(userIssues.data);
        setFavorites(userFavorites.data);
    };

    const navigateToCreateRepo = () => {
        navigation.navigate('CreateRepository', {
            octokit,
        });
    };

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
                        onPressRow={onPressRepoRow}
                        displayType={DisplayType.issue}
                        label="My issues"
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
