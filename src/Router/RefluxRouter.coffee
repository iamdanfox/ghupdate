###

RefluxRouter v0.0.1
===================

Keep Reflux stores in sync with the address bar using two way binding.

The RefluxRouter is parameterised by a number of RouteBindings.  Whenever the
hash address changes, the first RouteBinding that claims it `canHandleUrl` will
have its `handleUrl` function called.  This should trigger some Actions and
update the contents of the stores.

In addition, whenever these Stores change, the RefluxRouter asks each
RouteBinding to perform its `makeUrl` function.  The hash is updated to the
first string that is successfully returned.

TODO:
 - Allow `start` to accept a `urlPrefix`
 - Allow composed routers to appear in routeBindings (with an accompanying prefix)

###
module.exports = class RefluxRouter
  constructor: (@routeBindings) ->

  start: ->
    # console.log 'Router.start', window.location.hash
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
      # console.log "pushing new hash: from: '" + window.location.hash + "' to '" + newUrl + "'"
      @_lastUrlHandled = newUrl
      window.location.hash = newUrl

  handleHashChange: =>
    if window.location.hash isnt @_lastUrlHandled # ie someone else triggered it
      # console.log "noticed hash changed: '#{window.location.hash}'"
      url = window.location.hash.replace '#', ''
      @getRouteBindingForUrl(url).handleUrl url
      @_lastUrlHandled = url

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
      .filter (routeBinding) -> routeBinding.canHandleUrl url
    if matches.length > 0
      return matches[0]
    else
      throw new Error 'no RouteBinding matched ' + url
