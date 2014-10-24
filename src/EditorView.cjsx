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
    loading: true
    error: null
    html: null

  componentDidMount: ->
    qwest.get 'https://api.github.com/repos/'+@props.params.username+'/'+@props.params.repo+'/git/blobs/'+@props.params.sha
      .success (response) =>
        fixedBase64 = response.content.replace /\n/g, ''
        @setState
          loading: false
          html: atob(fixedBase64)
      .error (err) =>
        console.error err
        @setState
          loading: false
          error: err

  render: ->
    <div>
    <h2>EditorView</h2>
    <div>
    { if @state.loading
        <span>Loading...</span>
      else if @state.error?
        <span>Error loading file. Please try again in a few minutes.</span>
      else
        <textarea style={{width:'100%',height:'40em'}} defaultValue={@state.html} /> }
    </div>
    </div>
