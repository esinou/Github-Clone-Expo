import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '@env';

import Splash from './src/pages/Splash';
import Login from './src/pages/Login';
import { TabScreen } from './src/navigation/TabNavigator';

import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

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
                screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: 'black',
                        height: 100,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontFamily: 'Montserrat_500Medium',
                    },
                }}
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
