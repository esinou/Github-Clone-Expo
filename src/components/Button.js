import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Button = ({ onPress, label = '', icon = '', isHalf = false, danger = false }) => (
    <StyledButton onPress={onPress} isHalf={isHalf} danger={danger}>
        {icon !== '' ? <Ionicons name={icon} size={25} color="white" /> : <></>}
        {label !== '' ? <StyledLabel>{label}</StyledLabel> : <></>}
    </StyledButton>
);

const StyledButton = styled.TouchableOpacity`
    display: flex;
    background-color: ${({ danger }) => (danger ? 'rgba(255, 0, 0, .75)' : 'black')};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 12px;
    width: ${({ isHalf }) => (isHalf ? '48%' : '100%')};
`;

const StyledLabel = styled.Text`
    color: white;
    font-size: 18px;
    font-family: 'Montserrat_500Medium';
`;
