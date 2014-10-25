qwest = require '../lib/qwest.js'


accessToken = null

getParameterByName = (name) ->
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  results = regex.exec(location.search)

  return if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else ''

hasQueryCode = ->
  getParameterByName('code') isnt ''

getAccessToken = (callback) ->
  code = getParameterByName 'code'
  qwest.post('https://ghupdate.herokuapp.com/login/oauth/access_token?code='+code, {})
    .success (response) ->
      if response.access_token?
        accessToken = response.access_token
      else
        console.error response
    .error (error) ->
      console.error 'OAuth through heroku failed'
      console.error error
    .complete ->
      callback?()


module.exports = OAuth = {
  isLoggedIn: ->
    accessToken?

  getAccessToken: ->
    accessToken

  logInIfPossible: (callback)->
    if hasQueryCode()
      getAccessToken(callback)
}
