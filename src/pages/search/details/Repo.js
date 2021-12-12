import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import {
    deleteRepo,
    getRepoBranches,
    getRepoForks,
    getRepoWatchers,
    getThisRepoContent,
    getUserStarred,
    octokitGETRequest,
} from '../../../api/Github';
import { Loading } from '../../../components/Loading';
import { RepoHeader } from '../../repo/Header';
import { StyledBio, StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { Button } from '../../../components/Button';
import { RepoFiles } from '../../repo/Files';
import { RepoDangerZone } from '../../repo/DangerZone';
import { CustomPicker } from '../../../components/Picker';

export const SearchDetailsRepo = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [repo, setRepo] = useState(route.params.repo.data);
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);
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

    const repoExistsInArray = (table, repoName) => table.some((el) => el.name === repoName);

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

    const onClickCreateIssue = () => {
        navigation.navigate('CreateAnIssue', {
            octokit,
            owner: repo.owner.login,
            repo: repo.name,
            lastScreen,
        });
    };

    const onClickCreatePR = async () => {
        navigation.navigate('CreateAPR', {
            octokit,
            branches: await octokitGETRequest(
                octokit,
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`
            ),
            defaultBranch: repo.default_branch,
            owner: repo.owner.login,
            repo: repo.name,
            lastScreen,
        });
    };

    const onClickDeleteRepo = async () => {
        if (repo.name === 'test') {
            try {
                await deleteRepo(octokit, repo.owner.login, repo.name);
                navigation.navigate('Home');
            } catch (e) {
                console.log(e);
            }
        }
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
                    <StyledButtonsRow>
                        <Button onPress={onClickCreateIssue} label="Create Issue" isHalf />
                        <Button onPress={onClickCreatePR} label="Create PR" isHalf />
                    </StyledButtonsRow>
                    <CustomPicker
                        value={currentBranch}
                        setValue={setCurrentBranch}
                        label="Current branch:"
                        list={branches}
                        elementLabel="name"
                    />
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
                    {repo.permissions.admin ? <RepoDangerZone onPressDeleteRepo={onClickDeleteRepo} /> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const StyledButtonsRow = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledTouchablePath = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

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
