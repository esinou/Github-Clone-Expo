import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import styled from 'styled-components/native';

const Login = ({ navigation, octokit }) => {
    return (
        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <StyledButton title="Aller sur le home" onPress={() => navigation.navigate('Github')} />
            <TextInput />
        </View>
    );
};

const StyledButton = styled.Button`
    display: flex;
    background-color: transparent;
    border: 1px solid black;
`;

export default Login;
