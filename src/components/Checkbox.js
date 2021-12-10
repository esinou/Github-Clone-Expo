import React from 'react';
import styled from 'styled-components/native';

export const Checkbox = ({ value, setValue, label }) => {
    return (
        <StyledContainer>
            <StyledCheckbox onPress={() => setValue(!value)} isChecked={value} />
            <StyledLabel>{label}</StyledLabel>
        </StyledContainer>
    );
};

const StyledCheckbox = styled.TouchableOpacity`
    display: flex;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    background-color: ${({ isChecked }) => (isChecked ? '#5e8fde' : 'transparent')};
`;

const StyledLabel = styled.Text`
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-family: 'Montserrat_500Medium';
`;

const StyledContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    margin-top: 5px;
`;
