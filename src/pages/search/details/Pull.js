import React, { useEffect, useState } from 'react';
import { IssueHeader } from '../../issue/Header';
import { PullMergeText } from '../../issue/Merge';
import { IssueComments } from '../../issue/Comments';
import { Loading } from '../../../components/Loading';
import { StyledBio, StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { StyledIssueTitle } from './Issue';
import { Alert } from 'react-native';
import { octokitGETRequest, updatePR } from '../../../api/Github';

export const SearchDetailsPull = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [pull, setPull] = useState(route.params.issue);
    const [repo, setRepo] = useState({});
    const [lastScreen, setLastScreen] = useState('Search');
    const [comments, setComments] = useState(route.params.comments);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        setPull(route.params.pull);
        setRepo(route.params.repo);
        setComments(route.params.comments);
        setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params]);

    const updatePRState = async (state) => {
        setLoading(true);
        try {
            await updatePR(octokit, repo.owner.login, repo.name, pull.number, state);
            const thisPR = await octokitGETRequest(octokit, pull.url);

            setPull(thisPR.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const onOpenPR = async () => {
        await updatePRState('open');
    };

    const onClosePR = async () => {
        await updatePRState('closed');
    };

    const onPressStatus = (state) => {
        if (state === 'open') {
            Alert.alert('Close this PR', 'Do you really want to close this PR ?', [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                { text: 'Yes', onPress: onClosePR },
            ]);
        } else {
            Alert.alert('Re-Open this PR', 'Do you really want to re-open this PR ?', [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                { text: 'Yes', onPress: onOpenPR },
            ]);
        }
    };

    return loading ? (
        <Loading />
    ) : (
        <>
            <IssueHeader
                goBack={true}
                navigation={navigation}
                repoName={pull.base.repo.name}
                lastScreen={lastScreen}
                owner={pull.base.repo.owner.login}
                ownerAvatarUrl={pull.base.repo.owner.avatar_url}
                state={pull.state}
                statusDate={pull.updated_at}
                onPressStatus={onPressStatus}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <StyledIssueTitle>{pull.title}</StyledIssueTitle>
                    {pull.body !== null ? <StyledBio>{pull.body}</StyledBio> : <></>}
                    <PullMergeText author={pull.user.login} base={pull.base.ref} head={pull.head.ref} />
                    <IssueComments comments={comments} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};
