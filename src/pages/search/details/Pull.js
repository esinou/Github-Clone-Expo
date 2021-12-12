import React, { useEffect, useState } from 'react';
import { IssueHeader } from '../../issue/Header';
import { PullMergeText } from '../../issue/Merge';
import { IssueComments } from '../../issue/Comments';
import { Loading } from '../../../components/Loading';
import { StyledBio, StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { StyledIssueTitle } from './Issue';

export const SearchDetailsPull = ({ navigation, route }) => {
    const [pull, setPull] = useState(route.params.issue);
    const [lastScreen, setLastScreen] = useState('Search');
    const [comments, setComments] = useState(route.params.comments);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        await setPull(route.params.pull);
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
                repoName={pull.base.repo.name}
                lastScreen={lastScreen}
                owner={pull.base.repo.owner.login}
                ownerAvatarUrl={pull.base.repo.owner.avatar_url}
                state={pull.state}
                statusDate={pull.updated_at}
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
