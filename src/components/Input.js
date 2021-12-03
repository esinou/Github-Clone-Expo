import React from 'react';
import styled from 'styled-components/native';

export const Input = ({ onChange, value, placeholder, disabled = false }) => (
    <StyledInput onChange={onChange} value={value} disabled={disabled} placeholder={placeholder} />
);

const StyledInput = styled.TextInput`
    display: flex;
    background-color: transparent;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 12px;
    width: 100%;
`;
