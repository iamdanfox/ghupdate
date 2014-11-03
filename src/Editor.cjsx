Reflux = require 'reflux'
React = require 'react'
Loading = require './Loading.cjsx'
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
    # TODO: trigger some kind of commit action
    console.log 'Save not implemented yet'

  render: ->
    <Loading loading={@state.loading} error={@state.error} errorMessage='Error loading file, please try again'>
      <div className='ghu-editor'>
        <textarea defaultValue={@state.contents} />
        <button onClick={@handleSave}>Save</button>
      </div>
    </Loading>
