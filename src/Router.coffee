Actions = require './Actions.coffee'
Stores = require './Stores.coffee'


class RouteBinding
  constructor: ({@urlRegex, @handleUrl, @listenToStores, @makeUrl}) ->

  matchesUrl: (string) ->
    @urlRegex.test string



class Router
  constructor: (@routeBindings) ->

  start: ->
    console.log 'Router.start', window.location.hash
    stores = @routeBindings.map (routeBinding) -> routeBinding.listenToStores
    allStores = [].concat.apply [], stores
    deduped = allStores.filter (item, index, array) -> index is array.lastIndexOf item
    for store in deduped
      store.listen @handleStoreChange
    window.addEventListener 'hashchange', @handleHashChange, false
    @handleHashChange()

  handleStoreChange: =>
    newUrl = '#'+@makeUrl()
    if window.location.hash isnt newUrl
      console.log "pushing new hash: from: '" + window.location.hash + "' to '" + newUrl + "'"
      @_lastUrlHandled = newUrl
      window.location.hash = newUrl

  handleHashChange: =>
    if window.location.hash isnt @_lastUrlHandled # ie someone else triggered it
      console.log "noticed hash changed: '#{window.location.hash}'"
      url = window.location.hash.replace '#', ''
      @getRouteBindingForUrl(url).handleUrl url
      @_lastUrlHandled = url

  # ask all RouteBindings to make a URL, returns the first
  makeUrl: ->
    urls = @routeBindings
      .map (routeBinding) -> routeBinding.makeUrl()
      .filter (url) -> url?
    if urls.length > 0
      return urls[0]
    else
      throw new Error 'makeUrl failed for all RouteBindings'

  # return whichever RouteBinding claims the best match for a given url
  getRouteBindingForUrl: (url) ->
    matches = @routeBindings
      .filter (routeBinding) -> routeBinding.matchesUrl url
    if matches.length > 0
      return matches[0]
    else
      throw new Error 'no RouteBinding matched ' + url




myRouter = new Router [
    new RouteBinding
      # /users/:username/repos/:repo/files/:file(/)
      urlRegex: /^\/users\/([^\/]+)\/repos\/([^\/]+)\/files\/([^\/]+)\/?$/
      handleUrl: (string) ->
        console.log 'usersreposfiles handleUrl'
        [username, repo, filename] = @urlRegex.exec(string)[1..]
        Actions.setUsername username
        Actions.selectRepo repo
        Actions.selectFile filename
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        file = Stores.fileStore.getSelectedFile()
        if username? and repo? and file? then "/users/#{username}/repos/#{repo}/files/#{file}" else null
  ,
    new RouteBinding
      # /users/:username/repos/:repo(/)
      urlRegex: /^\/users\/([^\/]+)\/repos\/([^\/]+)\/?$/
      handleUrl: (string) ->
        console.log 'usersrepos handleUrl'
        [username, repo] = @urlRegex.exec(string)[1..]
        Actions.setUsername username
        Actions.selectRepo repo
        Actions.selectFile null
      listenToStores: [Stores.userStore, Stores.repoStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        if username? and repo? then "/users/#{username}/repos/#{repo}" else null
  ,
    new RouteBinding
      # /users/:username(/)
      urlRegex: /^\/users\/([^\/]+)\/?$/
      handleUrl: (string) ->
        console.log 'users handleUrl'
        [username] = @urlRegex.exec(string)[1..]
        Actions.setUsername username
        Actions.selectRepo null
        Actions.selectFile null
      listenToStores: [Stores.userStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        if username? then "/users/#{username}" else null
  ,
    new RouteBinding
      # /
      urlRegex: /^\/?$/
      handleUrl: (string) ->
        console.log 'default handleUrl'
        Actions.selectFile null
        Actions.selectRepo null
        Actions.setUsername null
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        file = Stores.fileStore.getSelectedFile()
        if username is null and repo is null and file is null then '/' else null

]

myRouter.start()
