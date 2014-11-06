Actions = require './Actions.coffee'


module.exports = Stores =
  userStore:         require './Stores/UserStore.coffee'
  accessTokenStore:  require './Stores/AccessTokenStore.coffee'
  githubStore:       require './Stores/GithubStore.coffee'
  userReposStore:    require './Stores/UserReposStore.coffee'
  repoStore:         require './Stores/RepoStore.coffee'
  repoTreeStore:     require './Stores/RepoTreeStore.coffee'
  fileStore:         require './Stores/FileStore.coffee'
  fileContentsStore: require './Stores/FileContentsStore.coffee'

# SHORTCUT CODE
Stores.repoTreeStore.listen ->
  if Stores.repoTreeStore.getHTMLFiles()?.length is 1
    Actions.selectFile Stores.repoTreeStore.getHTMLFiles()[0].path
