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
      htmlFiles: Stores.repoTreeStore.getHTMLFiles()

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage="Error loading file list">
      <TreeView htmlFiles={@state.htmlFiles} />
    </Loading>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    htmlFiles: React.PropTypes.array.isRequired

  render: ->
    <ul className='ghu-file-chooser'>
      { <TreeFileView item={item} /> for item in @props.htmlFiles }
    </ul>


TreeFileView = React.createClass
  displayName: 'TreeFileView'

  propTypes:
    item: React.PropTypes.object.isRequired

  selectFile: ->
    Actions.selectFile @props.item.path

  render: ->
    <li className='file' key={@props.item.path} onClick={@selectFile}>{@props.item.path}</li>
