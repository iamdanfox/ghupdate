React = require 'react'
Reflux = require 'reflux'
Stores = require '../Stores.coffee'
Actions = require '../Actions.coffee'


FileChooser = module.exports = React.createClass
  displayName: 'FileChooser'
  mixins: [Reflux.ListenerMixin]

  propTypes:
    htmlFiles: React.PropTypes.array
    loading: React.PropTypes.bool.isRequired
    error: React.PropTypes.bool.isRequired

  componentWillMount: ->
    require './FileChooser.less'

  render: ->
    Loading = require './Loading.cjsx'
    <Loading loading={@props.loading} error={@props.error} errorMessage="Error loading file list">
      <TreeView htmlFiles={@props.htmlFiles} />
    </Loading>


TreeView = React.createClass
  displayName: 'TreeView'

  propTypes:
    htmlFiles: React.PropTypes.array.isRequired

  render: ->
    <ul className='ghu-file-chooser'>
      { <TreeFileView item={item} key={item.path} /> for item in @props.htmlFiles }
    </ul>


TreeFileView = React.createClass
  displayName: 'TreeFileView'

  propTypes:
    item: React.PropTypes.object.isRequired

  selectFile: ->
    Actions.selectFile @props.item.path

  render: ->
    <li className='file' key={@props.item.path} onClick={@selectFile}>{@props.item.path}</li>
