import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Search from '../pages/Search';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

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
                const iconName = label === 'Home' ? 'home' : label === 'Search' ? 'search' : 'user';
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

                return (
                    <StyledIconContainer
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                    >
                        <Feather name={iconName} size={25} color={isFocused ? 'red' : 'black'} />
                    </StyledIconContainer>
                );
            })}
        </StyledTabBar>
    );
};

export const TabScreen = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            navigationOptions={{
                gesturesEnabled: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                navigationOptions={{
                    gesturesEnabled: false,
                }}
            />
        </Tab.Navigator>
    );
};

const StyledTabBar = styled.View`
    width: 100%;
    height: 85px;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
    background-color: white;
    flex-direction: row;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const StyledIconContainer = styled.TouchableOpacity`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
