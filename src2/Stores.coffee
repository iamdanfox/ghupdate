Reflux = require 'reflux'
Actions = require './Actions.coffee'


_username = null

module.exports = Stores =

  userStore: Reflux.createStore
    init: ->
      @listenTo Actions.setUsername, @setUsername

    setUsername: (newUsername) ->
      _username = newUsername
      @trigger _username



Stores.userStore.listen (x) ->
  console.log 'userStore', x
