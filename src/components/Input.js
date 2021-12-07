import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

export const Input = ({ onChange = () => {}, value = '', placeholder = '', disabled = false, iconName = '' }) => (
    <StyledInput>
        {iconName !== '' ? <Ionicons name={iconName} size={25} color={'rgba(0, 0, 0, .2)'} /> : <></>}
        <StyledRealTextInput
            onChangeText={onChange}
            value={value}
            editable={!disabled}
            placeholder={placeholder}
            isIcon={iconName !== ''}
        />
    </StyledInput>
);

const StyledRealTextInput = styled.TextInput`
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
    margin-left: ${({ isIcon }) => (isIcon ? '10px' : '0px')};
    margin-right: 20px;
    padding-right: ${({ isIcon }) => (isIcon ? '25px' : '0px')};
    width: 100%;
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
