React = require 'react'

module.exports = React.createClass
  displayName: 'App'
  render: ->
    <div>
      <h1>GH Update</h1>
      <input type="text" placeholder="Your GitHub username" />
    </div>
