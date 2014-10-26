require '../src/App.less'
React = require 'react'
Reflux = require 'reflux'
Stores = require './Stores.coffee'
UsernameChooser = require './UsernameChooser.cjsx'
RepoChooser = require './RepoChooser.cjsx'

App = module.exports = React.createClass
  displayName: 'App'
  mixins: [Reflux.ListenerMixin]

  getInitialState: ->
    username: null

  componentDidMount: ->
    @listenTo Stores.userStore, @handleUserChange

  handleUserChange: ->
    @setState
      username: Stores.userStore.getUsername()

  render: ->
    <div className="ghu-app">
      <h1>GH Update</h1>
      { if @state.username?
          <div>
            <h2 className='ghu-username'>{@state.username}</h2>
            <RepoChooser username={@state.username} />
          </div>
        else
          <UsernameChooser /> }
    </div>
