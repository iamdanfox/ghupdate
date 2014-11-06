Actions = require './Actions.coffee'
Stores = require './Stores.coffee'


class RouteBinding
  constructor: ({@urlRegex, @handleUrl, @listenToStores, @makeUrl}) ->

  matchesUrl: (string) -> # 0 is a perfect match, Infinity is a failure
    matches = @urlRegex.exec string
    if matches? then return matches.length - 1 else Infinity



class Router
  constructor: (@routeBindings) ->

  start: ->
    stores = @routeBindings.map (routeBinding) -> routeBinding.listenToStores
    allStores = [].concat.apply [], stores
    for store in allStores
      store.listen @handleStoreChange
    window.addEventListener 'hashchange', @handleHashChange, false
    @handleHashChange()

  handleStoreChange: =>
    console.log 'handleStoreChange'
    window.location.hash = @makeUrl()

  handleHashChange: =>
    console.log 'handleHashChange'
    url = window.location.hash.replace '#', ''
    @getRouteBindingForUrl(url).handleUrl url

  # ask all RouteBindings to make a URL, returns the longest
  makeUrl: ->
    urls = @routeBindings
      .map (routeBinding) -> routeBinding.makeUrl()
      .filter (url) -> url?
    if urls.length
      lengths = urls.map (url) -> url.length
      longest = Math.max.apply Math, lengths
      indexOfLongest = lengths.indexOf longest
      return urls[indexOfLongest]
    else
      throw new Error 'makeUrl failed for all RouteBindings'

  # return whichever RouteBinding claims the best match for a given url
  getRouteBindingForUrl: (url) ->
    matches = @routeBindings.map (routeBinding) -> routeBinding.matchesUrl url
    bestMatch = Math.min.apply Math, matches
    if bestMatch < Infinity
      indexOfBestMatch = matches.indexOf bestMatch
      return @routeBindings[indexOfBestMatch]
    else
      throw new Error 'no RouteBinding matched ' + url




myRouter = new Router [
    new RouteBinding
      # /users/:username(/)
      urlRegex: /^\/users\/([^\/]+)\/?$/
      handleUrl: (string) ->
        [username] = @urlRegex.exec(string)[1..]
        Actions.setUsername username
      listenToStores: [Stores.userStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        if username? then "/users/#{username}" else null
  ,
    new RouteBinding
      # /users/:username/repos/:repo(/)
      urlRegex: /^\/users\/([^\/]+)\/repos\/([^\/]+)\/?$/
      handleUrl: (string) ->
        [username, repo] = @urlRegex.exec(string)[1..]
        Actions.setUsername username
        Actions.selectRepo repo
      listenToStores: [Stores.userStore, Stores.repoStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        if username? and repo? then "/users/#{username}/repos/#{repo}" else null
  ,
    new RouteBinding
      # /
      urlRegex: /^\/?$/
      handleUrl: (string) ->
        Actions.selectFile null
        Actions.selectRepo null
        Actions.setUsername null
      listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore]
      makeUrl: ->
        username = Stores.userStore.getUsername()
        repo = Stores.repoStore.getSelectedRepoName()
        file = Stores.fileStore.getSelectedFile()
        if username is null and repo is null and file is null then '' else null

]

myRouter.start()
