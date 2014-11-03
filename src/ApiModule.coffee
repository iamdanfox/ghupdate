require('es6-promise').polyfill()
require 'fetch'
userStore = require './Stores/UserStore.coffee'


module.exports = ApiModule =
  getGHPagesTree: (username, repo) -> # return a promise

    github = userStore.getGithub()
    if github?
      repo = github.getRepo username, repo
      repo.getTree 'gh-pages', (error, tree) -> callback error, tree
    else
      fetch "https://api.github.com/repos/#{username}/#{repo}/branches/gh-pages"
        .then (response) -> response.json()
        .then (branchObject) -> fetch branchObject.commit.commit.tree.url
        .then (response) -> response.json()
        .then (json) -> json.tree
