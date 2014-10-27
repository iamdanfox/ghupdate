Actions = require './Actions.coffee'


module.exports = Stores =
  userStore:      require './Stores/UserStore.coffee'
  userReposStore: require './Stores/UserReposStore.coffee'
  repoStore:      require './Stores/RepoStore.coffee'
  repoTreeStore:  require './Stores/RepoTreeStore.coffee'
  fileStore:      require './Stores/FileStore.coffee'

# SHORTCUT CODE
# TODO: move this somewhere else
Stores.userReposStore.listen ->
  if Stores.userReposStore.getRepos()?.length is 1
    Actions.selectRepo Stores.userReposStore.getRepos()[0] # TODO: doesn't this need a `.name`

Stores.repoTreeStore.listen ->
  if Stores.repoTreeStore.getHTMLFiles()?.length is 1
    Actions.selectFile Stores.repoTreeStore.getHTMLFiles()[0].path
