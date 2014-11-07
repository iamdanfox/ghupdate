Reflux = require 'reflux'
Github = require 'github-api'
accessTokenStore = require './AccessTokenStore.coffee'


_github = null
module.exports = GithubStore = Reflux.createStore
  init: ->
    @listenTo accessTokenStore, @_connectToGithubIfNecessary

  _connectToGithubIfNecessary: ->
    if accessTokenStore.isLoggedIn() and not _github?
      _github = new Github
        auth: 'oauth'
        token: accessTokenStore.getAccessToken()
      @trigger()

  get: ->
    return _github
