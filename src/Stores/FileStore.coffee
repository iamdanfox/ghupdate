Reflux = require 'reflux'
Actions = require '../Actions.coffee'
repoStore = require './RepoStore.coffee'


_selectedFile = null
module.exports = FileStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectFile, @selectFile
    @listenTo repoStore, @wipeFileIfNecessary

  wipeFileIfNecessary: ->
    if repoStore.get() is null
      @selectFile null

  selectFile: (filePath) ->
    if _selectedFile isnt filePath
      _selectedFile = filePath
      @trigger()

  get: ->
    _selectedFile
