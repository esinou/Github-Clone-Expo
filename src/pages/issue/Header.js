import React from 'react';
import styled from 'styled-components/native';
import { GoBack, StyledFlex, StyledUsername } from '../../styled/Containers';

const IssueHeader = ({ goBack, navigation, repoName, lastScreen, owner, ownerAvatarUrl }) => (
    <StyledRepoHeader>
        <StyledNameHeader>
            {goBack ? (
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate(lastScreen)} />
                </StyledFlex>
            ) : (
                <></>
            )}
            <StyledUsername>{repoName}</StyledUsername>
            {goBack ? <StyledFlex /> : <></>}
        </StyledNameHeader>
        <StyledRowContainer>
            <StyledProfilePicture
                source={{
                    uri: ownerAvatarUrl,
                }}
            />
            <StyledOwnerName>{owner}</StyledOwnerName>
        </StyledRowContainer>
    </StyledRepoHeader>
);

const StyledOwnerName = styled.Text`
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    font-family: 'Montserrat_500Medium';
`;

const StyledProfilePicture = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.2);
    margin-right: 10px;
`;

const StyledCount = styled.Text`
    color: black;
    font-size: 15px;
`;

const StyledRowContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

const StyledRepoHeader = styled.View`
    display: flex;
    align-items: center;
    height: ${({ isFollowable }) => (isFollowable ? '240px' : '200px')};
    padding-top: 40px;
    width: 100%;
    background-color: black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

const StyledNameHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
`;

export { IssueHeader };
