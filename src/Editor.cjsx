require './Editor.less'
Reflux = require 'reflux'
React = require 'react'
FileChooser = require './FileChooser.cjsx'
Stores = require './Stores.coffee'


module.exports = Editor = React.createClass
  displayName: 'Editor'
  mixins: [Reflux.ListenerMixin]

  componentWillMount: ->
    @syncToStore()
    @listenTo Stores.fileStore, @syncToStore

  syncToStore: ->
    @setState file: Stores.fileStore.getSelectedFile()

  handleSave: ->
    # TODO: trigger some kind of commit action
    console.log 'Save not implemented yet'

  render: ->
    <div className='ghu-editor'>
      Editing {@state.file}
      <button onClick={@handleSave}>Save</button>
    </div>
