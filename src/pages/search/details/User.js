import React, { useEffect, useState } from 'react';
import { Loading } from '../../../components/Loading';
import { UserHeader } from '../../user/Header';
import { UserProfile } from '../../user/Profile';
import { StyledContainerStartingTop, StyledScrollView } from '../../../styled/Containers';
import { getRepoStarredByUser, getUserData } from '../../../api/Github';

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;
    const { octokit, followers, following } = route.params;
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowable, setIsFollowable] = useState(false);
    const [starred, setStarred] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);

    const userExistsInArray = (table, username) => {
        return table.some(function (el) {
            return el.login === username;
        });
    };

    useEffect(() => {
        setLastScreen(route.params.lastScreen);
    }, [route.params.lastScreen]);

    useEffect(async () => {
        const thisUser = await getUserData(octokit);
        const starredData = await getRepoStarredByUser(octokit, user.login);

        await setStarred(starredData.data);
        await setIsFollowable(thisUser.data.login !== user.login);
        await setIsFollowed(userExistsInArray(followers.data, thisUser.data.login));
        setLoading(false);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            <UserHeader
                navigation={navigation}
                avatarUrl={user.avatar_url}
                username={user.login}
                followers={followers.data}
                following={following.data}
                followersCount={user.followers}
                followingCount={user.following}
                isFollowable={isFollowable}
                isFollowed={isFollowed}
                setIsFollowed={setIsFollowed}
                octokit={octokit}
                lastScreen={lastScreen}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <UserProfile user={user} navigation={navigation} octokit={octokit} starred={starred} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};
