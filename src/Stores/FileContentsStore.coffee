require('es6-promise').polyfill()
Reflux = require 'reflux'
fileStore = require './FileStore.coffee'
apiModule = require '../ApiModule.coffee'


_cachedContentsForFile = null
_contents = null
_contentsLoading = false
_contentsLoadingError = false

module.exports = FileContentsStore = Reflux.createStore
  init: ->
    @listenTo fileStore, @loadFileIfNecessary

  loadFileIfNecessary: ->
    selectedFileName = fileStore.getSelectedFile()

    if _cachedContentsForFile isnt selectedFileName
      _contents = null
      _contentsLoading = true
      _contentsLoadingError = false
      @trigger()

      apiModule.getFileContents selectedFileName
        .then (contents) ->
          _cachedContentsForFile = selectedFileName
          _contents = contents
        .catch (error) ->
          console.error error
          _contentsLoadingError = true
        .then =>
          _contentsLoading = false
          @trigger()

  isLoading: ->
    _contentsLoading

  hasError: ->
    _contentsLoadingError

  getContents: ->
    _contents
