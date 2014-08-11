React = require 'react'
qwest = require '../lib/qwest.js'

App = module.exports = React.createClass
  displayName: 'App'

  getInitialState: ->
    username: null
    repoId: null

  selectRepo: (id) ->
    alert 'selected'
    @setState repoId:repoId

  updateRepoList: ->
    @setState 'username':@refs.username.state.value

  render: ->
    <div>
      <h1>GH Update</h1>
      <input type='text' ref='username' placeholder='Your GitHub username' />
      <button onClick={@updateRepoList}>Go</button>
      { <RepoList username={@state.username} selectRepo={@selectRepo} /> if @state.username? }
    </div>


RepoList = React.createClass
  displayName: 'RepoList'

  getInitialState: ->
    repos: null # null signifies not loaded yet

  componentDidMount: ->
    qwest
      .get('https://api.github.com/users/'+@props.username+'/repos')
      .success (repos) =>
        @setState repos:repos

  render: ->
    <div>
      { if @state.repos?
          <ul>
          { for repo in @state.repos
              <RepoLink name={repo.name} id={repo.id} selectRepo={@props.selectRepo} /> }
          </ul>
        else
          'Loading...' }
    </div>

RepoLink = React.createClass
  displayName: 'RepoLink'

  render: ->
    <li key={@props.id}>
      <a href='#' onClick={=> @props.selectRepo(@props.id)}>{@props.name}</a>
    </li>  
