Reflux = require 'reflux'
qwest = require '../../lib/qwest.js'
userStore = require './UserStore.coffee'
repoStore = require './RepoStore.coffee'


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
      qwest
        .get("https://api.github.com/repos/#{userStore.getUsername()}/#{selectedRepoName}/branches/gh-pages"+userStore.queryString())
        .success (branchObject) =>
          qwest
            .get(branchObject.commit.commit.tree.url)
            .success (response) =>
              _cachedTreeForRepo = selectedRepoName
              _treeLoading = false
              _tree = response.tree
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

  getHTMLFiles: ->
    _tree?.filter (item) -> /\.html$/.test item.path
