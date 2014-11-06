Reflux = require 'reflux'
React = require 'react'
Loading = require './Loading.cjsx'
Actions = require '../Actions.coffee'
{fileStore, fileContentsStore, editableRegionsStore} = require '../Stores.coffee'


module.exports = Editor = React.createClass
  displayName: 'Editor'
  mixins: [Reflux.ListenerMixin]

  getInitialState: ->
    file: fileStore.getSelectedFile()
    contents: fileContentsStore.getContents()
    elements: editableRegionsStore.get()
    loading: fileContentsStore.isLoading()
    error: fileContentsStore.hasError()

  componentWillMount: ->
    require './Editor.less'
    @listenTo fileStore, @syncToStore
    @listenTo fileContentsStore, @syncToStore
    @listenTo editableRegionsStore, @syncToStore

  syncToStore: ->
    if @isMounted() then @setState
      file: fileStore.getSelectedFile()
      contents: fileContentsStore.getContents()
      elements: editableRegionsStore.get()
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
        { for element, innerHTML of @state.elements
            <textarea defaultValue={innerHTML} /> }
        <button onClick={@handleSave}>Save</button>
      </div>
    </Loading>
