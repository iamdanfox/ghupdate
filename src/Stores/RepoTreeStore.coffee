Reflux = require 'reflux'
userStore = require './UserStore.coffee'
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

      apiModule.getGHPagesTree userStore.getUsername(), selectedRepoName, (err, tree) =>
        _treeLoading = false
        if err?
          console.error err
          _treeLoadingError = true
        else
          _cachedTreeForRepo = selectedRepoName
          _tree = tree
          @trigger()

  isLoading: ->
    _treeLoading

  hasError: ->
    _treeLoadingError

  getTree: ->
    _tree

  getHTMLFiles: ->
    _tree?.filter (item) -> /\.html$/.test item.path
