import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '@env';
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import { TabScreen } from './src/navigation/TabNavigator';
import { HeaderOptions } from './src/navigation/Header';

const Stack = createStackNavigator();

const App = () => {
    let [fontsLoaded] = useFonts({
        Montserrat_500Medium,
    });

    const octokit = new Octokit({
        auth: GITHUB_TOKEN,
    });

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={HeaderOptions}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    options={{
                        title: 'Login',
                        headerLeft: () => null,
                    }}
                >
                    {(props) => <Login octokit={octokit} navigation={props.navigation} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Github"
                    navigationOptions={{
                        gesturesEnabled: false,
                    }}
                    options={{
                        headerShown: false,
                    }}
                >
                    {(props) => <TabScreen octokit={octokit} navigation={props.navigation} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
