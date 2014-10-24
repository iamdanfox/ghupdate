require './RepoContainer.less'
React = require 'react'
qwest = require '../lib/qwest.js'
moment = require 'moment'


RepoContainer = module.exports = React.createClass
  displayName: 'RepoContainer'

  selectRepo: (loadedRepo) ->
    @setState loadedRepo:loadedRepo
    window.location += ('/repo/' + loadedRepo.name)

  getInitialState: ->
    loadedRepo: null

  render: ->
    <div>
      <h2 className='ghu-username'>{@props.params.username}</h2>
      { if not @props.activeRouteHandler()?
          <RepoList username={@props.params.username} selectRepo={@selectRepo} />
        else
          @props.activeRouteHandler
            preLoadedRepo: @state.loadedRepo }
    </div>


RepoList = React.createClass
  displayName: 'RepoList'

  propTypes:
    username: React.PropTypes.string.isRequired
    selectRepo: React.PropTypes.func.isRequired

  getInitialState: ->
    repos: null # null signifies not loaded yet

  componentDidMount: ->
    qwest
      .get('https://api.github.com/users/'+@props.username+'/repos')
      .success (repos) =>
        @setState repos:repos

  render: ->
    <div>
      { if @state.repos? then do =>
          sortedRepos = @state.repos.slice 0
          sortedRepos.sort (a,b) ->
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()

          <ul className='ghu-repo-list'>
          { for repo in sortedRepos
              <RepoLink repo={repo} selectRepo={@props.selectRepo} key={repo.name} /> }
          </ul>
        else
          'Loading...' }
    </div>


RepoLink = React.createClass
  displayName: 'RepoLink'

  render: ->
    console.log new Date(@props.repo.pushed_at).getTime()
    <li key={@props.repo.id} className='ghu-repo-link' onClick={=> @props.selectRepo @props.repo}>
      <a>{@props.repo.name}</a>
      <span className='ghu-last-updated'>last updated { moment(@props.repo.pushed_at).fromNow() }</span>
    </li>
