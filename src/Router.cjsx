React = require 'react'
Routes = require 'react-router/Routes'
Route = require 'react-router/Route'

App = require './App.cjsx'
UsernameChooser = require './UsernameChooser.cjsx'
RepoContainer = require './RepoContainer.cjsx'
FileChooser = require './FileChooser.cjsx'


Router = module.exports = React.createClass
  displayName: 'Router'

  render: ->
    <Routes>
      <Route handler={App}>
        <Route path="/" handler={UsernameChooser} />
        <Route path="/user/:username" handler={RepoContainer}>
          <Route path="/user/:username/repo/:repo" handler={FileChooser} />
        </Route>
      </Route>
    </Routes>
