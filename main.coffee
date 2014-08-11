React = require 'react'

App = React.createClass
  render: ->
  	<div>Hello, world!</div>

React.renderComponent <App />, document.getElementsByTagName('body')[0]


