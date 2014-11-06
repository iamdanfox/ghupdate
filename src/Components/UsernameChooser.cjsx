React = require 'react'
Actions = require '../Actions.coffee'


UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'

  selectUsername: (e) ->
    e.preventDefault()
    Actions.setUsername @refs.username.state.value

  render: ->
    require './UsernameChooser.less'
    LogInButton = require './LogInButton.cjsx'
    <div className='ghu-username-chooser'>
      <form onSubmit={@selectUsername}>
        <input type='text' ref='username' placeholder='Your GitHub username' autoFocus />
      </form>
      <p>or</p>
      <LogInButton />
    </div>
