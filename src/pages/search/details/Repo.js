import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';
import { Ionicons } from '@expo/vector-icons';
import {
    deleteRepo,
    getRepoBranches,
    getRepoForks,
    getRepoWatchers,
    getThisRepoContent,
    getUserStarred,
} from '../../../api/Github';
import { Loading } from '../../../components/Loading';
import { RepoHeader } from '../../repo/Header';
import { StyledBio, StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { Button } from '../../../components/Button';
import { RepoFiles } from '../../repo/Files';
import { RepoDangerZone } from '../../repo/DangerZone';

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

    const onClickCreateIssue = () => {
        navigation.navigate('CreateAnIssue', {
            octokit,
            owner: repo.owner.login,
            repo: repo.name,
            lastScreen,
        });
    };

    const onClickCreatePR = async () => {
        navigation.navigate();
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
                    <RepoDangerZone onPressDeleteRepo={onClickDeleteRepo} />
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
