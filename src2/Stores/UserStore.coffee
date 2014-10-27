Reflux = require 'reflux'
Actions = require '../Actions.coffee'
qwest = require '../../lib/qwest.js'



_username = null
_accessToken = null
_accessTokenLoading = false
_accessTokenError = false

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
          else
            console.error response
            _accessTokenError = true
        .error (error) ->
          _accessTokenError = true
          console.error error
        .complete =>
          _accessTokenLoading = false
          @trigger()

  getUsername: ->
    return _username


UserStore.listen ->
  console.log 'UserStore', _accessToken, _accessTokenLoading, _accessTokenError


getParameterByName = (name) ->
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  results = regex.exec(location.search)
  return if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else ''

code = getParameterByName 'code'
if code isnt ''
  Actions.getAccessTokenForCode code
