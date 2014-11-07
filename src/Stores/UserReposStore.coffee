require('es6-promise').polyfill()
Reflux = require 'reflux'
userStore = require './UserStore.coffee'
apiModule = require '../ApiModule.coffee'


_cachedReposForUsername = null
_repos = null
_reposLoading = false
_reposLoadingError = false

module.exports = UserReposStore = Reflux.createStore
  init: ->
    @listenTo userStore, @loadReposIfNecessary

  loadReposIfNecessary: ->
    newUsername = userStore.get()
    if _cachedReposForUsername isnt newUsername
      _reposLoading = true
      _reposLoadingError = false
      _repos = null
      @trigger()
      apiModule.getRepos()
        .then (repos) ->
          _cachedReposForUsername = newUsername
          _repos = repos
          _reposLoadingError = false
        .catch (err) ->
          console.error err
          _reposLoadingError = true
        .then =>
          _reposLoading = false
          @trigger()

  getAll: ->
    loading: _reposLoading
    error: _reposLoadingError
    repos: _repos

  isLoading: ->
    _reposLoading

  hasError: ->
    _reposLoadingError

  getRepos: ->
    _repos
