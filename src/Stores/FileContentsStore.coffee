require('es6-promise').polyfill()
Reflux = require 'reflux'
fileStore = require './FileStore.coffee'
apiModule = require '../ApiModule.coffee'
Actions = require '../Actions.coffee'


_cachedContentsForFile = null
_contents = null
_contentsLoading = true
_contentsLoadingError = false

module.exports = FileContentsStore = Reflux.createStore
  init: ->
    @listenTo fileStore, @loadFileIfNecessary
    @listenTo Actions.saveFile, @saveFile

  saveFile: ({contents, commitMessage}) ->
    apiModule.writeFileContents {contents, commitMessage}
      .then ->
        console.log 'writeFileContents succeeded'

  loadFileIfNecessary: ->
    selectedFileName = fileStore.get()

    if _cachedContentsForFile isnt selectedFileName
      _contents = null
      _contentsLoading = true
      _contentsLoadingError = false
      @trigger()

      if selectedFileName is null
        _cachedContentsForFile = selectedFileName
      else
        apiModule.getFileContents()
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
