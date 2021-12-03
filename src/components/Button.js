import React from 'react';
import styled from 'styled-components/native';

export const Button = ({ onPress, label }) => (
    <StyledButton onPress={onPress}>
        <StyledLabel>{label}</StyledLabel>
    </StyledButton>
);

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
