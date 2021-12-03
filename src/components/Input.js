import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Input = ({
    onChange = () => {},
    value = '',
    placeholder = '',
    disabled = false,
    iconName = 'search-outline',
}) => (
    <StyledInput>
        <Ionicons name={iconName} size={25} color={'rgba(0, 0, 0, .2)'} />
        <StyledRealTextInput onChangeText={onChange} value={value} editable={!disabled} placeholder={placeholder} />
    </StyledInput>
);

const StyledRealTextInput = styled.TextInput`
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
    margin-left: 10px;
    margin-right: 20px;
`;

const StyledInput = styled.View`
    display: flex;
    flex-direction: row;
    background-color: transparent;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 0 12px;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    border-radius: 12px;
    width: 100%;
`;

// const StyledInput = styled.TextInput`
//     display: flex;
//     background-color: transparent;
//     border-width: 2px;
//     border-color: rgba(0, 0, 0, 0.1);
//     margin-bottom: 10px;
//     padding: 10px;
//     align-items: center;
//     justify-content: center;
//     height: 50px;
//     border-radius: 12px;
//     width: 100%;
//     font-family: 'Montserrat_500Medium';
//     font-size: 16px;
// `;
