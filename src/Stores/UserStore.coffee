Reflux = require 'reflux'
Actions = require '../Actions.coffee'

_username = null
module.exports = UserStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername

  setUsername: (newUsername) ->
    if _username isnt newUsername
      _username = newUsername
      @trigger()

  getUsername: ->
    return _username
