import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { UserHeader } from '../user/Header';
import { RepoHeader } from '../repo/Header';
import { RepoFiles } from '../repo/Files';
import { StyledBio } from '../../styled/Containers';
import { getRepoForks, getRepoWatchers, getThisRepoContent, getUserData, getUserStarred } from '../../api/Github';
import { InfoContainer, StyledContainerStartingTop, StyledScrollView } from '../../styled/Containers';
import { IssueHeader } from '../issue/Header';

export const SearchDetailsRepo = ({ navigation, route }) => {
    const [repo, setRepo] = useState(route.params.repo.data);
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);
    const { octokit } = route.params;
    const [isStarred, setIsStarred] = useState(false);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    const onPressFork = async () => {
        const forks = await getRepoForks(octokit, repo.owner.login, repo.name);

        navigation.navigate('UserFollowDetails', {
            octokit,
            list: forks.data,
            lastScreen,
            label: 'Forks',
        });
    };

    const onPressWatch = async () => {
        const watchers = await getRepoWatchers(octokit, repo.owner.login, repo.name);

        navigation.navigate('UserFollowDetails', {
            octokit,
            list: watchers.data,
            lastScreen,
            label: 'Watchers',
        });
    };

    const repoExistsInArray = (table, repoName) => {
        return table.some(function (el) {
            return el.name === repoName;
        });
    };

    const actualiseContent = async () => {
        const content = await getThisRepoContent(octokit, repo.owner.login, repo.name);

        await setContent(content.data);
    };

    useEffect(async () => {
        setLoading(true);
        await setRepo(route.params.repo.data);
        const userStarredData = await getUserStarred(octokit);

        setIsStarred(repoExistsInArray(userStarredData.data, repo.name));
        await actualiseContent();
        setLoading(false);
    }, [route.params.repo]);

    useEffect(() => {
        setLastScreen(route.params.lastScreen);
    }, [route.params.lastScreen]);

    return loading ? (
        <></>
    ) : (
        <>
            <RepoHeader
                goBack={true}
                navigation={navigation}
                repoName={repo.name}
                lastScreen={lastScreen}
                isStarred={isStarred}
                setIsStarred={setIsStarred}
                forksCount={repo.forks_count}
                watchersCount={repo.watchers_count}
                owner={repo.owner.login}
                ownerAvatarUrl={repo.owner.avatar_url}
                octokit={octokit}
                onPressFork={onPressFork}
                onPressWatch={onPressWatch}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <StyledRowContainer>
                        <StyledTextLabel>Default branch:</StyledTextLabel>
                        <StyledTextValue>{repo.default_branch}</StyledTextValue>
                    </StyledRowContainer>
                    <StyledBio>{repo.description}</StyledBio>
                    <RepoFiles content={content} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export const SearchDetailsIssue = ({ navigation, route }) => {
    const [issue, setIssue] = useState(route.params.issue);
    const [repo, setRepo] = useState({});
    const [lastScreen, setLastScreen] = useState('Search');
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        await setIssue(route.params.issue);
        await setRepo(route.params.repo.data);
        await setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params.issue]);

    return loading ? (
        <></>
    ) : (
        <>
            <IssueHeader
                goBack={true}
                navigation={navigation}
                repoName={repo.name}
                lastScreen={lastScreen}
                owner={repo.owner.login}
                ownerAvatarUrl={repo.owner.avatar_url}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}></StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;
    const { octokit, followers, following } = route.params;
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowable, setIsFollowable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);

    const userExistsInArray = (table, username) => {
        return table.some(function (el) {
            return el.login === username;
        });
    };

    useEffect(() => {
        setLastScreen(route.params.lastScreen);
    }, [route.params.lastScreen]);

    useEffect(async () => {
        const thisUser = await getUserData(octokit);

        await setIsFollowable(thisUser.data.login !== user.login);
        await setIsFollowed(userExistsInArray(followers.data, thisUser.data.login));
        setLoading(false);
    }, []);

    return loading ? (
        <></>
    ) : (
        <>
            <UserHeader
                navigation={navigation}
                avatarUrl={user.avatar_url}
                username={user.login}
                followers={followers.data}
                following={following.data}
                followersCount={user.followers}
                followingCount={user.following}
                isFollowable={isFollowable}
                isFollowed={isFollowed}
                setIsFollowed={setIsFollowed}
                octokit={octokit}
                lastScreen={lastScreen}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    {user.bio !== null ? <StyledBio>{user.bio}</StyledBio> : <></>}
                    {user.name !== null && user.name !== '' ? <InfoContainer iconName="at" label={user.name} /> : <></>}
                    <InfoContainer iconName="business-outline" label={user.company} />
                    <InfoContainer
                        iconName="file-tray-full-outline"
                        label="Public repositories"
                        value={user.public_repos}
                    />
                    <InfoContainer iconName="star-outline" label="Stars" value={user.public_gists} />
                    {user.twitter_username !== null ? (
                        <InfoContainer iconName="logo-twitter" label={user.twitter_username} />
                    ) : (
                        <></>
                    )}
                    {user.blog !== null && user.blog !== '' ? (
                        <InfoContainer iconName="newspaper-outline" label={user.blog} />
                    ) : (
                        <></>
                    )}
                    {user.email !== null ? <InfoContainer iconName="mail-outline" label={user.email} /> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const StyledTextValue = styled.Text`
    font-size: 14px;
    margin: 0 2px;
    font-family: 'Montserrat_500Medium';
`;

const StyledTextLabel = styled(StyledTextValue)`
    color: rgba(0, 0, 0, 0.5);
`;

const StyledRowContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export { UserHeader };
