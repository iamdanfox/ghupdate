require('es6-promise').polyfill()
require 'fetch'
userStore = require './Stores/UserStore.coffee'


_promisify = (resolve, reject) -> (errorValue, successValue) ->
  if errorValue then reject errorValue else resolve successValue


module.exports = ApiModule =
  getGHPagesTree: (repo) -> # return a promise
    username = userStore.getUsername()
    github = userStore.getGithub()
    if github?
      return new Promise (resolve, reject) ->
        github.getRepo(username, repo).getTree 'gh-pages', _promisify(resolve, reject)
    else
      fetch "https://api.github.com/repos/#{username}/#{repo}/branches/gh-pages"
        .then (response) -> response.json()
        .then (branchObject) -> fetch branchObject.commit.commit.tree.url
        .then (response) -> response.json()
        .then (json) -> json.tree

  getRepos: ->
    github = userStore.getGithub()
    if github?
      return new Promise (resolve, reject) ->
        github.getUser().repos _promisify(resolve, reject)
    else
      fetch "https://api.github.com/users/#{userStore.getUsername()}/repos"
        .then (response) -> response.json()
