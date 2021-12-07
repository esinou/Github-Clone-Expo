const getRepoWatchers = (octokit, owner, repo, per_page) =>
    octokit.request('GET /repos/{owner}/{repo}/subscribers', {
        owner,
        repo,
        per_page,
    });

const searchThis = (octokit, path, q) =>
    octokit.rest.search[path]({
        q,
    });

const getByUsername = (octokit, username) =>
    octokit.rest.users.getByUsername({
        username,
    });

const getRepository = (octokit, owner, repo) =>
    octokit.rest.repos.get({
        owner,
        repo,
    });

const getIssue = (octokit, owner, repo, issue_number) =>
    octokit.rest.issues.get({
        owner,
        repo,
        issue_number,
    });

const getUsersFollowing = (octokit, username) =>
    octokit.request('GET /users/{username}/following', {
        username,
    });

const getUsersFollowers = (octokit, username) =>
    octokit.request('GET /users/{username}/followers', {
        username,
    });

const getUserData = (octokit) => octokit.request('GET /user');
const getUserRepos = (octokit) => octokit.request('GET /user/repos');
const getUserIssues = (octokit) => octokit.request('GET /user/issues');
const getUserStarred = (octokit) => octokit.request('GET /user/starred');
const getUserFollowers = (octokit) => octokit.request('GET /user/followers');
const getUserFollowing = (octokit) => octokit.request('GET /user/following');

export {
    searchThis,
    getByUsername,
    getRepository,
    getIssue,
    getUsersFollowing,
    getUsersFollowers,
    getUserData,
    getUserRepos,
    getUserIssues,
    getUserStarred,
    getRepoWatchers,
    getUserFollowers,
    getUserFollowing,
};
