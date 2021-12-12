import React from 'react';
import { Picker } from '@react-native-community/picker';
import styled from 'styled-components/native';

export const CustomPicker = ({ label, value, setValue, list, elementLabel }) => (
    <StyledRowContainer>
        <StyledTextLabel>{label}</StyledTextLabel>
        <Picker
            selectedValue={value}
            style={{ height: 50, width: 100, fontFamily: 'Montserrat_500Medium' }}
            onValueChange={(el, i) => setValue(el)}
        >
            {list.map((element, index) => (
                <Picker.Item label={element[elementLabel]} value={element[elementLabel]} key={index} />
            ))}
        </Picker>
    </StyledRowContainer>
);

const StyledTextLabel = styled.Text`
    font-size: 14px;
    margin: 0 2px;
    font-family: 'Montserrat_500Medium';
    color: rgba(0, 0, 0, 0.5);
`;

const StyledRowContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
`;
