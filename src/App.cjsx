React = require 'react'
RepoList = require './RepoList.cjsx'
FileChooser = require './FileChooser.cjsx'

App = module.exports = React.createClass
  displayName: 'App'

  getInitialState: ->
    username: null
    repo: null

  selectRepo: (repo) ->
    @setState repo:repo

  updateRepoList: ->
    @setState 'username':@refs.username.state.value

  render: ->
    <div>
      <h1>GH Update</h1>
      { if not @state.repo?
          <div>
            <input type='text' ref='username' placeholder='Your GitHub username' />
            <button onClick={@updateRepoList}>Go</button>
            { <RepoList username={@state.username} selectRepo={@selectRepo} /> if @state.username? }
          </div>
        else
          <FileChooser repo={@state.repo} /> }
    </div>
