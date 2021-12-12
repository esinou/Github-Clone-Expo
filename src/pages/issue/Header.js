import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { GoBack, StyledFlex, StyledUsername } from '../../styled/Containers';

const IssueHeader = ({
    goBack,
    navigation,
    repoName,
    lastScreen,
    owner,
    ownerAvatarUrl,
    state,
    statusDate,
    onPressStatus,
}) => {
    const formatedDate = new Date(statusDate);

    return (
        <StyledRepoHeader>
            <StyledNameHeader>
                {goBack ? (
                    <StyledFlex>
                        <GoBack onPress={() => navigation.navigate(lastScreen)} />
                    </StyledFlex>
                ) : (
                    <></>
                )}
                <StyledUsername>{repoName}</StyledUsername>
                {goBack ? <StyledFlex /> : <></>}
            </StyledNameHeader>
            <StyledRowContainer>
                <StyledProfilePicture
                    source={{
                        uri: ownerAvatarUrl,
                    }}
                />
                <StyledOwnerName>{owner}</StyledOwnerName>
            </StyledRowContainer>
            <StyledState opened={state === 'open'} onPress={() => onPressStatus(state)}>
                <Ionicons name={state === 'open' ? 'lock-open' : 'lock-closed'} size={15} color="white" />
                <StyledStatus>{state === 'open' ? 'Opened' : 'Closed'}</StyledStatus>
            </StyledState>
            <StyledStatusDate>
                {formatedDate.getHours()}:{formatedDate.getMinutes()} {formatedDate.getDay()}/{formatedDate.getMonth()}/
                {formatedDate.getFullYear()}
            </StyledStatusDate>
        </StyledRepoHeader>
    );
};

const StyledStatusDate = styled.Text`
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    font-family: 'Montserrat_500Medium';
    margin: 10px 0;
`;

const StyledStatus = styled.Text`
    color: white;
    margin-left: 5px;
    font-size: 13px;
    font-family: 'Montserrat_500Medium';
`;

const StyledState = styled.TouchableOpacity`
    display: flex;
    background-color: ${({ opened }) => (opened ? 'rgb(50, 168, 80)' : 'rgb(214, 28, 28)')};
    width: 110px;
    height: 35px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const StyledOwnerName = styled.Text`
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    font-family: 'Montserrat_500Medium';
`;

const StyledProfilePicture = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.2);
    margin-right: 10px;
`;

const StyledRowContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

const StyledRepoHeader = styled.View`
    display: flex;
    align-items: center;
    height: 220px;
    padding-top: 40px;
    width: 100%;
    background-color: black;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

const StyledNameHeader = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
`;

export { IssueHeader };
