import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyledLoadingText, StyledLoadingContainer } from '../search/DisplayRows';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

export const RepoDangerZone = ({ onPressDeleteRepo }) => {
    const [show, setShow] = useState(false);

    const onPressButton = () => {
        Alert.alert('Delete this repository', 'Do you really want to delete this repository ?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
            },
            { text: 'Yes', onPress: onPressDeleteRepo },
        ]);
    };

    return show ? (
        <StyledContainer>
            <Button onPress={onPressButton} label="Delete this repository" danger />
            <StyledLoadingContainer onPress={() => setShow(false)}>
                <StyledLoadingText>Hide repository danger zone</StyledLoadingText>
            </StyledLoadingContainer>
        </StyledContainer>
    ) : (
        <StyledLoadingContainer onPress={() => setShow(true)}>
            <StyledLoadingText>Show repository danger zone</StyledLoadingText>
        </StyledLoadingContainer>
    );
};

const StyledContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 20px;
`;
