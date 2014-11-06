Actions = require './Actions.coffee'


module.exports = Stores =
  userStore:            require './Stores/UserStore.coffee'
  accessTokenStore:     require './Stores/AccessTokenStore.coffee'
  githubStore:          require './Stores/GithubStore.coffee'
  userReposStore:       require './Stores/UserReposStore.coffee'
  repoStore:            require './Stores/RepoStore.coffee'
  repoTreeStore:        require './Stores/RepoTreeStore.coffee'
  fileStore:            require './Stores/FileStore.coffee'
  fileContentsStore:    require './Stores/FileContentsStore.coffee'
  editableRegionsStore: require './Stores/EditableRegionsStore.coffee'
