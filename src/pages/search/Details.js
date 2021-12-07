import React, { useEffect, useState } from 'react';
import { InfoContainer, StyledContainerStartingTop, StyledScrollView } from '../../styled/Containers';
import { UserHeader } from '../user/Header';
import { StyledBio } from '../../styled/Containers';
import { getThisRepoContent, getUserData } from '../../api/Github';
import { RepoHeader } from '../repo/Header';
import { RepoFiles } from '../repo/Files';

export const SearchDetailsRepo = ({ navigation, route }) => {
    const repo = route.params.repo.data;
    const { octokit } = route.params;

    // allow_forking: true
    // archive_url: "https://api.github.com/repos/openatx/uiautomator2/{archive_format}{/ref}"
    // archived: false
    // assignees_url: "https://api.github.com/repos/openatx/uiautomator2/assignees{/user}"
    // blobs_url: "https://api.github.com/repos/openatx/uiautomator2/git/blobs{/sha}"
    // branches_url: "https://api.github.com/repos/openatx/uiautomator2/branches{/branch}"
    // clone_url: "https://github.com/openatx/uiautomator2.git"
    // collaborators_url: "https://api.github.com/repos/openatx/uiautomator2/collaborators{/collaborator}"
    // comments_url: "https://api.github.com/repos/openatx/uiautomator2/comments{/number}"
    // commits_url: "https://api.github.com/repos/openatx/uiautomator2/commits{/sha}"
    // compare_url: "https://api.github.com/repos/openatx/uiautomator2/compare/{base}...{head}"
    // contents_url: "https://api.github.com/repos/openatx/uiautomator2/contents/{+path}"
    // contributors_url: "https://api.github.com/repos/openatx/uiautomator2/contributors"
    // created_at: "2017-09-17T12:20:42Z"
    // default_branch: "master"
    // deployments_url: "https://api.github.com/repos/openatx/uiautomator2/deployments"
    // description: "Android Uiautomator2 Python Wrapper"
    // disabled: false
    // downloads_url: "https://api.github.com/repos/openatx/uiautomator2/downloads"
    // events_url: "https://api.github.com/repos/openatx/uiautomator2/events"
    // fork: false
    // forks: 1025
    // forks_count: 1025
    // forks_url: "https://api.github.com/repos/openatx/uiautomator2/forks"
    // full_name: "openatx/uiautomator2"
    // git_commits_url: "https://api.github.com/repos/openatx/uiautomator2/git/commits{/sha}"
    // git_refs_url: "https://api.github.com/repos/openatx/uiautomator2/git/refs{/sha}"
    // git_tags_url: "https://api.github.com/repos/openatx/uiautomator2/git/tags{/sha}"
    // git_url: "git://github.com/openatx/uiautomator2.git"
    // has_downloads: true
    // has_issues: true
    // has_pages: false
    // has_projects: true
    // has_wiki: true
    // homepage: null
    // hooks_url: "https://api.github.com/repos/openatx/uiautomator2/hooks"
    // html_url: "https://github.com/openatx/uiautomator2"
    // id: 103826539
    // is_template: false
    // issue_comment_url: "https://api.github.com/repos/openatx/uiautomator2/issues/comments{/number}"
    // issue_events_url: "https://api.github.com/repos/openatx/uiautomator2/issues/events{/number}"
    // issues_url: "https://api.github.com/repos/openatx/uiautomator2/issues{/number}"
    // keys_url: "https://api.github.com/repos/openatx/uiautomator2/keys{/key_id}"
    // labels_url: "https://api.github.com/repos/openatx/uiautomator2/labels{/name}"
    // language: "Python"
    // languages_url: "https://api.github.com/repos/openatx/uiautomator2/languages"
    // license: {key: 'mit', name: 'MIT License', spdx_id: 'MIT', url: 'https://api.github.com/licenses/mit', node_id: 'MDc6TGljZW5zZTEz'}
    // merges_url: "https://api.github.com/repos/openatx/uiautomator2/merges"
    // milestones_url: "https://api.github.com/repos/openatx/uiautomator2/milestones{/number}"
    // mirror_url: null
    // name: "uiautomator2"
    // network_count: 1025
    // node_id: "MDEwOlJlcG9zaXRvcnkxMDM4MjY1Mzk="
    // notifications_url: "https://api.github.com/repos/openatx/uiautomator2/notifications{?since,all,participating}"
    // open_issues: 245
    // open_issues_count: 245
    // organization: {login: 'openatx', id: 20634838, node_id: 'MDEyOk9yZ2FuaXphdGlvbjIwNjM0ODM4', avatar_url: 'https://avatars.githubusercontent.com/u/20634838?v=4', gravatar_id: '', …}
    // owner: {login: 'openatx', id: 20634838, node_id: 'MDEyOk9yZ2FuaXphdGlvbjIwNjM0ODM4', avatar_url: 'https://avatars.githubusercontent.com/u/20634838?v=4', gravatar_id: '', …}
    // permissions: {admin: false, maintain: false, push: false, triage: false, pull: true}
    // private: false
    // pulls_url: "https://api.github.com/repos/openatx/uiautomator2/pulls{/number}"
    // pushed_at: "2021-11-17T06:48:08Z"
    // releases_url: "https://api.github.com/repos/openatx/uiautomator2/releases{/id}"
    // size: 2213
    // ssh_url: "git@github.com:openatx/uiautomator2.git"
    // stargazers_count: 4056
    // stargazers_url: "https://api.github.com/repos/openatx/uiautomator2/stargazers"
    // statuses_url: "https://api.github.com/repos/openatx/uiautomator2/statuses/{sha}"
    // subscribers_count: 186
    // subscribers_url: "https://api.github.com/repos/openatx/uiautomator2/subscribers"
    // subscription_url: "https://api.github.com/repos/openatx/uiautomator2/subscription"
    // svn_url: "https://github.com/openatx/uiautomator2"
    // tags_url: "https://api.github.com/repos/openatx/uiautomator2/tags"
    // teams_url: "https://api.github.com/repos/openatx/uiautomator2/teams"
    // temp_clone_token: ""
    // topics: (3) ['python', 'test', 'uiautomator']
    // trees_url: "https://api.github.com/repos/openatx/uiautomator2/git/trees{/sha}"
    // updated_at: "2021-12-07T14:57:41Z"
    // url: "https://api.github.com/repos/openatx/uiautomator2"
    // visibility: "public"
    // watchers: 4056
    // watchers_count: 4056

    // default_branch
    // open_issues_count
    // pushed_at
    // owner.login owner.avatar_url
    // description
    // forks_count
    // stargazers_count
    // watchers_count
    // visibility: "public"
    // language

    const [isStarred, setIsStarred] = useState(false);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const content = await getThisRepoContent(octokit, repo.owner.login, repo.name);

        console.log(content);
        await setContent(content.data);
        setLoading(false);
    }, []);

    return loading ? (
        <></>
    ) : (
        <>
            <RepoHeader
                goBack={true}
                navigation={navigation}
                repoName={repo.name}
                lastScreen="Search"
                isStarred={isStarred}
                setIsStarred={setIsStarred}
                forksCount={repo.forks_count}
                watchersCount={repo.watchers_count}
                owner={repo.owner.login}
                ownerAvatarUrl={repo.owner.avatar_url}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    <StyledBio>{repo.description}</StyledBio>
                    <RepoFiles content={content} />
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export const SearchDetailsIssue = ({ navigation, route }) => {
    const issue = route.params.issue.data;

    useEffect(() => {
        console.log(issue);
    }, []);

    return <StyledContainerStartingTop></StyledContainerStartingTop>;
};

export const SearchDetailsUser = ({ navigation, route }) => {
    const user = route.params.user.data;
    const { octokit, followers, following } = route.params;
    const [isFollowed, setIsFollowed] = useState(false);
    const [isFollowable, setIsFollowable] = useState(false);
    const [loading, setLoading] = useState(true);

    const userExistsInArray = (table, username) => {
        return table.some(function (el) {
            return el.login === username;
        });
    };

    useEffect(async () => {
        const thisUser = await getUserData(octokit);

        await setIsFollowable(thisUser.data.login !== user.login);
        await setIsFollowed(userExistsInArray(followers.data, thisUser.data.login));
        setLoading(false);
    }, []);

    return loading ? (
        <></>
    ) : (
        <>
            <UserHeader
                navigation={navigation}
                avatarUrl={user.avatar_url}
                username={user.login}
                followers={followers.data}
                following={following.data}
                followersCount={user.followers}
                followingCount={user.following}
                isFollowable={isFollowable}
                isFollowed={isFollowed}
                setIsFollowed={setIsFollowed}
                octokit={octokit}
            />
            <StyledContainerStartingTop>
                <StyledScrollView showsVerticalScrollIndicator={false}>
                    {user.bio !== null ? <StyledBio>{user.bio}</StyledBio> : <></>}
                    {user.name !== null && user.name !== '' ? <InfoContainer iconName="at" label={user.name} /> : <></>}
                    <InfoContainer iconName="business-outline" label={user.company} />
                    <InfoContainer
                        iconName="file-tray-full-outline"
                        label="Public repositories"
                        value={user.public_repos}
                    />
                    <InfoContainer iconName="star-outline" label="Stars" value={user.public_gists} />
                    {user.twitter_username !== null ? (
                        <InfoContainer iconName="logo-twitter" label={user.twitter_username} />
                    ) : (
                        <></>
                    )}
                    {user.blog !== null && user.blog !== '' ? (
                        <InfoContainer iconName="newspaper-outline" label={user.blog} />
                    ) : (
                        <></>
                    )}
                    {user.email !== null ? <InfoContainer iconName="mail-outline" label={user.email} /> : <></>}
                </StyledScrollView>
            </StyledContainerStartingTop>
        </>
    );
};

export { UserHeader };
