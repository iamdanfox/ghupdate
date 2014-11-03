Reflux = require 'reflux'
Actions = require '../Actions.coffee'
qwest = require '../../lib/qwest.js'
Github = require 'github-api'


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
      qwest
        .post('https://ghupdate.herokuapp.com/login/oauth/access_token?code='+code, {})
        .success (response) ->
          if response.access_token?
            _accessToken = response.access_token
            @_connectToGithub()
          else
            console.error response
            _accessTokenError = true
        .error (error) ->
          _accessTokenError = true
          console.error error
        .complete =>
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
