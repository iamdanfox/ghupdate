module.exports = class RouteBinding
  constructor: (options) ->
    {@pattern, @listenToStores} = options
    @_handleUrl = options.handleUrl
    @_makeUrl = options.makeUrl

  handleUrl: (string) =>
    keys = @pattern.match /:([^\/\(]+)/g
    urlParameters = {}
    values = @urlRegex().exec(string)[1..]
    for i,key of keys
      urlParameters[key.substr 1] = values[i]
    @_handleUrl urlParameters

  makeUrl: =>
    mapping = @_makeUrl()
    if mapping?
      url = @pattern.replace '(/)', ''
      for key, value of mapping
        if value is null then return null
        url = url.replace ':'+key, value
      return url
    else
      return null

  urlRegex: =>
    regex = @pattern
      .replace /\(\/\)/g, '/?'
      .replace /\//g, '\\/'
      .replace /:([^\/\)\\]+)/g, '([^\\/]+)'
    return new RegExp("^#{regex}$")

  matchesUrl: (string) =>
    @urlRegex().test string
