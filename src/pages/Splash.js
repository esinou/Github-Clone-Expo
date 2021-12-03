import React, { useEffect, useRef } from 'react';
import { Animated, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Splash = ({ navigation }) => {
    const timerAnimation = 3000;
    const slideBottomAnim = useRef(new Animated.Value(0)).current;
    const slideLeftAnim = useRef(new Animated.Value(-Dimensions.get('screen').width)).current;

    useEffect(() => {
        Animated.timing(slideBottomAnim, {
            toValue: Dimensions.get('screen').height,
            duration: timerAnimation,
            useNativeDriver: false,
        }).start();
    }, [slideBottomAnim]);

    useEffect(() => {
        Animated.timing(slideLeftAnim, {
            toValue: 0,
            duration: timerAnimation,
            useNativeDriver: false,
        }).start();
    }, [slideLeftAnim]);

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 5000);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
            }}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'black',
                    height: slideBottomAnim,
                }}
            />
            <Animated.Image
                source={require('../images/wave.png')}
                style={{
                    position: 'absolute',
                    bottom: slideBottomAnim,
                    left: slideLeftAnim,
                    width: '200%',
                    height: 300,
                }}
            />
            <FontAwesome name="github" size={150} color="white" />
        </View>
    );
};

export default Splash;
