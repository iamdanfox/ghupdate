React = require 'react'
qwest = require '../lib/qwest.js'
moment = require 'moment'

RepoList = module.exports = React.createClass
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
      { if @state.repos?
          <ul>
          { for repo in @state.repos
              <RepoLink repo={repo} selectRepo={@props.selectRepo} key={repo.name} /> }
          </ul>
        else
          'Loading...' }
    </div>

RepoLink = React.createClass
  displayName: 'RepoLink'

  render: ->
    <li key={@props.repo.id}>
      <a href='#' onClick={=> @props.selectRepo @props.repo}>{@props.repo.name}</a>
      <span className='pushedAt'>Last updated: { moment(@props.repo.pushed_at).fromNow() }</span>
    </li>
