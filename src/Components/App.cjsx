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
    isLoggedIn: false
    userReposStore: Stores.userReposStore.getAll()
    repoName: null
    repoTreeStore: Stores.repoTreeStore.getAll()
    file: null

  componentDidMount: ->
    @listenTo Stores.userStore, => @setState username: Stores.userStore.get()
    @listenTo Stores.accessTokenStore, => @setState isLoggedIn: Stores.accessTokenStore.isLoggedIn()
    @listenTo Stores.userReposStore, => @setState userReposStore: Stores.userReposStore.getAll()
    @listenTo Stores.repoStore, => @setState repoName: Stores.repoStore.get()
    @listenTo Stores.repoTreeStore, => @setState repoTreeStore: Stores.repoTreeStore.getAll()
    @listenTo Stores.fileStore, => @setState file: Stores.fileStore.get()

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
              <RepoChooser
                loading={@state.userReposStore.loading}
                error={@state.userReposStore.error}
                repos={@state.userReposStore.repos} />
            </div>
          else
            unless @state.file?
              <div>
                <h2 className='ghu-username'>
                  <a onClick={-> Actions.selectRepo null}>{@state.username}</a> / {@state.repoName}
                </h2>
                <FileChooser
                  loading={@state.repoTreeStore.loading}
                  error={@state.repoTreeStore.error}
                  htmlFiles={@state.repoTreeStore.htmlFiles} />
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
