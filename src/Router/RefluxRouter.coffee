module.exports = class RefluxRouter
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
