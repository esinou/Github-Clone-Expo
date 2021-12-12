import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { IssueHeader } from '../../issue/Header';
import { IssueComments } from '../../issue/Comments';
import { CommentSection } from '../../issue/Comment';
import { StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { commentThisIssue, octokitGETRequest, updateIssue } from '../../../api/Github';
import { Loading } from '../../../components/Loading';

export const SearchDetailsIssue = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [issue, setIssue] = useState(route.params.issue);
    const [repo, setRepo] = useState({});
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState('');
    const [lastScreen, setLastScreen] = useState('Search');
    const [comments, setComments] = useState(route.params.comments);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        await setComment('');
        await setCommentError('');
        await setIssue(route.params.issue);
        await setRepo(route.params.repo);
        await setComments(route.params.comments);
        await setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params]);

    const refreshComments = async () => {
        const comments = await octokitGETRequest(octokit, issue.comments_url);

        setComments(comments.data);
    };

    const onComment = async () => {
        setCommentError('');
        try {
            await commentThisIssue(octokit, repo.owner.login, repo.name, issue.number, comment);
            await refreshComments();
        } catch (e) {
            setCommentError(e.message);
        }
    };

    const updateIssueState = async (state) => {
        setLoading(true);
        try {
            await updateIssue(octokit, repo.owner.login, repo.name, issue.number, state);
            const thisIssue = await octokitGETRequest(octokit, issue.url);

            setIssue(thisIssue.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const onOpenIssue = async () => {
        await updateIssueState('open');
    };

    const onCloseIssue = async () => {
        await updateIssueState('closed');
    };

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
                onOpenIssue={onOpenIssue}
                onCloseIssue={onCloseIssue}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <StyledIssueTitle>{issue.title}</StyledIssueTitle>
                    <IssueComments comments={comments} />
                    <CommentSection
                        enabled={true}
                        onComment={onComment}
                        error={commentError}
                        text={comment}
                        setText={setComment}
                    />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export const StyledIssueTitle = styled.Text`
    color: rgb(0, 0, 0);
    font-size: 20px;
    margin: 10px 0;
    text-align: center;
    font-family: 'Montserrat_500Medium';
`;
