Reflux = require 'reflux'

module.exports = Actions = Reflux.createActions [
  'setUsername',
  'selectRepo',
  'selectFile',
  'readCodeFromUrl',
  'readAccessTokenFromLocalStorage',
  'saveFile'
]
