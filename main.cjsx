React = require 'react'
App = require './src/Components/App.cjsx'
Actions = require './src/Actions.coffee'

window.React = React # enables Chrome Dev Tools :)

React.renderComponent <App />, document.getElementsByTagName('body')[0]

Actions.readCodeFromUrl()
Actions.readAccessTokenFromLocalStorage()
