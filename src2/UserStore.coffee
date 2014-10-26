Reflux = require 'reflux'
Actions = require './Actions.coffee'


_username = null

module.exports = UserStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername

  setUsername: (newUsername) ->
    _username = newUsername
    @trigger _username



UserStore.listen (x) ->
  console.log 'userStore', x
