React = require 'react'
qwest = require '../lib/qwest.js'


EditorView = module.exports = React.createClass
  displayName: 'EditorView'

  propTypes:
    params: React.PropTypes.shape
      username: React.PropTypes.string.isRequired
      repo: React.PropTypes.string.isRequired
      sha: React.PropTypes.string.isRequired

  getInitialState: ->
    html: null

  componentDidMount: ->
    qwest.get 'https://api.github.com/repos/'+@props.params.username+'/'+@props.params.repo+'/git/blobs/'+@props.params.sha
      .success (response) =>
        fixedBase64 = response.content.replace /\n/g, ''
        @setState html: atob(fixedBase64)
      .error (err) =>
        console.error err

  render: ->
    <div>
    <h2>EditorView</h2>
    <div>
    { if @state.html?
        <textarea style={{width:'100%',height:'40em'}}>{@state.html}</textarea>
      else
        <span>Loading...</span> }
    </div>
    </div>
