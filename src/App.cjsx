React = require 'react'
RepoList = require './RepoList.cjsx'

App = module.exports = React.createClass
  displayName: 'App'

  getInitialState: ->
    username: null
    repo: null

  selectRepo: (repo) ->
    console.debug repo
    @setState repo:repo

  updateRepoList: ->
    @setState 'username':@refs.username.state.value

  render: ->
    <div>
      <h1>GH Update</h1>
      <input type='text' ref='username' placeholder='Your GitHub username' />
      <button onClick={@updateRepoList}>Go</button>
      { <RepoList username={@state.username} selectRepo={@selectRepo} /> if @state.username? }
    </div>
