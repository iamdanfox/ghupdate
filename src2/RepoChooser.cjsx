require './RepoChooser.less'
React = require 'react'
moment = require 'moment'
Loading = require './Loading.cjsx'
Reflux = require 'reflux'
Stores = require './Stores.coffee'
Actions = require './Actions.coffee'


module.exports = RepoChooser = React.createClass
  displayName: 'RepoChooser'
  mixins: [Reflux.ListenerMixin]

  propTypes:
    username: React.PropTypes.string.isRequired

  componentWillMount: ->
    @syncToStore()
    @listenTo Stores.userReposStore, @syncToStore

  syncToStore: ->
    @setState
      loading: Stores.userReposStore.isLoading()
      error: Stores.userReposStore.hasError()
      repos: Stores.userReposStore.getRepos()

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage='Error loading repos, please try again'>
      <RepoList repos={@state.repos} />
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
        .map (repo) => <RepoLink repo={repo} key={repo.name} /> }
    </ul>


RepoLink = React.createClass
  displayName: 'RepoLink'

  selectRepo: ->
    Actions.selectRepo @props.repo.name

  render: ->
    <li key={@props.repo.id} className='ghu-repo-link' onClick={@selectRepo}>
      <a>{@props.repo.name}</a>
      <span className='ghu-last-updated'>last updated { moment(@props.repo.pushed_at).fromNow() }</span>
    </li>
