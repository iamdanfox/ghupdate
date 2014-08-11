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
      Choose a file
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
    <div>
      { for file in @props.tree
        <span>{file.path}</span> }
    </div>
