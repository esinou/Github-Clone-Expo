import React, { useEffect, useState } from 'react';
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
import { createAPR } from '../../api/Github';
import { Loading } from '../../components/Loading';
import { StyledErrorLabel } from './Repository';
import { CustomPicker } from '../../components/Picker';

export const CreateAPR = ({ navigation, route }) => {
    const { octokit } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [head, setHead] = useState(route.params.defaultBranch);
    const [base, setBase] = useState(route.params.defaultBranch);
    const [owner, setOwner] = useState(route.params.owner);
    const [repo, setRepo] = useState(route.params.repo);
    const [lastScreen, setLastScreen] = useState('Search');
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [error, setError] = useState('');

    const createNewPR = async () => {
        setError('');
        try {
            const pr = await createAPR(octokit, owner, repo, head, base, title, description);

            navigation.navigate('SearchDetailsPull', {
                pull: pr.data,
                comments: [],
                octokit,
                lastScreen,
            });
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(async () => {
        setLoading(true);
        setTitle('');
        setDescription('');
        setError('');
        setBase(route.params.defaultBranch);
        setHead(route.params.defaultBranch);
        setBranches(route.params.branches.data);
        setOwner(route.params.owner);
        setRepo(route.params.repo);
        setLastScreen(route.params.lastScreen);
        setLoading(false);
    }, [route.params]);

    return loading ? (
        <Loading />
    ) : (
        <>
            <StyledScreenHeader>
                <StyledFlex>
                    <GoBack onPress={() => navigation.navigate(lastScreen)} />
                </StyledFlex>
                <StyledUsername>Create an issue</StyledUsername>
                <StyledFlex />
            </StyledScreenHeader>
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        value={title}
                        onChange={setTitle}
                        iconName="folder-open-outline"
                        placeholder="Enter PR title"
                    />
                    <Input
                        value={description}
                        onChange={setDescription}
                        iconName="document-text-outline"
                        placeholder="Enter PR description"
                        isBig
                    />
                    <CustomPicker
                        value={head}
                        setValue={setHead}
                        label="Head branch:"
                        list={branches}
                        elementLabel="name"
                    />
                    <CustomPicker
                        value={base}
                        setValue={setBase}
                        label="Base branch:"
                        list={branches}
                        elementLabel="name"
                    />
                    <Button label="Create a PR" onPress={createNewPR} />
                    {error !== '' ? <StyledErrorLabel>{error}</StyledErrorLabel> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};
