import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { View } from 'react-native';

import { HeaderOptions } from './Header';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { SearchDetailsIssue, SearchDetailsRepo, SearchDetailsUser } from '../pages/SearchDetails';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <StyledTabBar>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                const labelIsBottomTabBar =
                    label === 'Home' ? true : label === 'Search' ? true : label === 'Profile' ? true : false;
                const iconName = label === 'Home' ? 'earth' : label.startsWith('Search') ? 'search' : 'person';
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return labelIsBottomTabBar ? (
                    <StyledIconContainer
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                    >
                        <Ionicons
                            name={!isFocused ? iconName + '-outline' : iconName}
                            size={25}
                            color={isFocused ? 'black' : 'rgba(0, 0, 0, .2)'}
                        />
                    </StyledIconContainer>
                ) : (
                    <View key={index} />
                );
            })}
        </StyledTabBar>
    );
};

export const TabScreen = ({ octokit, navigation }) => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            navigationOptions={{
                gesturesEnabled: false,
            }}
            screenOptions={HeaderOptions}
        >
            <Tab.Screen
                name="Home"
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                {(props) => <Home octokit={octokit} navigation={props.navigation} />}
            </Tab.Screen>
            <Tab.Screen
                name="Search"
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                {(props) => <Search octokit={octokit} navigation={props.navigation} />}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            >
                {(props) => <Profile octokit={octokit} navigation={props.navigation} />}
            </Tab.Screen>
            <Tab.Screen
                name="SearchDetailsUser"
                component={SearchDetailsUser}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="SearchDetailsRepo"
                component={SearchDetailsRepo}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="SearchDetailsIssue"
                component={SearchDetailsIssue}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

const StyledTabBar = styled.View`
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    background-color: white;
    flex-direction: row;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`;

const StyledIconContainer = styled.TouchableOpacity`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
