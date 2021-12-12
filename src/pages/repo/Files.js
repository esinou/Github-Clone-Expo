import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { Loading } from '../../components/Loading';

const FileRow = ({ duration, isLast, iconName, index, name, isFolder, onUpdatePath }) => {
    const slideInAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [slideInAnim]);

    const onPressPath = () => {
        if (isFolder) {
            onUpdatePath(name);
        }
    };

    return (
        <StyledContentRow
            key={index}
            isLast={isLast}
            style={{
                marginTop: slideInAnim,
            }}
        >
            <StyledTouchableRow onPress={onPressPath}>
                <StyledItemContainer>
                    <Ionicons name={iconName} size={25} color="#3880ff" />
                </StyledItemContainer>
                <StyledItemContainer>
                    <StyledItemTitle>{name}</StyledItemTitle>
                </StyledItemContainer>
            </StyledTouchableRow>
        </StyledContentRow>
    );
};

const StyledTouchableRow = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const RepoFiles = ({ content, onUpdatePath }) => {
    const slideInAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 0,
            duration: 750,
            useNativeDriver: false,
        }).start();
    }, [slideInAnim]);

    return content === [] ? (
        <Loading />
    ) : (
        <StyledContentContainer>
            {content.map((element, index) => (
                <FileRow
                    duration={500 + index * 50}
                    index={index}
                    isLast={index === content.length - 1}
                    iconName={element.type === 'dir' ? 'folder-open' : 'document-outline'}
                    isFolder={element.type === 'dir'}
                    name={element.name}
                    onUpdatePath={onUpdatePath}
                    key={index}
                />
            ))}
        </StyledContentContainer>
    );
};

const StyledItemTitle = styled.Text`
    font-size: 15px;
    font-family: 'Montserrat_500Medium';
`;

const StyledItemContainer = styled.View`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
`;

const StyledContentRow = styled(Animated.View)`
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    position: relative;
    border-bottom-width: ${({ isLast }) => (isLast ? '0px' : '1px')};
    border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const StyledContentContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 2px;
`;

export { RepoFiles };
