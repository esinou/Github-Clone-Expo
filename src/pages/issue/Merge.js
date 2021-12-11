import React from 'react';
import styled from 'styled-components/native';

export const PullMergeText = ({ author, base, head }) => (
    <StyledMergeContainer>
        <StyledText>
            <StyledColoredText>{author}</StyledColoredText> wants to merge <StyledColoredText>{head}</StyledColoredText>{' '}
            into <StyledColoredText>{base}</StyledColoredText>
        </StyledText>
    </StyledMergeContainer>
);

const StyledMergeContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const StyledText = styled.Text`
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-family: 'Montserrat_500Medium';
`;

const StyledColoredText = styled(StyledText)`
    color: black;
`;
