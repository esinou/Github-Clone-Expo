import React, { useState } from 'react';
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
import { createRepo } from '../../api/Github';
import { Checkbox } from '../../components/Checkbox';

export const CreateRepository = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [repository, setRepository] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [error, setError] = useState('');

    const createNewRepository = async () => {
        setError('');
        try {
            const repo = await createRepo(octokit, repository, description, isPrivate);

            navigation.navigate('SearchDetailsRepo', {
                repo,
                octokit,
                lastScreen: 'Home',
            });
        } catch (e) {
            setError(e.message);
        }
    };

    return (
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
                    {error !== '' ? <StyledErrorLabel>{error}</StyledErrorLabel> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export const StyledErrorLabel = styled.Text`
    color: rgba(255, 0, 0, 0.5);
    font-size: 14px;
    font-family: 'Montserrat_500Medium';
    margin-top: 10px;
    text-align: center;
`;
