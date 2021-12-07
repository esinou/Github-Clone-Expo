import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const RepoFiles = ({ content }) => {
    return (
        <StyledContentContainer>
            {content.map((element, index) => (
                <StyledContentRow key={index} isLast={index === content.length - 1}>
                    <StyledItemContainer>
                        <Ionicons
                            name={element.type === 'dir' ? 'folder-open' : 'document-outline'}
                            size={25}
                            color="#3880ff"
                        />
                    </StyledItemContainer>
                    <StyledItemContainer>
                        <StyledItemTitle>{element.name}</StyledItemTitle>
                    </StyledItemContainer>
                </StyledContentRow>
            ))}
        </StyledContentContainer>
    );
};

const StyledItemTitle = styled.Text`
    font-size: 15px;
    font-family: 'Montserrat_500Medium';
`;

const StyledItemContainer = styled.View`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
`;

const StyledContentRow = styled.View`
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    position: relative;
    border-bottom-width: ${({ isLast }) => (isLast ? '0px' : '1px')};
    border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const StyledContentContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 2px;
`;

export { RepoFiles };
