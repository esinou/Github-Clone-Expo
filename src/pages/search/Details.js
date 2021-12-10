import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { UserHeader } from '../user/Header';
import { RepoHeader } from '../repo/Header';
import { RepoFiles } from '../repo/Files';
import { StyledBio } from '../../styled/Containers';
import {
    getRepoBranch,
    getRepoBranches,
    getRepoForks,
    getRepoStarredByUser,
    getRepoWatchers,
    getThisRepoContent,
    getUserData,
    getUserStarred,
    octokitGETRequest,
} from '../../api/Github';
import { StyledContainerStartingTop, StyledScrollView } from '../../styled/Containers';
import { IssueHeader } from '../issue/Header';
import { IssueComments } from '../issue/Comments';
import { UserProfile } from '../user/Profile';
import { Loading } from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

export const SearchDetailsRepo = ({ navigation, route }) => {
    const [repo, setRepo] = useState(route.params.repo.data);
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);
    const { octokit } = route.params;
    const [isStarred, setIsStarred] = useState(false);
    const [content, setContent] = useState([]);
    const [branches, setBranches] = useState([route.params.repo.data.default_branch]);
    const [currentBranch, setCurrentBranch] = useState(route.params.repo.data.default_branch);
    const [path, setPath] = useState('');
    const [loading, setLoading] = useState(false);

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

    const actualiseContent = async (owner, name, path = '', branch) => {
        try {
            const content = await getThisRepoContent(octokit, owner, name, path, branch);

            await setContent(content.data);
        } catch (e) {
            setContent([]);
        }
    };

    const resetPath = async () => {
        setPath('');
        await actualiseContent(repo.owner.login, repo.name, '', currentBranch);
    };

    const enterThisFolder = async (folder) => {
        setPath(path + (path === '' ? '' : '/') + folder);
        await actualiseContent(repo.owner.login, repo.name, path + (path === '' ? '' : '/') + folder, currentBranch);
    };

    useEffect(async () => {
        await actualiseContent(repo.owner.login, repo.name, path, currentBranch);
    }, [currentBranch]);

    useEffect(async () => {
        setLoading(true);
        setRepo(route.params.repo.data);
        setPath('');
        setLastScreen(route.params.lastScreen);
        setCurrentBranch(route.params.repo.data.default_branch);
        try {
            const branchesData = await getRepoBranches(
                octokit,
                route.params.repo.data.owner.login,
                route.params.repo.data.name
            );

            setBranches(branchesData.data);
        } catch (e) {
            console.log(e);
        }
        const userStarredData = await getUserStarred(octokit);

        setIsStarred(repoExistsInArray(userStarredData.data, route.params.repo.data.name));
        await actualiseContent(
            route.params.repo.data.owner.login,
            route.params.repo.data.name,
            '',
            route.params.repo.data.default_branch
        );
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <Loading />
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
                        <StyledTextLabel>Current branch:</StyledTextLabel>
                        <Picker
                            selectedValue={currentBranch}
                            style={{ height: 50, width: 100, fontFamily: 'Montserrat_500Medium' }}
                            onValueChange={(el, i) => setCurrentBranch(el)}
                        >
                            {branches.map((element, index) => (
                                <Picker.Item label={element.name} value={element.name} key={index} />
                            ))}
                        </Picker>
                        {/*<StyledTextValue>{currentBranch}</StyledTextValue>*/}
                    </StyledRowContainer>
                    <StyledBio>{repo.description}</StyledBio>
                    {path !== '' ? (
                        <StyledTouchablePath onPress={resetPath}>
                            <Ionicons name="refresh-outline" size={25} color="black" />
                            <StyledTextValue>{path}</StyledTextValue>
                        </StyledTouchablePath>
                    ) : (
                        <></>
                    )}
                    <RepoFiles content={content} onUpdatePath={enterThisFolder} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const StyledTouchablePath = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

export const SearchDetailsIssue = ({ navigation, route }) => {
    const [issue, setIssue] = useState(route.params.issue);
    const [repo, setRepo] = useState({});
    const [lastScreen, setLastScreen] = useState('Search');
    const [comments, setComments] = useState(route.params.comments);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        await setIssue(route.params.issue);
        await setRepo(route.params.repo);
        await setComments(route.params.comments);
        await setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <Loading />
    ) : (
        <>
            <IssueHeader
                goBack={true}
                navigation={navigation}
                repoName={repo.name}
                lastScreen={lastScreen}
                owner={repo.owner.login}
                ownerAvatarUrl={repo.owner.avatar_url}
                state={issue.state}
                statusDate={issue.updated_at}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <StyledIssueTitle>{issue.title}</StyledIssueTitle>
                    <IssueComments comments={comments} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const StyledIssueTitle = styled.Text`
    color: rgb(0, 0, 0);
    font-size: 20px;
    margin: 10px 0;
    text-align: center;
    font-family: 'Montserrat_500Medium';
`;

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;
    const { octokit, followers, following } = route.params;
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowable, setIsFollowable] = useState(false);
    const [starred, setStarred] = useState([]);
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
        const starredData = await getRepoStarredByUser(octokit, user.login);

        await setStarred(starredData.data);
        await setIsFollowable(thisUser.data.login !== user.login);
        await setIsFollowed(userExistsInArray(followers.data, thisUser.data.login));
        setLoading(false);
    }, []);

    return loading ? (
        <Loading />
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
                    <UserProfile user={user} navigation={navigation} octokit={octokit} starred={starred} />
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
