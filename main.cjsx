React = require 'react'
Router = require './src/Router.cjsx'
qwest = require './lib/qwest.js'

React.renderComponent <Router />, document.getElementsByTagName('body')[0]
