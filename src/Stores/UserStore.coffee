require('es6-promise').polyfill()
require 'fetch'
Reflux = require 'reflux'
Actions = require '../Actions.coffee'


_username = null
_accessToken = null
_accessTokenLoading = false
_accessTokenError = false
_github = null

module.exports = UserStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername
    @listenTo Actions.getAccessTokenForCode, @getAccessTokenForCode

  setUsername: (newUsername) ->
    _username = newUsername
    @trigger()

  getAccessTokenForCode: (code) ->
    if not _accessTokenLoading
      _accessTokenLoading = true
      _accessTokenError = false
      @trigger()
      fetch('https://ghupdate.herokuapp.com/login/oauth/access_token?code=' + code, {method: 'post'})
        .then (response) -> response.json()
        .then (json) ->
          if json.access_token?
            _accessToken = json.access_token
          else
            Promise.reject json
        .then @_connectToGithub
        .catch (error) ->
          console.error error
          _accessTokenError = true
        .then =>
          _accessTokenLoading = false
          @trigger()

  _connectToGithub: ->
    Github = require 'github-api'
    _github = new Github
      auth: 'oauth'
      token: _accessToken

  getUsername: ->
    return _username

  isLoggedIn: ->
    _accessToken?

  getAccessTokenLoading: ->
    return _accessTokenLoading

  getAccessTokenError: ->
    return _accessTokenError

  getAccessToken: ->
    return _accessToken

  getGithub: ->
    return _github

  queryString: ->
    if _accessToken? then '?access_token=' + _accessToken else ''


#debugging flow - real, deployed version echoes out the token, can set this locally for useful dev
UserStore.listen ->
  console.debug 'UserStore token =', UserStore.getAccessToken()

window.debugUserStoreSetToken = (token) ->
  _accessToken = token
  UserStore._connectToGithub()
  UserStore.trigger()


getParameterByName = (name) ->
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  results = regex.exec(location.search)
  return if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else ''

code = getParameterByName 'code'
if code isnt ''
  Actions.getAccessTokenForCode code
