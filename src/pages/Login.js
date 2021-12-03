import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GITHUB_TOKEN } from '@env';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { StyledContainer } from '../styled/Container';

const Login = ({ navigation, octokit }) => {
    const connect = () => {
        if (GITHUB_TOKEN === '' || GITHUB_TOKEN === undefined) {
            // Erreur
        } else {
            navigation.navigate('Github');
        }
    };

    return (
        <StyledContainer>
            <StatusBar backgroundColor="light" />
            <Input value={GITHUB_TOKEN} disabled />
            <Button onPress={connect} label="Connect to my account" />
        </StyledContainer>
    );
};

export default Login;
