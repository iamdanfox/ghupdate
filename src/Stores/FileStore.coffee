Reflux = require 'reflux'
Actions = require '../Actions.coffee'
githubStore = require './GithubStore.coffee'

_selectedFile = null
module.exports = FileStore = Reflux.createStore
  init: ->
    @listenTo Reflux.all(Actions.selectFile, githubStore), @selectFile

  selectFile: ([filePath]) ->
    if _selectedFile isnt filePath
      if typeof filePath isnt 'string' then throw new Error 'FileStore.selectFile requires a string argument'
      _selectedFile = filePath
      @trigger()

  get: ->
    _selectedFile
