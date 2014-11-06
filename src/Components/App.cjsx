React = require 'react'
Reflux = require 'reflux'
Stores = require '../Stores.coffee'
Actions = require '../Actions.coffee'
RepoChooser = require './RepoChooser.cjsx'
FileChooser = require './FileChooser.cjsx'
Editor = require './Editor.cjsx'
LogInButton = require './LogInButton.cjsx'
UsernameChooser = require './UsernameChooser.cjsx'


App = module.exports = React.createClass
  displayName: 'App'
  mixins: [Reflux.ListenerMixin]

  getInitialState: ->
    username: null
    repoName: null
    file: null
    isLoggedIn: false

  componentDidMount: ->
    @listenTo Stores.userStore, =>
      @setState username: Stores.userStore.getUsername()
    @listenTo Stores.repoStore, =>
      @setState repoName: Stores.repoStore.getSelectedRepoName()
    @listenTo Stores.fileStore, =>
      @setState file: Stores.fileStore.getSelectedFile()
    @listenTo Stores.accessTokenStore, =>
      @setState isLoggedIn: Stores.accessTokenStore.isLoggedIn()

  render: ->
    require './App.less'
    <div className="ghu-app">
      <h1>GH Update</h1>
      { unless @state.username?
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
                <h2 className='ghu-username'>
                  <a onClick={-> Actions.selectRepo null}>{@state.username}</a> / {@state.repoName}
                </h2>
                <FileChooser />
              </div>
            else
              <div>
                <h2 className='ghu-username'>
                  <a onClick={-> Actions.selectRepo null}>{@state.username}</a> / <a onClick={-> Actions.selectFile null}>{@state.repoName}</a> / {@state.file}
                </h2>
                { unless @state.isLoggedIn
                    <div>
                      Please log in
                      <LogInButton />
                    </div>
                  else
                    <Editor /> }
              </div> }
    </div>
