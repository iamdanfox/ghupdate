require '../src/UsernameChooser.less'
React = require 'react'
Reflux = require 'reflux'
Actions = require './Actions.coffee'
Stores = require './Stores.coffee'


UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'
  mixins: [Reflux.ListenerMixin]

  componentWillMount: ->
    @syncToStore()
    @listenTo Stores.userStore, @syncToStore

  syncToStore: ->
    @setState
      loggedIn: Stores.userStore.isLoggedIn()
      accessTokenLoading: Stores.userStore.getAccessTokenLoading()
      accessTokenError: Stores.userStore.getAccessTokenError()

  selectUsername: (e) ->
    e.preventDefault()
    Actions.setUsername @refs.username.state.value

  redirectToOAuth: ->
    #scope=repo Grants read/write access to code, commit statuses, and deployment statuses for public and private repositories and organizations.
    window.location = "https://github.com/login/oauth/authorize" +
      "?client_id=138c264183219a2ac2c9" +
      "&amp;scope=repo" +
      "&amp;redirect_uri=http://iamdanfox.github.io/ghupdate/"

  render: ->
    <div className='ghu-username-chooser'>
      <form onSubmit={@selectUsername}>
        <input type='text' ref='username' placeholder='Your GitHub username' autoFocus />
      </form>
      <p>or</p>
      { if @state.loggedIn
          <button disabled>Logged in</button>
        else
          if @state.accessTokenLoading
            <button disabled>Logging in...</button>
          else
            if @state.accessTokenError
              <p>Error logging in. <a href="#" onClick={@redirectToOAuth}>try again</a></p>
            else
              <button onClick={@redirectToOAuth}>Log in with GitHub</button> }
    </div>
