const octokitGETRequest = (octokit, request) => octokit.request(`GET ${request}`);

const createRepo = (octokit, name, description, isPrivate) =>
    octokit.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
    });

const deleteRepo = (octokit, project_id) =>
    octokit.rest.projects.delete({
        project_id,
    });

const getRepoWatchers = (octokit, owner, repo) =>
    octokit.rest.activity.listWatchersForRepo({
        owner,
        repo,
    });

const getRepoForks = (octokit, owner, repo) =>
    octokit.rest.repos.listForks({
        owner,
        repo,
    });

const getThisRepoBranch = (octokit, owner, repo, branch) =>
    octokit.rest.repos.getBranch({
        owner,
        repo,
        branch,
    });

const getThisRepoContent = (octokit, owner, repo, path = '') =>
    octokit.rest.repos.getContent({
        owner,
        repo,
        path,
    });

const searchThis = (octokit, path, q) =>
    octokit.rest.search[path]({
        q,
    });

const getRepoStarredByUser = (octokit, username) =>
    octokit.rest.activity.listReposStarredByUser({
        username,
    });

const starThisRepo = (octokit, owner, repo) =>
    octokit.rest.activity.starRepoForAuthenticatedUser({
        owner,
        repo,
    });

const unstarThisRepo = (octokit, owner, repo) =>
    octokit.rest.activity.unstarRepoForAuthenticatedUser({
        owner,
        repo,
    });

const followThisUser = (octokit, username) =>
    octokit.rest.users.follow({
        username,
    });

const unfollowThisUser = (octokit, username) =>
    octokit.request('DELETE /user/following/{username}', {
        username,
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
    getThisRepoBranch,
    createRepo,
    deleteRepo,
    octokitGETRequest,
    getThisRepoContent,
    getRepoStarredByUser,
    unstarThisRepo,
    starThisRepo,
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
    getRepoForks,
    getUserFollowers,
    getUserFollowing,
    followThisUser,
    unfollowThisUser,
};
