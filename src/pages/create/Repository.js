import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
    GoBack,
    StyledContainerStartingTop,
    StyledFlex,
    StyledScreenHeader,
    StyledScrollView,
    StyledUsername,
} from '../../styled/Containers';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { createRepo, getUserData } from '../../api/Github';
import { Loading } from '../../components/Loading';
import { Checkbox } from '../../components/Checkbox';

export const CreateRepository = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [repository, setRepository] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [loading, setLoading] = useState(false);

    const createNewRepository = async () => {
        try {
            const req = await createRepo(octokit, repository, description, isPrivate);
            console.log(req);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(async () => {
        setLoading(true);
        setLoading(false);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            <StyledScreenHeader>
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate('Home')} />
                </StyledFlex>
                <StyledUsername>Create a repository</StyledUsername>
                <StyledFlex />
            </StyledScreenHeader>
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        value={repository}
                        onChange={setRepository}
                        iconName="folder-open-outline"
                        placeholder="Enter repository name"
                    />
                    <Input
                        value={description}
                        onChange={setDescription}
                        iconName="document-text-outline"
                        placeholder="Enter repository description"
                        isBig
                    />
                    <Checkbox value={isPrivate} setValue={setIsPrivate} label="Repository is private ?" />
                    <Button label="Create" onPress={createNewRepository} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};
