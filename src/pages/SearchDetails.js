import React, { useEffect } from 'react';
import styled from 'styled-components/native';

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <StyledContainer>
            <StyledProfileHeader>
                <StyledProfilePicture
                    source={{
                        uri: user.avatar_url,
                    }}
                />
                <StyledNameContainer>
                    <StyledUsername>{user.name}</StyledUsername>
                    <StyledName>{'@' + user.login}</StyledName>
                </StyledNameContainer>
            </StyledProfileHeader>
        </StyledContainer>
    );
};

export const SearchDetailsRepo = ({ navigation, route }) => {
    const repo = route.params.repo.data;

    useEffect(() => {
        console.log(repo);
    }, []);

    return <StyledContainer></StyledContainer>;
};

export const SearchDetailsIssue = ({ navigation, route }) => {
    const issue = route.params.issue.data;

    useEffect(() => {
        console.log(issue);
    }, []);

    return <StyledContainer></StyledContainer>;
};

const StyledName = styled.Text`
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.3);
`;

const StyledUsername = styled.Text`
    font-size: 20px;
`;

const StyledNameContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const StyledProfilePicture = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 50px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    margin-right: 15px;
`;

const StyledProfileHeader = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 10px 0;
`;

const StyledContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
`;
