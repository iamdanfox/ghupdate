Reflux = require 'reflux'
Actions = require '../Actions.coffee'
Github = require 'github-api'
UserStore = require './UserStore.coffee'


_selectedFile = null
_github = null
module.exports = FileStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectFile, @selectFile
    @listenTo UserStore, @connectToGithub

  connectToGithub: ->
    if UserStore.isLoggedIn()
      _github = new Github
        auth: 'oauth'
        token: UserStore.getAccessToken()
      console.log 'connected to github', _github

  selectFile: (filePath) ->
    _selectedFile = filePath
    @trigger()

  getSelectedFile: ->
    _selectedFile
