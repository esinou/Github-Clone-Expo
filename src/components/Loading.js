import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Loading = ({}) => (
    <StyledContainer>
        <ActivityIndicator size="small" color="black" />
        <StyledLoadingText>Loading...</StyledLoadingText>
    </StyledContainer>
);

const StyledContainer = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const StyledLoadingText = styled.Text`
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-family: 'Montserrat_500Medium';
    margin: 0 10px;
`;
