import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../pages/Search';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.global_tab_bar}>
            <View style={styles.global_tab_bar_inside}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

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
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.view_global_button}
                            key={index}
                        >
                            <View style={isFocused ? styles.icon_container_focused : styles.icon_container}>
                                {label === 'Home' && (
                                    <Feather name="home" size={25} color={isFocused ? 'black' : 'black'} />
                                )}
                                {label === 'Search' && (
                                    <Feather name="search" size={25} color={isFocused ? 'black' : 'black'} />
                                )}
                                {label === 'Profile' && (
                                    <Feather name="user" size={25} color={isFocused ? 'black' : 'black'} />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
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

const styles = StyleSheet.create({
    global_tab_bar: {
        width: '100%',
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    global_tab_bar_inside: {
        width: '35%',
        minWidth: 150,
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.16,
        shadowRadius: 12,
        elevation: 5,
    },
    label_text: {
        marginTop: 5,
    },
    view_global_button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_selected: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 65,
        width: '25%',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.16,
        shadowRadius: 12,
        elevation: 5,
    },
    icon_container_focused: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 50,
        borderRadius: 25,
    },
    icon_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        width: 50,
        borderRadius: 25,
    },
});
