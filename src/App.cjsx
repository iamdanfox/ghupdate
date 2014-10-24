require './App.less'
React = require 'react'
FileChooser = require './FileChooser.cjsx'
RepoContainer = require './RepoContainer.cjsx'


App = module.exports = React.createClass
  displayName: 'App'

  render: ->
    <div className="ghu-app">
      <h1>GH Update</h1>
      {@props.activeRouteHandler()}
    </div>
