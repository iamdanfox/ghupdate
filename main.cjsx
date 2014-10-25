React = require 'react'
Router = require './src/Router.cjsx'
qwest = require './lib/qwest.js'

React.renderComponent <Router />, document.getElementsByTagName('body')[0]


getParameterByName = (name) ->
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  results = regex.exec(location.search)

  return if results? then decodeURIComponent(results[1].replace(/\+/g, " ")) else ''

code = getParameterByName 'code'
if code isnt ''
  qwest.post('https://ghupdate.herokuapp.com/login/oauth/access_token',
    code: code
  ).success (response) ->
    console.log 'response', response
  .error (error) ->
    console.error 'OAuth through heroku failed'
    console.error error
