import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Comment = ({ avatarUrl, body, owner, date, duration }) => {
    const formatedDate = new Date(date);
    const slideInAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.timing(slideInAnim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [slideInAnim]);

    return (
        <Animated.View
            style={{
                display: 'flex',
                marginTop: slideInAnim,
            }}
        >
            <StyledCommentContainer>
                <StyledCommentRow>
                    <StyledAvatar
                        source={{
                            uri: avatarUrl,
                        }}
                    />
                    <StyledUsername>{owner}</StyledUsername>
                </StyledCommentRow>
                <StyledBodyContainer>
                    <StyledBodyText>{body}</StyledBodyText>
                </StyledBodyContainer>
                <StyledCommentRow alignEnd>
                    <StyledDateText>
                        {formatedDate.getHours()}:{formatedDate.getMinutes()} {formatedDate.getDay()}/
                        {formatedDate.getMonth()}/{formatedDate.getFullYear()}
                    </StyledDateText>
                </StyledCommentRow>
            </StyledCommentContainer>
        </Animated.View>
    );
};

const IssueComments = ({ comments }) => {
    return (
        <StyledContainer>
            {comments.map((element, index) => (
                <Comment
                    avatarUrl={element.user.avatar_url}
                    body={element.body}
                    date={element.created_at}
                    owner={element.user.login}
                    duration={500 + index * 100}
                    key={index}
                />
            ))}
        </StyledContainer>
    );
};

const StyledBodyText = styled.Text`
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-family: 'Montserrat_500Medium';
`;

const StyledDateText = styled(StyledBodyText)`
    font-size: 12px;
`;

const StyledBodyContainer = styled.View`
    display: flex;
    width: 100%;
    align-items: flex-start;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    margin: 10px 0;
`;

const StyledUsername = styled.Text`
    color: black;
    font-size: 18px;
    font-family: 'Montserrat_500Medium';
`;

const StyledAvatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 12px;
`;

const StyledCommentRow = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'flex-start')};
`;

const StyledContainer = styled.View`
    display: flex;
    flex-direction: column;
`;

const StyledCommentContainer = styled(Animated.View)`
    display: flex;
    flex-direction: column;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    width: 100%;
    min-height: 50px;
    margin: 10px 0;
    position: relative;
    padding: 10px;
`;

export { IssueComments };
