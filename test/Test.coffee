assert = require 'assert'
RouteBinding = require '../src/Router/RouteBinding.coffee'


describe 'RouteBinding', ->
  rb1 = new RouteBinding
    pattern: '/path/:param(/)'
    handleUrl: ({param}) ->
    listenToStores: []
    makeUrl: ->
      param: 3

  describe 'canHandleUrl', ->
    it 'should accept simple urls', (done) ->
      assert.equal true, rb1.canHandleUrl '/path/3'
      assert.equal true, rb1.canHandleUrl '/path/helloWorld5'
      assert.equal true, rb1.canHandleUrl '/path/amaze-balls'
      done()

    it 'should accept a trailing slash', ->
      assert.equal(true, rb1.canHandleUrl '/path/3/')

    it 'should reject too many slashes', ->
      assert.equal false, rb1.canHandleUrl '/path/too/many'

  describe 'makeUrl', ->
    it 'should substitute into a pattern', ->
      assert.equal '/path/3', rb1.makeUrl()

  describe 'handleUrl', ->
    it 'should pass URL parameters correctly', (done) ->
      rb2 = new RouteBinding
        pattern: '/hello/:a/new/:b(/)'
        handleUrl: ({a,b}) ->
          assert.equal 'brave', a
          assert.equal 'world', b
          done()
        listenToStores: []
        makeUrl: -> null

      rb2.handleUrl '/hello/brave/new/world'

  describe 'constructor', ->
    it 'should fail if arguments are missing', ->

      assert.throws (-> rb = new RouteBinding({})), Error
