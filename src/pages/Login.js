import React from 'react';
import { View } from 'react-native';
import { GITHUB_TOKEN } from '@env';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { StyledContainer } from '../styled/Containers';
import { FontAwesome } from '@expo/vector-icons';

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
            <FontAwesome name="github" size={100} color="black" />
            <View style={{ height: 100 }} />
            <Input iconName="apps-outline" value={GITHUB_TOKEN} disabled />
            <Button onPress={connect} label="Connect to my account" />
        </StyledContainer>
    );
};

export default Login;
