require './UsernameChooser.less'
React = require 'react'


UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'

  selectUsername: (e) ->
    e.preventDefault()
    window.location += 'user/'+@refs.username.state.value

  render: ->
    <div className='ghu-username-chooser'>
      <form onSubmit={@selectUsername}>
      <input type='text' ref='username' placeholder='Your GitHub username' />
      </form>
    </div>
