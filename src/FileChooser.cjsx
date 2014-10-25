React = require 'react'
qwest = require '../lib/qwest.js'
Spinner = require './Spinner.cjsx'

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
      qwest.get 'https://api.github.com/repos/'+@props.params.username+'/'+@props.params.repo

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
    <div>
      { if @state.loading
          <Spinner />
        else
          if @state.error
            "Error loading file list"
          else
            <TreeView tree={@state.tree} /> }
    </div>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    tree: React.PropTypes.array.isRequired

  render: ->
    <div className="treeView">
    <p>Choose a file</p>
    <ul>
      { for item in @props.tree
          if item.type is 'tree'
            <li className='tree' key={item.path}>{item.path}</li>
          else if /\.html/.test item.path
            <TreeFileView item={item} /> }
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
