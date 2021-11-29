import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import { TabScreen } from './src/navigation/TabNavigator';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                }}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                    name="Github"
                    component={TabScreen}
                    navigationOptions={{
                        gesturesEnabled: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
