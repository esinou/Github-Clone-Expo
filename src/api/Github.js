const octokitGETRequest = (octokit, request) => octokit.request(`GET ${request}`);

const commentThisIssue = (octokit, owner, repo, issue_number, body) =>
    octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
    });

const deleteAComment = (octokit, owner, repo, comment_id) =>
    octokit.rest.issues.deleteComment({
        owner,
        repo,
        comment_id,
    });

const createAnIssue = (octokit, owner, repo, title, body) =>
    octokit.rest.issues.create({
        owner,
        repo,
        title,
        body,
    });

const updateIssue = (octokit, owner, repo, issue_number, state) =>
    octokit.rest.issues.update({
        owner,
        repo,
        issue_number,
        state,
    });

const createRepo = (octokit, name, description, isPrivate) =>
    octokit.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: isPrivate,
    });

const deleteRepo = (octokit, owner, repo) =>
    octokit.rest.repos.delete({
        owner,
        repo,
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

const getRepoBranches = (octokit, owner, repo) =>
    octokit.rest.repos.listBranches({
        owner,
        repo,
    });

const getRepoBranch = (octokit, owner, repo, branch) =>
    octokit.rest.repos.getBranch({
        owner,
        repo,
        branch,
    });

const getThisRepoContent = (octokit, owner, repo, path = '', ref) =>
    octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref,
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

const getPullRequest = (octokit, owner, repo, pull_number) =>
    octokit.rest.pulls.get({
        owner,
        repo,
        pull_number,
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
const getUserRepos = (octokit) => octokit.request('GET /user/repos', { per_page: 100 });
const getUserStarred = (octokit) => octokit.request('GET /user/starred');
const getUserFollowers = (octokit) => octokit.request('GET /user/followers');
const getUserFollowing = (octokit) => octokit.request('GET /user/following');

export {
    updateIssue,
    createAnIssue,
    commentThisIssue,
    deleteAComment,
    getRepoBranches,
    getRepoBranch,
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
    getPullRequest,
    getUsersFollowing,
    getUsersFollowers,
    getUserData,
    getUserRepos,
    getUserStarred,
    getRepoWatchers,
    getRepoForks,
    getUserFollowers,
    getUserFollowing,
    followThisUser,
    unfollowThisUser,
};
