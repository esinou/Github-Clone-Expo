import React, { useEffect, useState } from 'react';
import { getByUsername, getUsersFollowers, getUsersFollowing } from '../../api/Github';
import {
    GoBack,
    StyledContainerStartingTop,
    StyledScreenHeader,
    StyledScrollView,
    StyledFlex,
    StyledUsername,
} from '../../styled/Containers';
import { DisplayRow, DisplayType } from './DisplayRows';

const FollowDetails = ({ navigation, octokit, lastScreen, list, label }) => {
    const onPressUserRow = async (username) => {
        navigation.navigate('SearchDetailsUser', {
            user: await getByUsername(octokit, username),
            followers: await getUsersFollowers(octokit, username),
            following: await getUsersFollowing(octokit, username),
            octokit: octokit,
            lastScreen,
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
                    {list.length ? (
                        <DisplayRow displayType={DisplayType.user} onPressRow={onPressUserRow} list={list} />
                    ) : (
                        <></>
                    )}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const UserFollowDetails = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);
    const [label, setLabel] = useState(route.params.label);
    const [list, setList] = useState(route.params.list);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        await setList(route.params.list);
        await setLastScreen(route.params.lastScreen);
        await setLabel(route.params.label);
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <></>
    ) : (
        <FollowDetails octokit={octokit} navigation={navigation} list={list} label={label} lastScreen={lastScreen} />
    );
};

export { UserFollowDetails };
