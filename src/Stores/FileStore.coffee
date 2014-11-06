Reflux = require 'reflux'
Actions = require '../Actions.coffee'


_selectedFile = null
module.exports = FileStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectFile, @selectFile

  selectFile: (filePath) ->
    if _selectedFile isnt filePath
      _selectedFile = filePath
      @trigger()

  getSelectedFile: ->
    _selectedFile
