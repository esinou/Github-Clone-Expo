import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '@env';

import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import { TabScreen } from './src/navigation/TabNavigator';

const Stack = createStackNavigator();

const App = () => {
    const octokit = new Octokit({
        auth: GITHUB_TOKEN,
    });

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login">
                    {(props) => <Login octokit={octokit} navigation={props.navigation} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Github"
                    navigationOptions={{
                        gesturesEnabled: false,
                    }}
                >
                    {(props) => <TabScreen octokit={octokit} navigation={props.navigation} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
