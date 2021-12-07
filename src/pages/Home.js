import React, { useEffect, useState } from 'react';
import { DisplayRow, DisplayType } from './search/DisplayRows';
import { StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { getRepository, getUserIssues, getUserRepos, getUserStarred } from '../api/Github';

const Home = ({ octokit, navigation }) => {
    const [repos, setRepos] = useState([]);
    const [issues, setIssues] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const onPressRepoRow = async (owner, repo) => {
        navigation.navigate('SearchDetailsRepo', {
            repo: await getRepository(octokit, owner, repo),
        });
    };

    useEffect(async () => {
        const userRepos = await getUserRepos(octokit);
        const userIssues = await getUserIssues(octokit);
        const userFavorites = await getUserStarred(octokit);

        setRepos(userRepos.data);
        setIssues(userIssues.data);
        setFavorites(userFavorites.data);
    }, []);

    return (
        <StyledContainerStartingTop>
            <StyledScrollView showsVerticalScrollIndicator={false}>
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
        </StyledContainerStartingTop>
    );
};

export default Home;
