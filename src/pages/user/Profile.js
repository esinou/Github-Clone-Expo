import React from 'react';
import { TouchableOpacity } from 'react-native';
import { InfoContainer, StyledBio } from '../../styled/Containers';

const UserProfile = ({ user, navigation, octokit, starred }) => {
    const onPressStars = () => {
        navigation.navigate('UserRepositoriesDetails', {
            octokit,
            list: starred,
            lastScreen: 'Profile',
            label: 'Starred',
        });
    };

    return (
        <>
            {user.bio !== null ? <StyledBio>{user.bio}</StyledBio> : <></>}
            {user.name !== null && user.name !== '' ? <InfoContainer iconName="at" label={user.name} /> : <></>}
            <InfoContainer iconName="business-outline" label={user.company} />
            <InfoContainer iconName="file-tray-full-outline" label="Public repositories" value={user.public_repos} />
            <TouchableOpacity onPress={onPressStars}>
                <InfoContainer iconName="star-outline" label="Starred" value={starred.length} />
            </TouchableOpacity>
            {user.twitter_username !== null ? (
                <InfoContainer iconName="logo-twitter" label={user.twitter_username} />
            ) : (
                <></>
            )}
            {user.blog !== null && user.blog !== '' ? (
                <InfoContainer iconName="newspaper-outline" label={user.blog} />
            ) : (
                <></>
            )}
            {user.email !== null ? <InfoContainer iconName="mail-outline" label={user.email} /> : <></>}
        </>
    );
};

export { UserProfile };
