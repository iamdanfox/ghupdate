React = require 'react'

UsernameChooser = module.exports = React.createClass
  displayName: 'UsernameChooser'

  selectUsername: ->
    window.location += 'user/'+@refs.username.state.value

  render: ->
    <div>
      <input type='text' ref='username' placeholder='Your GitHub username' />
      <button onClick={@selectUsername}>Go</button>
    </div>
