import React, { useEffect, useState } from 'react';
import {
    GoBack,
    StyledContainerStartingTop,
    StyledFlex,
    StyledScreenHeader,
    StyledScrollView,
    StyledUsername,
} from '../../styled/Containers';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { createAnIssue, getIssue, octokitGETRequest } from '../../api/Github';
import { Loading } from '../../components/Loading';
import { StyledErrorLabel } from './Repository';

export const CreateAnIssue = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState(route.params.owner);
    const [repo, setRepo] = useState(route.params.repo);
    const [lastScreen, setLastScreen] = useState('Search');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createNewIssue = async () => {
        setError('');
        try {
            const issue = await createAnIssue(octokit, owner, repo, title, description);
            const issueData = await getIssue(octokit, owner, repo, issue.data.number);
            const repoData = await octokitGETRequest(octokit, issue.data.repository_url);
            const comments = await octokitGETRequest(octokit, issue.data.comments_url);

            navigation.navigate('SearchDetailsIssue', {
                issue: issueData.data,
                repo: repoData.data,
                comments: comments.data,
                octokit,
                lastScreen,
            });
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(async () => {
        setLoading(true);
        await setTitle('');
        await setDescription('');
        await setError('');
        await setOwner(route.params.owner);
        await setRepo(route.params.repo);
        await setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <Loading />
    ) : (
        <>
            <StyledScreenHeader>
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate(lastScreen)} />
                </StyledFlex>
                <StyledUsername>Create an issue</StyledUsername>
                <StyledFlex />
            </StyledScreenHeader>
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        value={title}
                        onChange={setTitle}
                        iconName="folder-open-outline"
                        placeholder="Enter issue title"
                    />
                    <Input
                        value={description}
                        onChange={setDescription}
                        iconName="document-text-outline"
                        placeholder="Enter issue description"
                        isBig
                    />
                    <Button label="Create an issue" onPress={createNewIssue} />
                    {error !== '' ? <StyledErrorLabel>{error}</StyledErrorLabel> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};
