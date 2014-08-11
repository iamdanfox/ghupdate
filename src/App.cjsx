React = require 'react'
qwest = require '../lib/qwest.js'

App = module.exports = React.createClass
  displayName: 'App'

  getInitialState: ->
    username: null

  updateRepoList: ->

    @setState 'username':@refs.username.state.value

  render: ->
    <div>
      <h1>GH Update</h1>
      <input type='text' ref='username' placeholder='Your GitHub username' />
      <button onClick={@updateRepoList}>Go</button>
      { <RepoList username={@state.username} /> if @state.username? }
    </div>

RepoList = React.createClass
  displayName: 'RepoList'

  getInitialState: ->
    repos: null # null signifies not loaded yet

  componentDidMount: ->
    qwest.get 'https://api.github.com/users/iamdanfox/repos'
      .success (response) ->
        console.log 'response', response

  render: ->
    <div>
      { if @state.repos?
          for repo in @state.repos
            <a href='#'>{repo.name}</a>
        else
          'Loading...' }
    </div>