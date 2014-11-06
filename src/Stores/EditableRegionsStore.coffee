Reflux = require 'reflux'
fileContentsStore = require './FileContentsStore.coffee'
fileStore = require './FileStore.coffee'


_cachedDocumentForFile = null
_document = null
_elements = []

module.exports = EditableRegionsStore = Reflux.createStore
  init: ->
    @listenTo fileContentsStore, @parseHTMLIfNecessary

  parseHTMLIfNecessary: ->
    selectedFileName = fileStore.getSelectedFile()

    if not fileContentsStore.isLoading() and not fileContentsStore.hasError() and
        _cachedDocumentForFile isnt selectedFileName
      _document = document.implementation.createHTMLDocument 'example'
      _document.documentElement.innerHTML = fileContentsStore.getContents()

      for element in _document.querySelectorAll 'div#main'
        _elements[element] = element.innerHTML

      console.log '_elements', _elements
      @trigger()

  get: ->
    _elements
