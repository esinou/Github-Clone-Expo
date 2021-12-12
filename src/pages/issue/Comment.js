import React, { useState } from 'react';
import styled from 'styled-components/native';
import { StyledErrorLabel } from '../create/Repository';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export const CommentSection = ({ enabled, onComment, error, text, setText }) => (
    <StyledContainer>
        <StyledTitle>Add a comment</StyledTitle>
        <Input value={text} onChange={setText} iconName="document-text-outline" placeholder="Enter a comment" isBig />
        <Button label="Submit comment" onPress={() => onComment(text)} />
        {error !== '' ? <StyledErrorLabel>{error}</StyledErrorLabel> : <></>}
    </StyledContainer>
);

const StyledContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding-top: 20px;
`;

const StyledTitle = styled.Text`
    color: black;
    font-size: 18px;
    font-family: 'Montserrat_500Medium';
    margin: 15px 0;
`;
