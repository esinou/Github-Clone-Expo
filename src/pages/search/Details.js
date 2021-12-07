import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InfoContainer, StyledContainerStartingTop, StyledScrollView } from '../../styled/Containers';

export const SearchDetailsRepo = ({ navigation, route }) => {
    const repo = route.params.repo.data;

    useEffect(() => {
        console.log(repo);
    }, []);

    return <StyledContainerStartingTop></StyledContainerStartingTop>;
};

export const SearchDetailsIssue = ({ navigation, route }) => {
    const issue = route.params.issue.data;

    useEffect(() => {
        console.log(issue);
    }, []);

    return <StyledContainerStartingTop></StyledContainerStartingTop>;
};

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;

    const GoBack = () => (
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
    );

    return (
        <>
            <UserHeader>
                <StyledNameHeader>
                    <StyledFlex>
                        <GoBack />
                    </StyledFlex>
                    <StyledUsername>{user.name}</StyledUsername>
                    <StyledFlex />
                </StyledNameHeader>
                <StyledProfileHeader>
                    <StyledNameContainer alignment="right">
                        <StyledUsername>{user.followers}</StyledUsername>
                        <StyledName>Followers</StyledName>
                    </StyledNameContainer>
                    <StyledProfilePicture
                        source={{
                            uri: user.avatar_url,
                        }}
                    />
                    <StyledNameContainer alignment="left">
                        <StyledUsername>{user.following}</StyledUsername>
                        <StyledName>Following</StyledName>
                    </StyledNameContainer>
                </StyledProfileHeader>
            </UserHeader>
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    {user.bio !== null ? <StyledBio>{user.bio}</StyledBio> : <></>}
                    <InfoContainer iconName="business-outline" label={user.company} />
                    <InfoContainer
                        iconName="file-tray-full-outline"
                        label="Public repositories"
                        value={user.public_repos}
                    />
                    <InfoContainer iconName="star-outline" label="Stars" value={user.public_gists} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const StyledBio = styled.Text`
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-family: 'Montserrat_500Medium';
    margin: 10px 0;
`;

const StyledFlex = styled.View`
    display: flex;
    align-items: center;
    padding-left: -10px;
    justify-content: center;
    flex: 1;
`;

const UserHeader = styled.View`
    display: flex;
    align-items: center;
    height: 200px;
    padding-top: 40px;
    width: 100%;
    background-color: black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

const StyledName = styled.Text`
    font-size: 10px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    font-family: 'Montserrat_500Medium';
`;

const StyledUsername = styled.Text`
    font-size: 20px;
    color: white;
    font-family: 'Montserrat_500Medium';
`;

const StyledNameContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: ${({ alignment }) => (alignment === 'right' ? 'flex-end' : 'flex-start')};
    justify-content: center;
    text-align: ${({ alignment }) => (alignment === 'right' ? 'right' : 'left')};
`;

const StyledProfilePicture = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 50px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    margin: 12px 20px;
`;

const StyledNameHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const StyledProfileHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
`;
