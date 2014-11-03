require './UsernameChooser.less'
React = require 'react'
Actions = require './Actions.coffee'
LogInButton = require './LogInButton.cjsx'


UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'

  selectUsername: (e) ->
    e.preventDefault()
    Actions.setUsername @refs.username.state.value

  render: ->
    <div className='ghu-username-chooser'>
      <form onSubmit={@selectUsername}>
        <input type='text' ref='username' placeholder='Your GitHub username' autoFocus />
      </form>
      <p>or</p>
      <LogInButton />
    </div>
