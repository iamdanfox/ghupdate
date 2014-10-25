React = require 'react'
qwest = require '../lib/qwest.js'
Loading = require './Loading.cjsx'
OAuth = require './OAuth.coffee'


FileChooser = module.exports = React.createClass
  displayName: 'FileChooser'

  propTypes:
    preLoadedRepo: React.PropTypes.shape # optional
                     owner: React.PropTypes.object.isRequired
                     commits_url: React.PropTypes.string.isRequired
    params: React.PropTypes.shape
              repo: React.PropTypes.string.isRequired
              username: React.PropTypes.string.isRequired

  getInitialState: ->
    tree: null
    loading: true
    error: false

  componentDidMount: ->
    loadRepoPromise = if @props.preLoadedRepo?
      success: (continuation) => continuation @props.preLoadedRepo
    else
      qwest.get 'https://api.github.com/repos/'+@props.params.username+'/'+@props.params.repo + OAuth.queryString()

    loadRepoPromise.success (loadedRepo) =>
      commitsUrl = loadedRepo.commits_url.replace '{/sha}', '?per_page=1'
      qwest.get(commitsUrl).success (commits) =>
        lastCommit = commits[0]
        treeUrl = lastCommit.commit.tree.url

        qwest.get(treeUrl).success (response) =>
          @setState
            loading: false
            tree: response.tree
    .error (err) =>
      @setState
        loading: false
        error: true

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage="Error loading file list">
      <TreeView tree={@state.tree} />
    </Loading>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    tree: React.PropTypes.array.isRequired

  render: ->
    <div className="treeView">
    <p>Choose a file</p>
    <ul>
      { @props.tree
          .filter (item) -> /\.html$/.test item.path
          .map (item) => <TreeFileView item={item} /> }
    </ul>
    </div>


TreeFileView = React.createClass
  displayName: 'TreeFileView'

  propTypes:
    item: React.PropTypes.object.isRequired

  selectFile: ->
    window.location += '/file/'+@props.item.sha

  render: ->
    <li className='file' key={@props.item.path} onClick={@selectFile}>{@props.item.path}</li>
