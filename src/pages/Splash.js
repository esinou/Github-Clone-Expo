import React from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

const Splash = ({ navigation }) => {
    return (
        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Splash</Text>
            <Button title="Aller sur la page login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default Splash;
