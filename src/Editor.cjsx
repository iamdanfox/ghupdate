Reflux = require 'reflux'
React = require 'react'
Loading = require './Loading.cjsx'
Actions = require './Actions.coffee'
{fileStore, fileContentsStore} = require './Stores.coffee'


module.exports = Editor = React.createClass
  displayName: 'Editor'
  mixins: [Reflux.ListenerMixin]

  componentWillMount: ->
    require './Editor.less'
    @syncToStore()
    @listenTo fileStore, @syncToStore
    @listenTo fileContentsStore, @syncToStore

  syncToStore: ->
    @setState
      file: fileStore.getSelectedFile()
      contents: fileContentsStore.getContents()
      loading: fileContentsStore.isLoading()
      error: fileContentsStore.hasError()

  handleSave: ->
    Actions.saveFile
      contents: @refs.editor.getDOMNode().value
      commitMessage: '[ghupdate commit]'

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage='Error loading file, please try again'>
      <div className='ghu-editor'>
        <textarea defaultValue={@state.contents} ref='editor' />
        <button onClick={@handleSave}>Save</button>
      </div>
    </Loading>
