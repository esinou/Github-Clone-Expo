import styled from 'styled-components/native';

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
    margin-top: 10px;
`;

export { StyledContainer, StyledContainerStartingTop };
