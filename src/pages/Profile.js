import React, { useEffect, useState } from 'react';
import { StyledBio, UserHeader } from './search/Details';
import { InfoContainer, StyledContainerStartingTop, StyledScrollView } from '../styled/Containers';
import { getUserData, getUserFollowers, getUserFollowing } from '../api/Github';

const Profile = ({ octokit, navigation }) => {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(async () => {
        const userData = await getUserData(octokit);
        const userFollowers = await getUserFollowers(octokit);
        const userFollowing = await getUserFollowing(octokit);

        setUser(userData.data);
        setFollowers(userFollowers.data);
        setFollowing(userFollowing.data);
    }, []);

    return user !== {} ? (
        <>
            <UserHeader
                navigation={navigation}
                goBack={false}
                avatarUrl={user.avatar_url}
                username={user.login}
                followersCount={user.followers}
                followingCount={user.following}
                followers={followers}
                following={following}
                lastScreen="Profile"
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
                    <InfoContainer
                        iconName="lock-closed-outline"
                        label="Private repositories"
                        value={user.total_private_repos}
                    />
                    <InfoContainer iconName="star-outline" label="Stars" value={user.public_gists} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    ) : (
        <></>
    );
};

export default Profile;
