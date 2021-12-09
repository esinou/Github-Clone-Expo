import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { EmptyFlex } from '../../styled/Containers';
import { Ionicons } from '@expo/vector-icons';

const DisplayType = Object.freeze({
    user: 'User',
    repo: 'Repositories',
    issue: 'Issues & PR',
    favorite: 'Favorites',
});

const CategoryContainer = ({ label, children }) => {
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            duration: 750,
            useNativeDriver: false,
        }).start();
    }, [fadeInAnim]);

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            {label !== '' ? (
                <Animated.View
                    style={{
                        width: '100%',
                        opacity: fadeInAnim,
                    }}
                >
                    <StyledSectionTitle>{label}</StyledSectionTitle>
                </Animated.View>
            ) : (
                <></>
            )}
            <StyledSectionMap showFull={true}>{children}</StyledSectionMap>
        </View>
    );
};

const AnimatedRow = ({ duration, element, displayType, onPress }) => {
    const onPressFunc =
        displayType === DisplayType.user
            ? () => onPress(element.login)
            : displayType === DisplayType.repo || displayType === DisplayType.favorite
            ? () => onPress(element.owner.login, element.name)
            : () => onPress(element, element.repository_url);
    const slideInAnim = useRef(new Animated.Value(50)).current;

    const DisplayUserRow = () => (
        <StyledHeader>
            <StyledProfilePicture
                source={{
                    uri: element.avatar_url,
                }}
            />
            <StyledName>{element.login}</StyledName>
            <EmptyFlex />
            <Ionicons name="chevron-forward-outline" size={25} color="rgba(0, 0, 0, .75)" />
        </StyledHeader>
    );

    const DisplayRepoRow = () => (
        <StyledHeader>
            <StyledNameContainer>
                <StyledUsername>{element.name}</StyledUsername>
                <StyledName>{'@' + element.owner.login}</StyledName>
            </StyledNameContainer>
            <EmptyFlex />
            <Ionicons name="chevron-forward-outline" size={25} color="rgba(0, 0, 0, .75)" />
        </StyledHeader>
    );

    const DisplayIssueRow = () => (
        <StyledHeader>
            <StyledNameContainer>
                <StyledUsername>{element.title}</StyledUsername>
                <StyledName>{'@' + element.user.login}</StyledName>
            </StyledNameContainer>
            <EmptyFlex />
            <Ionicons name="chevron-forward-outline" size={25} color="rgba(0, 0, 0, .75)" />
        </StyledHeader>
    );

    const DisplayFavoriteRow = () => (
        <StyledHeader>
            <StyledIcon>
                <Ionicons name="star" size={25} color="rgb(235, 225, 52)" />
            </StyledIcon>
            <StyledNameContainer>
                <StyledUsername>{element.name}</StyledUsername>
                <StyledName>{'@' + element.owner.login}</StyledName>
            </StyledNameContainer>
            <EmptyFlex />
            <Ionicons name="chevron-forward-outline" size={25} color="rgba(0, 0, 0, .75)" />
        </StyledHeader>
    );

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 5,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [slideInAnim]);

    return (
        <TouchableOpacity onPress={onPressFunc}>
            <Animated.View
                style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    marginBottom: 5,
                    marginTop: slideInAnim,
                    position: 'relative',
                }}
            >
                {displayType == DisplayType.user ? <DisplayUserRow /> : <></>}
                {displayType == DisplayType.repo ? <DisplayRepoRow /> : <></>}
                {displayType == DisplayType.issue ? <DisplayIssueRow /> : <></>}
                {displayType == DisplayType.favorite ? <DisplayFavoriteRow /> : <></>}
            </Animated.View>
        </TouchableOpacity>
    );
};

const DisplayRow = ({ list, onPressRow, displayType, label = '' }) => {
    const [showFull, setShowFull] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewList, setPreviewList] = useState(list.length > 1 ? [list[0], list[1]] : [list[0]]);

    const addMoreUsers = () => {
        setLoading(true);
        setTimeout(() => {
            if (showFull) {
                setPreviewList(list.length > 1 ? [list[0], list[1]] : [list[0]]);
                setShowFull(false);
            } else {
                setPreviewList(list);
                setShowFull(true);
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <CategoryContainer label={label}>
            {previewList.map((element, index) => (
                <AnimatedRow
                    duration={500 + index * 200}
                    element={element}
                    key={index}
                    displayType={displayType}
                    onPress={onPressRow}
                />
            ))}
            {list.length > 2 ? (
                <StyledLoadingContainer onPress={addMoreUsers}>
                    {loading ? (
                        <>
                            <ActivityIndicator size="small" color="black" />
                            <StyledLoadingText>Loading...</StyledLoadingText>
                        </>
                    ) : showFull ? (
                        <StyledLoadingText>See less...</StyledLoadingText>
                    ) : (
                        <StyledLoadingText>See more...</StyledLoadingText>
                    )}
                </StyledLoadingContainer>
            ) : (
                <></>
            )}
        </CategoryContainer>
    );
};

const StyledIcon = styled.View`
    display: flex;
    margin-left: 10px;
    margin-right: 15px;
`;

const StyledSectionTitle = styled.Text`
    color: black;
    font-size: 24px;
    font-family: 'Montserrat_500Medium';
    margin: 15px 0;
`;

const StyledLoadingText = styled.Text`
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-family: 'Montserrat_500Medium';
    margin: 0 10px;
`;

const StyledLoadingContainer = styled.TouchableOpacity`
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    flex-direction: row;
`;

const StyledNameContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const StyledName = styled.Text`
    font-size: 17px;
    color: rgba(0, 0, 0, 1);
    font-family: 'Montserrat_500Medium';
`;

const StyledUsername = styled.Text`
    font-size: 15px;
    font-family: 'Montserrat_500Medium';
`;

const StyledSectionMap = styled.View`
    display: ${({ showFull }) => (showFull ? 'flex' : 'none')};
`;

const StyledHeader = styled.View`
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.03);
`;

const StyledProfilePicture = styled.Image`
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 10px;
`;

export { DisplayRow, DisplayType, AnimatedRow };
