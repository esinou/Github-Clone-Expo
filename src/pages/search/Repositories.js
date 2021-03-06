import React, { useEffect, useState } from 'react';
import { getRepository } from '../../api/Github';
import {
    GoBack,
    StyledContainerStartingTop,
    StyledScreenHeader,
    StyledScrollView,
    StyledFlex,
    StyledUsername,
} from '../../styled/Containers';
import { DisplayRow, DisplayType } from './DisplayRows';
import { Loading } from '../../components/Loading';

const RepositoriesDetails = ({ navigation, octokit, lastScreen, list, label }) => {
    const onPressRepoRow = async (owner, repo) => {
        navigation.navigate('SearchDetailsRepo', {
            repo: await getRepository(octokit, owner, repo),
            octokit,
            lastScreen: 'Search',
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
                        <DisplayRow displayType={DisplayType.favorite} onPressRow={onPressRepoRow} list={list} />
                    ) : (
                        <></>
                    )}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

const UserRepositoriesDetails = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [lastScreen, setLastScreen] = useState(route.params.lastScreen);
    const [label, setLabel] = useState(route.params.label);
    const [list, setList] = useState(route.params.list);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setLoading(true);
        setList(route.params.list);
        setLastScreen(route.params.lastScreen);
        setLabel(route.params.label);
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <Loading />
    ) : (
        <RepositoriesDetails
            octokit={octokit}
            navigation={navigation}
            list={list}
            label={label}
            lastScreen={lastScreen}
        />
    );
};

export { UserRepositoriesDetails };
