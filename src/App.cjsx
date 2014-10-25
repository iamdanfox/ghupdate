require './App.less'
React = require 'react'
FileChooser = require './FileChooser.cjsx'
RepoContainer = require './RepoContainer.cjsx'
OAuth = require './OAuth.coffee'



App = module.exports = React.createClass
  displayName: 'App'

  getInitialState: ->
    loggedIn: false

  componentDidMount: ->
    if OAuth.isLoggedIn()
      @setState loggedIn: true
    else
      OAuth.logInIfPossible =>
        @setState loggedIn: OAuth.isLoggedIn()

  render: ->
    <div className="ghu-app">
      <h1>GH Update</h1>
      {@props.activeRouteHandler
        loggedIn: @state.loggedIn}
    </div>
