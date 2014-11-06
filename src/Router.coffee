Actions = require './Actions.coffee'
Stores = require './Stores.coffee'


class RouteBinding
  constructor: (options) ->
    {@pattern, @listenToStores, @makeUrl} = options
    @_handleUrl = options.handleUrl

  handleUrl: (string) =>
    keys = @pattern.match /:([^\/\(]+)/g
    urlParameters = {}
    values = @urlRegex().exec(string)[1..]
    for i,key of keys
      urlParameters[key.substr 1] = values[i]
    @_handleUrl urlParameters

  urlRegex: =>
    regex = @pattern
      .replace /\(\/\)/g, '/?'
      .replace /\//g, '\\/'
      .replace /:([^\/\)\\]+)/g, '([^\\/]+)'
    return new RegExp("^#{regex}$")

  matchesUrl: (string) =>
    @urlRegex().test string



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
      pattern: '/users/:username/repos/:repo/files/:file(/)'
      handleUrl: ({username, repo, file}) ->
        console.log 'usersreposfiles handleUrl', username, repo, file
        Actions.setUsername username
        Actions.selectRepo repo
        Actions.selectFile file
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        file = Stores.fileStore.getSelectedFile()
        if username? and repo? and file? then "/users/#{username}/repos/#{repo}/files/#{file}" else null
  ,
    new RouteBinding
      pattern: '/users/:username/repos/:repo(/)'
      handleUrl: ({username, repo}) ->
        console.log 'usersrepos handleUrl', username, repo
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
      pattern: '/users/:username(/)'
      handleUrl: ({username}) ->
        console.log 'users handleUrl', username
        Actions.setUsername username
        Actions.selectRepo null
        Actions.selectFile null
      listenToStores: [Stores.userStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        if username? then "/users/#{username}" else null
  ,
    new RouteBinding
      pattern: '(/)'
      handleUrl: () ->
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
