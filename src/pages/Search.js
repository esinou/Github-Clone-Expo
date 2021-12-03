import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { StyledContainerStartingTop } from '../styled/Containers';

const DisplayUsers = ({ users, navigate, octokit }) => {
    const [showFull, setShowFull] = useState(false);

    return (
        <StyledSectionContainer>
            <StyledSectionTitleContainer onPress={() => setShowFull(!showFull)}>
                <StyledSectionTitle>Users</StyledSectionTitle>
                <Feather name={showFull ? 'minus-circle' : 'plus-circle'} size={25} color="black" />
            </StyledSectionTitleContainer>
            <StyledSectionMap showFull={showFull}>
                {users.map((element, index) => (
                    <StyledUserContainer
                        key={index}
                        onPress={async () => {
                            navigate('SearchDetailsUser', {
                                user: await octokit.rest.users.getByUsername({
                                    username: element.login,
                                }),
                            });
                        }}
                    >
                        <StyledUserHeader>
                            <StyledProfilePicture
                                source={{
                                    uri: element.avatar_url,
                                }}
                            />
                            <StyledUsername>{element.login}</StyledUsername>
                            <StyledEmptyFlex />
                            <Feather name="arrow-right" size={25} color="black" />
                        </StyledUserHeader>
                    </StyledUserContainer>
                ))}
            </StyledSectionMap>
        </StyledSectionContainer>
    );
};

const DisplayRepos = ({ repos, navigate, octokit }) => {
    const [showFull, setShowFull] = useState(false);

    return (
        <StyledSectionContainer>
            <StyledSectionTitleContainer onPress={() => setShowFull(!showFull)}>
                <StyledSectionTitle>Repositories</StyledSectionTitle>
                <Feather name={showFull ? 'minus-circle' : 'plus-circle'} size={25} color="black" />
            </StyledSectionTitleContainer>
            <StyledSectionMap showFull={showFull}>
                {repos.map((element, index) => (
                    <StyledUserContainer
                        key={index}
                        onPress={async () => {
                            navigate('SearchDetailsRepo', {
                                repo: await octokit.rest.repos.get({
                                    owner: element.owner.login,
                                    repo: element.name,
                                }),
                            });
                        }}
                    >
                        <StyledReposHeader>
                            <StyledNameContainer>
                                <StyledUsername>{element.name}</StyledUsername>
                                <StyledName>{'@' + element.owner.login}</StyledName>
                            </StyledNameContainer>
                            <StyledEmptyFlex />
                            <Feather name="arrow-right" size={25} color="black" />
                        </StyledReposHeader>
                    </StyledUserContainer>
                ))}
            </StyledSectionMap>
        </StyledSectionContainer>
    );
};

const DisplayIssues = ({ issues, navigate, octokit }) => {
    const [showFull, setShowFull] = useState(false);

    return (
        <StyledSectionContainer>
            <StyledSectionTitleContainer onPress={() => setShowFull(!showFull)}>
                <StyledSectionTitle>Issues & Pull Request</StyledSectionTitle>
                <Feather name={showFull ? 'minus-circle' : 'plus-circle'} size={25} color="black" />
            </StyledSectionTitleContainer>
            <StyledSectionMap showFull={showFull}>
                {issues.map((element, index) => (
                    <StyledUserContainer
                        key={index}
                        onPress={async () => {
                            navigate('SearchDetailsIssue', {
                                issue: await octokit.rest.issues.get({
                                    owner: element.user.login,
                                    repo: element.repository_url,
                                    issue_number: element.number,
                                }),
                            });
                        }}
                    >
                        <StyledReposHeader>
                            <StyledNameContainer>
                                <StyledUsername>{element.title}</StyledUsername>
                                <StyledName>{'@' + element.user.login}</StyledName>
                            </StyledNameContainer>
                            <StyledEmptyFlex />
                            <Feather name="arrow-right" size={25} color="black" />
                        </StyledReposHeader>
                    </StyledUserContainer>
                ))}
            </StyledSectionMap>
        </StyledSectionContainer>
    );
};

const StyledNameContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const StyledName = styled.Text`
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.3);
`;

const StyledEmptyFlex = styled.View`
    display: flex;
    flex: 1;
`;

const StyledSectionTitleContainer = styled.TouchableOpacity`
    display: flex;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 1);
    border-radius: 10px;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const StyledUsername = styled.Text`
    font-size: 20px;
`;

const StyledSectionMap = styled.View`
    display: ${({ showFull }) => (showFull ? 'flex' : 'none')};
`;

const StyledSectionContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 5px 0;
`;

const StyledSectionTitle = styled.Text`
    font-size: 18px;
    font-family: 'Montserrat_500Medium';
`;

const StyledUserContainer = styled.TouchableOpacity`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 5px;
    margin-top: 5px;
`;

const StyledReposHeader = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    min-height: 50px;
`;

const StyledUserHeader = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

const StyledProfilePicture = styled.Image`
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    margin-right: 10px;
`;

const Search = ({ octokit, navigation }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [issuesAndPullRequests, setIssuesAndPullRequests] = useState([]);

    const searchEverything = async () => {
        if (search !== '') {
            await searchSomething('users', setUsers, search);
            await searchSomething('repos', setRepos, search);
            await searchSomething('issuesAndPullRequests', setIssuesAndPullRequests, search);
        }
    };

    const searchSomething = async (path, setValue, q) => {
        try {
            const req = await octokit.rest.search[path]({
                q,
            });
            if (req?.status === 200 && req?.data?.items) {
                console.log(req.data.items);
                setValue(req.data.items);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <StyledContainerStartingTop>
            <StyledScrollView showsVerticalScrollIndicator={false}>
                <Input value={search} disabled={false} onChange={setSearch} placeholder="Search something..." />
                <Button onPress={searchEverything} label="Search" />
                {users.length || repos.length || issuesAndPullRequests.length ? (
                    <>
                        <StyledSeparator />
                        <StyledTitle>Your Results</StyledTitle>
                    </>
                ) : (
                    <></>
                )}
                {users.length ? <DisplayUsers users={users} navigate={navigation.navigate} octokit={octokit} /> : <></>}
                {repos.length ? <DisplayRepos repos={repos} navigate={navigation.navigate} octokit={octokit} /> : <></>}
                {issuesAndPullRequests.length ? (
                    <DisplayIssues issues={issuesAndPullRequests} navigate={navigation.navigate} octokit={octokit} />
                ) : (
                    <></>
                )}
            </StyledScrollView>
        </StyledContainerStartingTop>
    );
};

const StyledTitle = styled.Text`
    color: rgba(0, 0, 0, 0.2);
    font-family: 'Montserrat_500Medium';
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 15px;
`;

const StyledScrollView = styled.ScrollView`
    width: 100%;
`;

const StyledSeparator = styled.View`
    display: flex;
    height: 1px;
    width: 80%;
    margin: 20px auto;
    background-color: rgba(0, 0, 0, 0.2);
`;

export default Search;
