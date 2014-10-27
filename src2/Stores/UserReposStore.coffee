Reflux = require 'reflux'
qwest = require '../../lib/qwest.js'
userStore = require './UserStore.coffee'


_cachedReposForUsername = null
_repos = null
_reposLoading = false
_reposLoadingError = false

module.exports = UserReposStore = Reflux.createStore
  init: ->
    @listenTo userStore, @loadReposIfNecessary

  loadReposIfNecessary: ->
    newUsername = userStore.getUsername()
    if _cachedReposForUsername isnt newUsername
      _reposLoading = true
      _reposLoadingError = false
      _repos = null
      @trigger()
      qwest
        .get("https://api.github.com/users/#{newUsername}/repos")
        .success (repos) ->
          _cachedReposForUsername = newUsername
          _repos = repos
          _reposLoadingError = false
        .error (err) ->
          console.error err
          _reposLoadingError = true
        .complete =>
          _reposLoading = false
          @trigger()

  isLoading: ->
    _reposLoading

  hasError: ->
    _reposLoadingError

  getRepos: ->
    _repos
