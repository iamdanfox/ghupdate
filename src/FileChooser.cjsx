React = require 'react'
qwest = require '../lib/qwest.js'


FileChooser = module.exports = React.createClass
  displayName: 'FileChooser'

  propTypes:
    repo: React.PropTypes.shape
            owner: React.PropTypes.object.isRequired
            commits_url: React.PropTypes.string.isRequired

  getInitialState: ->
    tree: null

  componentDidMount: ->
    commitsUrl = @props.repo.commits_url.replace '{/sha}', '?per_page=1'
    qwest
      .get commitsUrl
      .success (commits) =>
        lastCommit = commits[0]
        treeUrl = lastCommit.commit.tree.url

        qwest
          .get treeUrl
          .success (response) =>
            @setState tree:response.tree

  render: ->
    <div>
      { if @state.tree?
          <TreeView tree={@state.tree} rootName={@props.repo.name} />
        else
          <span>Loading...</span> }
    </div>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    tree: React.PropTypes.array.isRequired
    rootName: React.PropTypes.string.isRequired

  render: ->
    <div className="treeView">
    <h2>{@props.rootName}</h2>
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
