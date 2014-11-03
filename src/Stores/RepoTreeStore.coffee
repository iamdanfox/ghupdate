require('es6-promise').polyfill()
Reflux = require 'reflux'
repoStore = require './RepoStore.coffee'
apiModule = require '../ApiModule.coffee'


_cachedTreeForRepo = null
_tree = null
_treeLoading = false
_treeLoadingError = false

module.exports = RepoTreeStore = Reflux.createStore
  init: ->
    @listenTo repoStore, @loadTreeIfNecessary

  loadTreeIfNecessary: ->
    selectedRepoName = repoStore.getSelectedRepoName()

    if _cachedTreeForRepo isnt selectedRepoName
      _tree = null
      _treeLoading = true
      _treeLoadingError = false
      @trigger()

      apiModule.getGHPagesTree selectedRepoName
        .then (tree) ->
          _cachedTreeForRepo = selectedRepoName
          _tree = tree
        .catch (err) ->
          console.error err
          _treeLoadingError = true
        .then =>
          _treeLoading = false
          @trigger()

  isLoading: ->
    _treeLoading

  hasError: ->
    _treeLoadingError

  getHTMLFiles: ->
    _tree?.filter (item) -> /\.html$/.test item.path
