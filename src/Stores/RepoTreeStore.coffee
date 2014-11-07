require('es6-promise').polyfill()
Reflux = require 'reflux'
repoStore = require './RepoStore.coffee'
apiModule = require '../ApiModule.coffee'
Actions = require '../Actions.coffee'


_cachedTreeForRepo = null
_tree = null
_treeLoading = false
_treeLoadingError = false

module.exports = RepoTreeStore = Reflux.createStore
  init: ->
    @listenTo repoStore, @loadTreeIfNecessary

  loadTreeIfNecessary: ->
    selectedRepoName = repoStore.get()

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

  getAll: ->
    loading: _treeLoading
    error: _treeLoadingError
    htmlFiles: @getHTMLFiles()

  isLoading: ->
    _treeLoading

  hasError: ->
    _treeLoadingError

  getHTMLFiles: ->
    _tree?.filter (item) -> /\.html$/.test item.path

# SHORTCUT CODE
RepoTreeStore.listen ->
  if RepoTreeStore.getHTMLFiles()?.length is 1
    Actions.selectFile RepoTreeStore.getHTMLFiles()[0].path
