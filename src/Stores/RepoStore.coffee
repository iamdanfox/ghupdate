Reflux = require 'reflux'
Actions = require '../Actions.coffee'
userStore = require './UserStore.coffee'


_selectedRepoName = null
module.exports = RepoStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectRepo, @selectRepo
    @listenTo userStore, @wipeRepoIfNecessary

  wipeRepoIfNecessary: ->
    if userStore.get() is null
      @selectRepo null

  selectRepo: (repoName) ->
    if _selectedRepoName isnt repoName
      _selectedRepoName = repoName
      @trigger()

  get: ->
    _selectedRepoName
