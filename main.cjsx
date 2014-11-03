React = require 'react'
App = require './src/App.cjsx'

window.React = React # enables Chrome Dev Tools :)

React.renderComponent <App />, document.getElementsByTagName('body')[0]
