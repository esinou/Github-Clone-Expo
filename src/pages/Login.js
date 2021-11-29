import React from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

const Login = ({ navigation }) => {
    return (
        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login</Text>
            <Button title="Aller sur le home" onPress={() => navigation.navigate('Github')} />
        </View>
    );
};

export default Login;
