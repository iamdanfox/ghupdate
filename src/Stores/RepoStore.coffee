Reflux = require 'reflux'
Actions = require '../Actions.coffee'


_selectedRepoName = null
module.exports = RepoStore = Reflux.createStore
  init: ->
    @listenTo Actions.selectRepo, @selectRepo

  selectRepo: (repoName) ->
    _selectedRepoName = repoName
    @trigger()

  getSelectedRepoName: ->
    _selectedRepoName
