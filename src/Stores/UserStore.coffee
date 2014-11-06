require('es6-promise').polyfill()
require 'fetch'
Reflux = require 'reflux'
Actions = require '../Actions.coffee'
Github = require 'github-api'


_username = null
_accessToken = null
_accessTokenLoading = false
_accessTokenError = false
_github = null

module.exports = UserStore = Reflux.createStore
  init: ->
    @listenTo Actions.setUsername, @setUsername
    @listenTo Actions.readCodeFromUrl, @readCodeFromUrl
    @listenTo Actions.readAccessTokenFromLocalStorage, @readAccessTokenFromLocalStorage

  setUsername: (newUsername) ->
    _username = newUsername
    @trigger()

  readCodeFromUrl: ->
    regex = new RegExp("[\\?&]code=([^&#]*)")
    results = regex.exec(location.search)
    code = if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else ''

    if code isnt '' and not _accessTokenLoading
      _accessTokenLoading = true
      _accessTokenError = false
      @trigger()
      fetch('https://ghupdate.herokuapp.com/login/oauth/access_token?code=' + code, {method: 'post'})
        .then (response) -> response.json()
        .then (json) ->
          if json.access_token?
            _accessToken = json.access_token
            localStorage.setItem 'ghu-token', _accessToken
          else
            Promise.reject json
        .then @_connectToGithub
        .catch (error) ->
          _accessTokenError = true
          console.error error
        .then =>
          _accessTokenLoading = false
          @trigger()

  readAccessTokenFromLocalStorage: ->
    token = localStorage.getItem 'ghu-token'
    if not _accessTokenLoading and token?
      _accessTokenLoading = true
      _accessTokenError = false
      @trigger()
      fetch('https://api.github.com/user', {
        headers:
          'Accept': 'application/vnd.github.v3+json'
          'Authorization': 'token ' + token
      }).then (response) ->
        if response.status is 200
          _accessToken = token
        else
          Promise.reject()
      .then @_connectToGithub
      .catch ->
        _accessTokenError = true
        localStorage.removeItem 'ghu-token'
      .then =>
        _accessTokenLoading = false
        @trigger()

  _connectToGithub: ->
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
