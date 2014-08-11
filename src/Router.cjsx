React = require 'react'
Routes = require 'react-router/Routes'
Route = require 'react-router/Route'

Router = module.exports = React.createClass
  displayName: 'Router'

  render: ->
    <Routes>
      <Route handler={App}>
        <Route name="about" handler={About}/>
        <Route name="users" handler={Users}>
          <Route name="user" path="/user/:userId" handler={User}/>
        </Route>
      </Route>
    </Routes>