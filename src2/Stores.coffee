Reflux = require 'reflux'
Actions = require './Actions.coffee'
qwest = require '../lib/qwest.js'

_username = null
userStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername

  setUsername: (newUsername) ->
    _username = newUsername
    @trigger()

  getUsername: ->
    return _username




_cachedReposForUsername = null
_repos = null
_reposLoading = false
_reposLoadingError = false

userReposStore = Reflux.createStore
  init: ->
    @listenTo userStore, @loadReposIfNecessary

  loadReposIfNecessary: ->
    newUsername = userStore.getUsername()
    if _cachedReposForUsername isnt newUsername
      _reposLoading = true
      @trigger()
      qwest
        .get("https://api.github.com/users/#{newUsername}/repos")
        .success (repos) ->
          _cachedReposForUsername = newUsername
          _repos = repos
          _reposLoadingError = false
        .error ->
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



_selectedRepoName = null
repoStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectRepo, @selectRepo

  selectRepo: (repoName) ->
    _selectedRepoName = repoName
    @trigger()

  getSelectedRepoName: ->
    _selectedRepoName





module.exports = Stores =
  userStore: userStore
  userReposStore: userReposStore


repoStore.listen ->
  console.log 'repoStore', repoStore.getSelectedRepoName()
