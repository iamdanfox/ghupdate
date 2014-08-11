React = require 'react'
qwest = require '../lib/qwest.js'


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

  componentDidMount: ->
    if @props.preLoadedRepo?
      initialPromise =
        success: (continuation) => continuation @props.preLoadedRepo
    else
      initialPromise = qwest.get 'https://api.github.com/repos/'+@props.params.username+'/'+@props.params.repo

    initialPromise.success (loadedRepo) =>
      commitsUrl = loadedRepo.commits_url.replace '{/sha}', '?per_page=1'
      qwest.get(commitsUrl).success (commits) =>
        lastCommit = commits[0]
        treeUrl = lastCommit.commit.tree.url

        qwest.get(treeUrl).success (response) =>
          @setState tree: response.tree

  render: ->
    <div>
      { if @state.tree?
          <TreeView tree={@state.tree} />
        else
          <span>Loading...</span> }
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
    console.log 'selectFile', @props.item.path

  render: ->
    <li className='file' key={@props.item.path} onClick={@selectFile}>{@props.item.path}</li>
