assert = require 'assert'
RouteBinding = require '../src/Router/RouteBinding.coffee'
RefluxRouter = require '../src/Router/RefluxRouter.coffee'



describe 'RefluxRouter', ->

  rb1 = new RouteBinding
    pattern: '/path/:param(/)'
    handleUrl: ({param}) ->
    listenToStores: []
    makeUrl: -> param: null
  rb2 = new RouteBinding
    pattern: '/path/:param(/)'
    handleUrl: ({param}) ->
    listenToStores: []
    makeUrl: -> param: 'something'
  router = new RefluxRouter [rb1, rb2]

  describe 'getRouteBindingsForUrl', ->
    it 'should return the first route binding that matches', (done) ->
      assert.equal rb1, router.getRouteBindingForUrl '/path/4'
      assert.equal rb1, router.getRouteBindingForUrl '/path/4/'
      assert.equal rb1, router.getRouteBindingForUrl '/path/heljfalsjdashd/'
      done()

    it 'should throw an error if no route binding matches', ->
      assert.throws (-> router.getRouteBindingForUrl '/broken'), Error

  describe 'makeUrl', ->
    it 'should return the first non-null url that any RouteBinding proposes', ->
      assert.equal '/path/something', router.makeUrl()

    it 'should throw an error if no RouteBinding can make a URL', ->
      router2 = new RefluxRouter [
        new RouteBinding
          pattern: '/path/:param(/)'
          handleUrl: ({param}) ->
          listenToStores: []
          makeUrl: -> param: null
      ]
      assert.throws (-> router2.makeUrl()), Error
