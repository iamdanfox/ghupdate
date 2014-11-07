Actions = require './Actions.coffee'
Stores = require './Stores.coffee'
RefluxRouter = require './Router/RefluxRouter.coffee'
RouteBinding = require './Router/RouteBinding.coffee'


module.exports = new RefluxRouter [
    new RouteBinding
      pattern: '/users/:username/repos/:repo/files/:file(/)'
      handleUrl: ({username, repo, file}) ->
        # console.log 'usersreposfiles handleUrl', username, repo, file
        Actions.setUsername username
        Actions.selectRepo repo
        Actions.selectFile file
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username: Stores.userStore.get()
        repo: Stores.repoStore.get()
        file: Stores.fileStore.get()
  ,
    new RouteBinding
      pattern: '/users/:username/repos/:repo(/)'
      handleUrl: ({username, repo}) ->
        # console.log 'usersrepos handleUrl', username, repo
        Actions.setUsername username
        Actions.selectRepo repo
        Actions.selectFile null
      listenToStores: [Stores.userStore, Stores.repoStore]
      makeUrl: ->
        username: Stores.userStore.get()
        repo: Stores.repoStore.get()
  ,
    new RouteBinding
      pattern: '/users/:username(/)'
      handleUrl: ({username}) ->
        # console.log 'users handleUrl', username
        Actions.setUsername username
        Actions.selectRepo null
        Actions.selectFile null
      listenToStores: [Stores.userStore]
      makeUrl: ->
        username: Stores.userStore.get()
  ,
    new RouteBinding
      pattern: '(/)'
      handleUrl: ->
        # console.log 'default handleUrl'
        Actions.selectFile null
        Actions.selectRepo null
        Actions.setUsername null
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username = Stores.userStore.get()
        repo = Stores.repoStore.get()
        file = Stores.fileStore.get()
        if username is null and repo is null and file is null then {} else null
]
