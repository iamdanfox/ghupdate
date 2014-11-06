React = require 'react'
Reflux = require 'reflux'
Stores = require '../Stores.coffee'
RepoChooser = require './RepoChooser.cjsx'
FileChooser = require './FileChooser.cjsx'
Editor = require './Editor.cjsx'
LogInButton = require './LogInButton.cjsx'

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
    require './App.less'
    <div className="ghu-app">
      <h1>GH Update</h1>
      { unless @state.username? then do ->
          UsernameChooser = require './UsernameChooser.cjsx'
          <UsernameChooser />
        else
          unless @state.repoName?
            <div>
              <h2 className='ghu-username'>{@state.username}</h2>
              <RepoChooser username={@state.username} />
            </div>
          else
            unless @state.file?
              <div>
                <h2 className='ghu-username'>{@state.username}/{@state.repoName}</h2>
                <FileChooser />
              </div>
            else
              <div>
                <h2 className='ghu-username'>{@state.username}/{@state.repoName}/{@state.file}</h2>
                { unless Stores.accessTokenStore.isLoggedIn()
                    <div>
                      Please log in
                      <LogInButton />
                    </div>
                  else
                    <Editor /> }
              </div> }
    </div>
