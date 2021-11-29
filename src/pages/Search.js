import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const DisplayUsers = ({ users }) => {
    const [showFull, setShowFull] = useState(false);

    useEffect(() => {
        console.log(users);
    }, []);

    // "avatar_url": "https://avatars.githubusercontent.com/u/44560179?v=4",
    // "events_url": "https://api.github.com/users/ValidationError/events{/privacy}",
    // "followers_url": "https://api.github.com/users/ValidationError/followers",
    // "following_url": "https://api.github.com/users/ValidationError/following{/other_user}",
    // "gists_url": "https://api.github.com/users/ValidationError/gists{/gist_id}",
    // "gravatar_id": "",
    // "html_url": "https://github.com/ValidationError",
    // "id": 44560179,
    // "login": "ValidationError",
    // "node_id": "MDQ6VXNlcjQ0NTYwMTc5",
    // "organizations_url": "https://api.github.com/users/ValidationError/orgs",
    // "received_events_url": "https://api.github.com/users/ValidationError/received_events",
    // "repos_url": "https://api.github.com/users/ValidationError/repos",
    // "score": 1,
    // "site_admin": false,
    // "starred_url": "https://api.github.com/users/ValidationError/starred{/owner}{/repo}",
    // "subscriptions_url": "https://api.github.com/users/ValidationError/subscriptions",
    // "type": "User",
    // "url": "https://api.github.com/users/ValidationError",

    return (
        <StyledSectionContainer>
            <TouchableOpacity onPress={() => setShowFull(!showFull)}>
                <StyledSectionTitle>Users</StyledSectionTitle>
            </TouchableOpacity>
            <StyledSeparation />
            <StyledSectionMap showFull={showFull}>
                {users.map((element, index) => (
                    <StyledUserContainer key={index}>
                        <StyledUserHeader>
                            <StyledProfilePicture
                                source={{
                                    uri: element.avatar_url,
                                }}
                            />
                            <StyledUsername>{element.login}</StyledUsername>
                        </StyledUserHeader>
                    </StyledUserContainer>
                ))}
            </StyledSectionMap>
        </StyledSectionContainer>
    );
};

const StyledUsername = styled.Text`
    padding-left: 10px;
    font-size: 20px;
`;

const StyledSectionMap = styled.View`
    display: ${({ showFull }) => (showFull ? 'flex' : 'none')};
`;

const StyledSectionContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
`;

const StyledSectionTitle = styled.Text`
    font-size: 25px;
`;

const StyledSeparation = styled.View`
    display: flex;
    width: 100%;
    height: 1px;
    background-color: black;
    margin-bottom: 10px;
`;

const StyledUserContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 5px;
`;

const StyledUserHeader = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const StyledProfilePicture = styled.Image`
    display: flex;
    width: 60px;
    height: 60px;
`;

const Search = ({ octokit, navigation }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [topics, setTopics] = useState([]);
    const [issuesAndPullRequests, setIssuesAndPullRequests] = useState([]);
    const [commits, setCommits] = useState([]);
    const [code, setCode] = useState([]);

    const searchEverything = async () => {
        if (search !== '') {
            await searchSomething('users', setUsers, search);
            // await searchSomething('repos', setRepos, search);
            // await searchSomething('topics', setTopics, search);
            // await searchSomething('issuesAndPullRequests', setIssuesAndPullRequests, search);
            // await searchSomething('commits', setCommits, search);
            // await searchSomething('code', setCode, search);
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
        <View>
            <TextInput value={search} onChangeText={setSearch} placeholder="Search something..." />
            <Button title="Rechercher" onPress={searchEverything} />
            <ScrollView>{users.length ? <DisplayUsers users={users} /> : <></>}</ScrollView>
        </View>
    );
};

export default Search;
