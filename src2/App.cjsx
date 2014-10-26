require '../src/App.less'
React = require 'react'
Reflux = require 'reflux'
Stores = require './Stores.coffee'
UsernameChooser = require './UsernameChooser.cjsx'
RepoChooser = require './RepoChooser.cjsx'
FileChooser = require './FileChooser.cjsx'


App = module.exports = React.createClass
  displayName: 'App'
  mixins: [Reflux.ListenerMixin]

  getInitialState: ->
    username: null
    repoName: null
    file: null

  componentDidMount: ->
    @listenTo Stores.userStore, =>
      @setState username: Stores.userStore.getUsername()
    @listenTo Stores.repoStore, =>
      @setState repoName: Stores.repoStore.getSelectedRepoName()
    @listenTo Stores.fileStore, =>
      @setState file: Stores.fileStore.getSelectedFile()

  render: ->
    <div className="ghu-app">
      <h1>GH Update</h1>
      { if @state.username?
          if @state.repoName?
            if @state.file?
              <div>
                <h2 className='ghu-username'>{@state.username}/{@state.repoName}/{@state.file}</h2>
                <span>EDITOR</span>
              </div>
            else
              <div>
                <h2 className='ghu-username'>{@state.username}/{@state.repoName}</h2>
                <FileChooser />
              </div>
          else
            <div>
              <h2 className='ghu-username'>{@state.username}</h2>
              <RepoChooser username={@state.username} />
            </div>
        else
          <UsernameChooser /> }
    </div>
