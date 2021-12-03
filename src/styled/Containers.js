import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const InfoContainer = ({ iconName, label = null, value = 'none' }) =>
    label !== null ? (
        <StyledInfoContainer>
            <Ionicons name={iconName} size={25} color="black" />
            <StyledInfoLabel>{label}</StyledInfoLabel>
            <EmptyFlex />
            {value !== 'none' ? <StyledInfoValue>{value}</StyledInfoValue> : <></>}
        </StyledInfoContainer>
    ) : (
        <></>
    );

const StyledInfoValue = styled.Text`
    color: rgba(0, 0, 0, 0.4);
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
`;

const StyledInfoLabel = styled.Text`
    color: black;
    font-family: 'Montserrat_500Medium';
    font-size: 16px;
    margin-left: 15px;
`;

const StyledInfoContainer = styled.View`
    display: flex;
    flex-direction: row;
    height: 46px;
    width: 90%;
    margin: 10px auto;
    background-color: rgba(255, 255, 255, 0.6);
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    border-radius: 12px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;

const EmptyFlex = styled.View`
    display: flex;
    flex: 1;
`;

const StyledContainer = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
    position: relative;
`;

const StyledContainerStartingTop = styled(StyledContainer)`
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: ${({ noMargin }) => (noMargin ? '0px' : '10px')};
`;

const StyledScrollView = styled.ScrollView`
    width: 100%;
`;

export { StyledContainer, StyledContainerStartingTop, StyledScrollView, InfoContainer, EmptyFlex };
