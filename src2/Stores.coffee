Reflux = require 'reflux'
Actions = require './Actions.coffee'


_username = null
userStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername

  setUsername: (newUsername) ->
    _username = newUsername
    @trigger()

  getUsername: ->
    return _username





userReposStore = Reflux.createStore
  init: ->
    @listenTo userStore, @loadReposIfNecessary

  loadReposIfNecessary: ->
    console.log 'loadReposIfNecessary'




module.exports = Stores =
  userStore: userStore
  userReposStore: userReposStore


userStore.listen ->
  console.log 'userStore', userStore.getUsername()
