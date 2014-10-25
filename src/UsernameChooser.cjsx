require './UsernameChooser.less'
React = require 'react'


UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'

  selectUsername: (e) ->
    e.preventDefault()
    window.location += 'user/'+@refs.username.state.value

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
      or <button onClick={@redirectToOAuth}>Authorize with GitHub</button>
    </div>
