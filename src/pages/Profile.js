import React, { useEffect, useState } from 'react';
import { UserHeader } from './search/Details';
import { StyledContainerStartingTop, StyledScrollView, StyledBio } from '../styled/Containers';
import { getUserData, getUserFollowers, getUserFollowing, getUserStarred } from '../api/Github';
import { UserProfile } from './user/Profile';

const Profile = ({ octokit, navigation }) => {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [starred, setStarred] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        const userData = await getUserData(octokit);
        const userFollowers = await getUserFollowers(octokit);
        const userFollowing = await getUserFollowing(octokit);
        const userStarred = await getUserStarred(octokit);

        setUser(userData.data);
        setFollowers(userFollowers.data);
        setFollowing(userFollowing.data);
        setStarred(userStarred.data);
        setLoading(false);
    }, []);

    const onPressStars = () => {
        navigation.navigate('UserRepositoriesDetails', {
            octokit,
            list: starred,
            lastScreen: 'Profile',
            label: 'Starred',
        });
    };

    return !loading ? (
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
                isFollowable={false}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <UserProfile octokit={octokit} navigation={navigation} user={user} starred={starred} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    ) : (
        <></>
    );
};

export default Profile;
