React = require 'react'
timeago = require 'timeago'
Loading = require './Loading.cjsx'
Reflux = require 'reflux'
Stores = require '../Stores.coffee'
Actions = require '../Actions.coffee'


module.exports = RepoChooser = React.createClass
  displayName: 'RepoChooser'
  mixins: [Reflux.ListenerMixin]

  propTypes:
    loading: React.PropTypes.bool.isRequired
    error: React.PropTypes.bool.isRequired
    repos: React.PropTypes.array

  render: ->
    require './RepoChooser.less'
    <Loading loading={@props.loading} error={@props.error} errorMessage='Error loading repos, please try again'>
      <RepoList repos={@props.repos} />
    </Loading>


RepoList = React.createClass
  displayName: 'RepoList'

  propTypes:
    repos: React.PropTypes.array.isRequired

  render: ->
    sortedRepos = @props.repos.slice 0
    sortedRepos.sort (a,b) ->
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()

    <ul className='ghu-repo-list'>
    { sortedRepos
        .filter (repo) -> repo.has_pages
        .map (repo) -> <RepoLink repo={repo} key={repo.name} /> }
    </ul>


RepoLink = React.createClass
  displayName: 'RepoLink'

  selectRepo: ->
    Actions.selectRepo @props.repo.name

  render: ->
    <li key={@props.repo.id} className='ghu-repo-link' onClick={@selectRepo}>
      <a>{@props.repo.name}</a>
      <span className='ghu-last-updated'>last updated {timeago @props.repo.pushed_at}</span>
    </li>
