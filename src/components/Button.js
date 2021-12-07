import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Button = ({ onPress, label = '', icon = '' }) => (
    <StyledButton onPress={onPress}>
        {icon !== '' ? <Ionicons name={icon} size={25} color="white" /> : <></>}
        {label !== '' ? <StyledLabel>{label}</StyledLabel> : <></>}
    </StyledButton>
);

const StyledIcon = styled.Image`
    width: 20px;
`;

const StyledButton = styled.TouchableOpacity`
    display: flex;
    background-color: black;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 12px;
    width: 100%;
`;

const StyledLabel = styled.Text`
    color: white;
    font-size: 18px;
    font-family: 'Montserrat_500Medium';
`;
