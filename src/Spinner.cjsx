require './Spinner.less'
React = require 'react'
Spinkit = require 'react-spinkit'

Spinner = module.exports = React.createClass
  displayName: 'Spinner'

  render: ->
    <div className='ghu-spinner'>
      <Spinkit spinnerName='double-bounce' cssRequire />
    </div>
