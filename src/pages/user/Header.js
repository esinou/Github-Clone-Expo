import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoBack } from '../../styled/Containers';
import { StyledFlex, StyledUsername } from '../../styled/Containers';
import { followThisUser, unfollowThisUser } from '../../api/Github';

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
    isFollowable,
    isFollowed,
    setIsFollowed,
    octokit,
}) => {
    const followOrUnfollow = async () => {
        if (isFollowed) {
            await unfollowThisUser(octokit, username);
            setIsFollowed(false);
        } else {
            await followThisUser(octokit, username);
            setIsFollowed(true);
        }
    };

    return (
        <StyledUserHeader isFollowable={isFollowable}>
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
            {isFollowable ? (
                <StyledFollowContainer onPress={followOrUnfollow}>
                    <Ionicons name={isFollowed ? 'person-remove' : 'person-add'} size={16} color="black" />
                </StyledFollowContainer>
            ) : (
                <></>
            )}
        </StyledUserHeader>
    );
};

const StyledFollowContainer = styled.TouchableOpacity`
    display: flex;
    width: 35px;
    height: 25px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
`;

const StyledUserHeader = styled.View`
    display: flex;
    align-items: center;
    height: ${({ isFollowable }) => (isFollowable ? '240px' : '200px')};
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

export { UserHeader };
