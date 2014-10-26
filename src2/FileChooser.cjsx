require './FileChooser.less'
React = require 'react'
Loading = require '../src/Loading.cjsx'
Reflux = require 'reflux'
Stores = require './Stores.coffee'
Actions = require './Actions.coffee'



FileChooser = module.exports = React.createClass
  displayName: 'FileChooser'
  mixins: [Reflux.ListenerMixin]

  componentWillMount: ->
    @syncToStore()
    @listenTo Stores.repoTreeStore, @syncToStore

  syncToStore: ->
    @setState
      loading: Stores.repoTreeStore.isLoading()
      error: Stores.repoTreeStore.hasError()
      tree: Stores.repoTreeStore.getTree()

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage="Error loading file list">
      <TreeView tree={@state.tree} />
    </Loading>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    tree: React.PropTypes.array.isRequired

  render: ->
    <ul className='ghu-file-chooser'>
      { @props.tree
          .filter (item) -> /\.html$/.test item.path
          .map (item) => <TreeFileView item={item} /> }
    </ul>


TreeFileView = React.createClass
  displayName: 'TreeFileView'

  propTypes:
    item: React.PropTypes.object.isRequired

  selectFile: ->
    console.log 'selectFile', @props.item

  render: ->
    <li className='file' key={@props.item.path} onClick={@selectFile}>{@props.item.path}</li>
