require('es6-promise').polyfill()
require 'fetch'
userStore = require './Stores/UserStore.coffee'
githubStore = require './Stores/GithubStore.coffee'
repoStore = require './Stores/RepoStore.coffee'
fileStore = require './Stores/FileStore.coffee'


# curried shorthand for fixing the callbacks that github.js needs
_promisify = (resolve, reject) -> (errorValue, successValue) ->
  if errorValue then reject errorValue else resolve successValue


module.exports = ApiModule =

  writeFileContents: ({contents, commitMessage}) ->
    pathToFile = fileStore.getSelectedFile()
    username = userStore.getUsername()
    repo = repoStore.getSelectedRepoName()
    github = githubStore.getGithub()

    if github?
      return new Promise (resolve, reject) ->
        github
          .getRepo username, repo
          .write 'gh-pages', pathToFile, contents, commitMessage, _promisify(resolve, reject)
    else
      Promise.reject 'Must authorize before trying to write file contents'

  getFileContents: ->
    pathToFile = fileStore.getSelectedFile()
    username = userStore.getUsername()
    repo = repoStore.getSelectedRepoName()
    github = githubStore.getGithub()

    if github?
      return new Promise (resolve, reject) ->
        github
          .getRepo username, repo
          .read 'gh-pages', pathToFile, _promisify(resolve, reject)
    else
      Promise.reject 'Must authorize before loading up a file contents'

  getGHPagesTree: (repo) -> # return a promise
    username = userStore.getUsername()
    github = githubStore.getGithub()
    if github?
      return new Promise (resolve, reject) ->
        github
          .getRepo username, repo
          .getTree 'gh-pages', _promisify(resolve, reject)
    else
      fetch "https://api.github.com/repos/#{username}/#{repo}/branches/gh-pages"
        .then (response) -> response.json()
        .then (branchObject) -> fetch branchObject.commit.commit.tree.url
        .then (response) -> response.json()
        .then (json) -> json.tree

  getRepos: ->
    github = githubStore.getGithub()
    if github?
      return new Promise (resolve, reject) ->
        github
          .getUser()
          .repos _promisify(resolve, reject)
    else
      fetch "https://api.github.com/users/#{userStore.getUsername()}/repos"
        .then (response) -> response.json()
