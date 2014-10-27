require './Loading.less'
React = require 'react'
Spinkit = require 'react-spinkit'

Loading = module.exports = React.createClass
  displayName: 'Loading'

  propTypes:
    loading: React.PropTypes.bool.isRequired
    error: React.PropTypes.bool
    errorMessage: React.PropTypes.renderable
    children: React.PropTypes.renderable.isRequired

  render: ->
    if @props.loading
      <div className='ghu-spinner'>
        <Spinkit spinnerName='double-bounce' cssRequire />
      </div>
    else
      if @props.error
        <span className='ghu-loading-error'>
          {@props.errorMessage or "Error, please try again."}
        </span>
      else
        @props.children
