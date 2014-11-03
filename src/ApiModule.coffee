qwest = require '../lib/qwest.js'
userStore = require './Stores/UserStore.coffee'


module.exports = ApiModule =
  getGHPagesTree: (username, repo, callback) ->

    github = userStore.getGithub()
    if github?
      repo = github.getRepo username, repo
      repo.getTree 'gh-pages', (err, tree) -> callback err, tree
    else
      qwest
        .get "https://api.github.com/repos/#{username}/#{repo}/branches/gh-pages"
        .success (branchObject) =>
          qwest
            .get(branchObject.commit.commit.tree.url)
            .success (response) ->  callback null, response.tree
        .error (err) -> callback err, null
