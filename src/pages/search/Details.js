import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    InfoContainer,
    StyledContainerStartingTop,
    StyledScreenHeader,
    StyledScrollView,
} from '../../styled/Containers';
import { DisplayRow, DisplayType } from './DisplayRows';
import { getByUsername, getUsersFollowers, getUsersFollowing } from '../../api/Github';

export const GoBack = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Ionicons name="arrow-back" size={25} color="white" />
    </TouchableOpacity>
);

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

const UserHeader = ({
    navigation,
    goBack = true,
    lastScreen = 'Search',
    username,
    avatarUrl,
    followers,
    following,
    followersCount,
    followingCount,
    octokit,
}) => (
    <StyledUserHeader>
        <StyledNameHeader>
            {goBack ? (
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate(lastScreen)} />
                </StyledFlex>
            ) : (
                <></>
            )}
            <StyledUsername>{username}</StyledUsername>
            {goBack ? <StyledFlex /> : <></>}
        </StyledNameHeader>
        <StyledProfileHeader>
            <TouchableOpacity
                onPress={() => navigation.navigate('FollowersDetailsUser', { octokit, followers, lastScreen })}
            >
                <StyledNameContainer alignment="right">
                    <StyledUsername>{followersCount}</StyledUsername>
                    <StyledName>Followers</StyledName>
                </StyledNameContainer>
            </TouchableOpacity>
            <StyledProfilePicture
                source={{
                    uri: avatarUrl,
                }}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('FollowingDetailsUser', { octokit, following, lastScreen })}
            >
                <StyledNameContainer alignment="left">
                    <StyledUsername>{followingCount}</StyledUsername>
                    <StyledName>Following</StyledName>
                </StyledNameContainer>
            </TouchableOpacity>
        </StyledProfileHeader>
    </StyledUserHeader>
);

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;
    const { octokit, followers, following } = route.params;
    // const isFollowable = user.total_private_repos ? false : user.total_private_repos === 0 ? false : true;
    // const isFollowed = false;

    return (
        <>
            <UserHeader
                navigation={navigation}
                avatarUrl={user.avatar_url}
                username={user.login}
                followers={followers.data}
                following={following.data}
                followersCount={user.followers}
                followingCount={user.following}
                octokit={octokit}
            />
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

const StyledUserHeader = styled.View`
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
    border-color: rgba(255, 255, 255, 0.2);
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

export { UserHeader, StyledBio, StyledFlex, StyledUsername };
