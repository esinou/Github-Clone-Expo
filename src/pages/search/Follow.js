import { getByUsername, getUsersFollowers, getUsersFollowing } from '../../api/Github';
import { StyledContainerStartingTop, StyledScreenHeader, StyledScrollView } from '../../styled/Containers';
import { DisplayRow, DisplayType } from './DisplayRows';
import React from 'react';
import { GoBack, StyledFlex, StyledUsername } from './Details';

const FollowDetails = ({ navigation, octokit, lastScreen, list, label }) => {
    const onPressUserRow = async (username) => {
        navigation.navigate('SearchDetailsUser', {
            user: await getByUsername(octokit, username),
            followers: await getUsersFollowers(octokit, username),
            following: await getUsersFollowing(octokit, username),
            octokit: octokit,
        });
    };

    return (
        <>
            <StyledScreenHeader>
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate(lastScreen)} />
                </StyledFlex>
                <StyledUsername>{label}</StyledUsername>
                <StyledFlex />
            </StyledScreenHeader>
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <DisplayRow displayType={DisplayType.user} onPressRow={onPressUserRow} list={list} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const FollowersDetailsUser = ({ navigation, route }) => {
    const { octokit, followers, lastScreen } = route.params;

    return (
        <FollowDetails
            octokit={octokit}
            navigation={navigation}
            list={followers}
            label="Followers"
            lastScreen={lastScreen}
        />
    );
};

const FollowingDetailsUser = ({ navigation, route }) => {
    const { octokit, following, lastScreen } = route.params;

    return (
        <FollowDetails
            octokit={octokit}
            navigation={navigation}
            list={following}
            label="Following"
            lastScreen={lastScreen}
        />
    );
};

export { FollowersDetailsUser, FollowingDetailsUser };
