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



_selectedRepoName = null
repoStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectRepo, @selectRepo

  selectRepo: (repoName) ->
    _selectedRepoName = repoName
    @trigger()

  getSelectedRepoName: ->
    _selectedRepoName




_cachedTreeForRepo = null
_tree = null
_treeLoading = false
_treeLoadingError = false

repoTreeStore = Reflux.createStore
  init: ->
    @listenTo repoStore, @loadTreeIfNecessary

  loadTreeIfNecessary: ->
    selectedRepoName = repoStore.getSelectedRepoName()
    if _cachedTreeForRepo isnt selectedRepoName

      _tree = null
      _treeLoading = true
      _treeLoadingError = false
      qwest
        .get("https://api.github.com/repos/#{userStore.getUsername()}/#{selectedRepoName}/branches/gh-pages")
        .success (branchObject) =>
          qwest
            .get(branchObject.commit.commit.tree.url)
            .success (response) =>
              _cachedTreeForRepo = selectedRepoName
              _treeLoading = false
              _tree = response.tree
              console.log 'qwest success', _tree
              @trigger()
        .error (err) =>
          console.error err
          _treeLoadingError = true
          _treeLoading = false
          @trigger()

  isLoading: ->
    _treeLoading

  hasError: ->
    _treeLoadingError

  getTree: ->
    _tree






module.exports = Stores =
  userStore: userStore
  userReposStore: userReposStore
  repoStore: repoStore
  repoTreeStore: repoTreeStore


# repoTreeStore.listen ->
#   console.log 'repoTreeStore', repoTreeStore.getTree()



# SHORTCUT CODE
# TODO: move this somewhere else
# TODO: shortcut if only one file
userReposStore.listen ->
  if userReposStore.getRepos()?.length is 1
    Actions.selectRepo userReposStore.getRepos()[0]
