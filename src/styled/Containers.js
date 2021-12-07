import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const GoBack = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Ionicons name="arrow-back" size={25} color="white" />
    </TouchableOpacity>
);

const InfoContainer = ({ iconName, label = null, value = 'none' }) =>
    label !== null ? (
        <StyledInfoContainer>
            <Ionicons name={iconName} size={25} color="black" />
            <StyledInfoLabel>{label}</StyledInfoLabel>
            <EmptyFlex />
            {value !== 'none' ? <StyledInfoValue>{value}</StyledInfoValue> : <></>}
        </StyledInfoContainer>
    ) : (
        <></>
    );

const StyledScreenHeader = styled.View`
    display: flex;
    height: 100px;
    padding-top: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: black;
    flex-direction: row;
`;

const StyledInfoValue = styled.Text`
    color: rgba(0, 0, 0, 0.4);
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
`;

const StyledInfoLabel = styled.Text`
    color: black;
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
    margin-left: 15px;
`;

const StyledInfoContainer = styled.View`
    display: flex;
    flex-direction: row;
    height: 46px;
    width: 90%;
    margin: 10px auto;
    background-color: rgba(255, 255, 255, 0.6);
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const EmptyFlex = styled.View`
    display: flex;
    flex: 1;
`;

const StyledContainer = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    position: relative;
    background-color: transparent;
`;

const StyledContainerStartingTop = styled(StyledContainer)`
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${({ noMargin }) => (noMargin ? '0px' : '10px')};
`;

const StyledScrollView = styled.ScrollView`
    width: 100%;
`;

const StyledBio = styled.Text`
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-family: 'Montserrat_500Medium';
    margin: 10px 0;
`;

const StyledFlex = styled.View`
    display: flex;
    align-items: center;
    padding-left: -10px;
    justify-content: center;
    flex: 1;
`;

const StyledUsername = styled.Text`
    font-size: 20px;
    color: white;
    font-family: 'Montserrat_500Medium';
`;

export {
    StyledContainer,
    StyledContainerStartingTop,
    StyledScrollView,
    InfoContainer,
    GoBack,
    EmptyFlex,
    StyledScreenHeader,
    StyledBio,
    StyledFlex,
    StyledUsername,
};
