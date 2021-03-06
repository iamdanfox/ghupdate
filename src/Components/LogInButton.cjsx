React = require 'react'
Reflux = require 'reflux'
Stores = require '../Stores.coffee'


LogInButton = module.exports = React.createClass
  displayName: 'LogInButton'
  mixins: [Reflux.ListenerMixin]

  getInitialState: ->
    loggedIn: Stores.accessTokenStore.isLoggedIn()
    accessTokenLoading: Stores.accessTokenStore.getAccessTokenLoading()
    accessTokenError: Stores.accessTokenStore.getAccessTokenError()

  componentDidMount: ->
    @listenTo Stores.accessTokenStore, =>
      if @isMounted() then @setState
        loggedIn: Stores.accessTokenStore.isLoggedIn()
        accessTokenLoading: Stores.accessTokenStore.getAccessTokenLoading()
        accessTokenError: Stores.accessTokenStore.getAccessTokenError()

  redirectToOAuth: ->
    #scope=repo Grants read/write access to code, commit statuses, and deployment statuses for public and private repositories and organizations.
    window.location = "https://github.com/login/oauth/authorize" +
      "?client_id=138c264183219a2ac2c9" +
      "&amp;scope=repo" +
      "&amp;redirect_uri=http://iamdanfox.github.io/ghupdate/" +
      "&amp;state=helloworld"

  render: ->
    if @state.loggedIn
      <button disabled>Logged in</button>
    else
      if @state.accessTokenLoading
        <button disabled>Logging in...</button>
      else
        if @state.accessTokenError
          <p>Error logging in. <a href="#" onClick={@redirectToOAuth}>try again</a></p>
        else
          <button onClick={@redirectToOAuth}>Log in with GitHub</button>
