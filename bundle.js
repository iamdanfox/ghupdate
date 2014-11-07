webpackJsonp([0],{

/***/ 0:
/*!*******************!*\
  !*** ./main.cjsx ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, App, React, Router;
	
	React = __webpack_require__(/*! react */ 1);
	
	App = __webpack_require__(/*! ./src/Components/App.cjsx */ 25);
	
	Actions = __webpack_require__(/*! ./src/Actions.coffee */ 23);
	
	Router = __webpack_require__(/*! ./src/Router.coffee */ 24);
	
	window.React = React;
	
	React.renderComponent(React.createElement(App, null), document.getElementsByTagName('body')[0]);
	
	Actions.readCodeFromUrl();
	
	Actions.readAccessTokenFromLocalStorage();
	
	Router.start();


/***/ },

/***/ 23:
/*!****************************!*\
  !*** ./src/Actions.coffee ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	module.exports = Actions = Reflux.createActions(['setUsername', 'selectRepo', 'selectFile', 'readCodeFromUrl', 'readAccessTokenFromLocalStorage', 'saveFile']);


/***/ },

/***/ 24:
/*!***************************!*\
  !*** ./src/Router.coffee ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, RefluxRouter, RouteBinding, Stores;
	
	Actions = __webpack_require__(/*! ./Actions.coffee */ 23);
	
	Stores = __webpack_require__(/*! ./Stores.coffee */ 76);
	
	RefluxRouter = __webpack_require__(/*! ./Router/RefluxRouter.coffee */ 83);
	
	RouteBinding = __webpack_require__(/*! ./Router/RouteBinding.coffee */ 84);
	
	module.exports = new RefluxRouter([
	  new RouteBinding({
	    pattern: '/users/:username/repos/:repo/files/:file(/)',
	    handleUrl: function(_arg) {
	      var file, repo, username;
	      username = _arg.username, repo = _arg.repo, file = _arg.file;
	      Actions.setUsername(username);
	      Actions.selectRepo(repo);
	      return Actions.selectFile(file);
	    },
	    listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore],
	    makeUrl: function() {
	      return {
	        username: Stores.userStore.get(),
	        repo: Stores.repoStore.get(),
	        file: Stores.fileStore.get()
	      };
	    }
	  }), new RouteBinding({
	    pattern: '/users/:username/repos/:repo(/)',
	    handleUrl: function(_arg) {
	      var repo, username;
	      username = _arg.username, repo = _arg.repo;
	      Actions.setUsername(username);
	      Actions.selectRepo(repo);
	      return Actions.selectFile(null);
	    },
	    listenToStores: [Stores.userStore, Stores.repoStore],
	    makeUrl: function() {
	      return {
	        username: Stores.userStore.get(),
	        repo: Stores.repoStore.get()
	      };
	    }
	  }), new RouteBinding({
	    pattern: '/users/:username(/)',
	    handleUrl: function(_arg) {
	      var username;
	      username = _arg.username;
	      Actions.setUsername(username);
	      Actions.selectRepo(null);
	      return Actions.selectFile(null);
	    },
	    listenToStores: [Stores.userStore],
	    makeUrl: function() {
	      return {
	        username: Stores.userStore.get()
	      };
	    }
	  }), new RouteBinding({
	    pattern: '(/)',
	    handleUrl: function() {
	      Actions.selectFile(null);
	      Actions.selectRepo(null);
	      return Actions.setUsername(null);
	    },
	    listenToStores: [Stores.userStore, Stores.repoStore, Stores.fileStore],
	    makeUrl: function() {
	      var file, repo, username;
	      username = Stores.userStore.get();
	      repo = Stores.repoStore.get();
	      file = Stores.fileStore.get();
	      if (username === null && repo === null && file === null) {
	        return {};
	      } else {
	        return null;
	      }
	    }
	  })
	]);


/***/ },

/***/ 25:
/*!*********************************!*\
  !*** ./src/Components/App.cjsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, App, Editor, FileChooser, LogInButton, React, Reflux, RepoChooser, Stores, UsernameChooser;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 76);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	RepoChooser = __webpack_require__(/*! ./RepoChooser.cjsx */ 77);
	
	FileChooser = __webpack_require__(/*! ./FileChooser.cjsx */ 78);
	
	Editor = __webpack_require__(/*! ./Editor.cjsx */ 79);
	
	LogInButton = __webpack_require__(/*! ./LogInButton.cjsx */ 80);
	
	UsernameChooser = __webpack_require__(/*! ./UsernameChooser.cjsx */ 81);
	
	App = module.exports = React.createClass({
	  displayName: 'App',
	  mixins: [Reflux.ListenerMixin],
	  getInitialState: function() {
	    return {
	      username: null,
	      isLoggedIn: false,
	      userReposStore: Stores.userReposStore.getAll(),
	      repoName: null,
	      repoTreeStore: Stores.repoTreeStore.getAll(),
	      file: null
	    };
	  },
	  componentDidMount: function() {
	    this.listenTo(Stores.userStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          username: Stores.userStore.get()
	        });
	      };
	    })(this));
	    this.listenTo(Stores.accessTokenStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          isLoggedIn: Stores.accessTokenStore.isLoggedIn()
	        });
	      };
	    })(this));
	    this.listenTo(Stores.userReposStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          userReposStore: Stores.userReposStore.getAll()
	        });
	      };
	    })(this));
	    this.listenTo(Stores.repoStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          repoName: Stores.repoStore.get()
	        });
	      };
	    })(this));
	    this.listenTo(Stores.repoTreeStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          repoTreeStore: Stores.repoTreeStore.getAll()
	        });
	      };
	    })(this));
	    return this.listenTo(Stores.fileStore, (function(_this) {
	      return function() {
	        return _this.setState({
	          file: Stores.fileStore.get()
	        });
	      };
	    })(this));
	  },
	  render: function() {
	    __webpack_require__(/*! ./App.less */ 156);
	    return React.createElement(React.DOM.div, {
	      "className": "ghu-app"
	    }, React.createElement(React.DOM.h1, null, "GH Update"), (this.state.username == null ? React.createElement(UsernameChooser, null) : this.state.repoName == null ? React.createElement(React.DOM.div, null, React.createElement(React.DOM.h2, {
	      "className": 'ghu-username'
	    }, this.state.username), React.createElement(RepoChooser, {
	      "loading": this.state.userReposStore.loading,
	      "error": this.state.userReposStore.error,
	      "repos": this.state.userReposStore.repos
	    })) : this.state.file == null ? React.createElement(React.DOM.div, null, React.createElement(React.DOM.h2, {
	      "className": 'ghu-username'
	    }, React.createElement(React.DOM.a, {
	      "onClick": (function() {
	        return Actions.selectRepo(null);
	      })
	    }, this.state.username), " \x2F ", this.state.repoName), React.createElement(FileChooser, {
	      "loading": this.state.repoTreeStore.loading,
	      "error": this.state.repoTreeStore.error,
	      "htmlFiles": this.state.repoTreeStore.htmlFiles
	    })) : React.createElement(React.DOM.div, null, React.createElement(React.DOM.h2, {
	      "className": 'ghu-username'
	    }, React.createElement(React.DOM.a, {
	      "onClick": (function() {
	        return Actions.selectRepo(null);
	      })
	    }, this.state.username), " \x2F ", React.createElement(React.DOM.a, {
	      "onClick": (function() {
	        return Actions.selectFile(null);
	      })
	    }, this.state.repoName), " \x2F ", this.state.file), (!this.state.isLoggedIn ? React.createElement(React.DOM.div, null, "Please log in", React.createElement(LogInButton, null)) : React.createElement(Editor, null)))));
	  }
	});


/***/ },

/***/ 76:
/*!***************************!*\
  !*** ./src/Stores.coffee ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Stores;
	
	Actions = __webpack_require__(/*! ./Actions.coffee */ 23);
	
	module.exports = Stores = {
	  userStore: __webpack_require__(/*! ./Stores/UserStore.coffee */ 166),
	  accessTokenStore: __webpack_require__(/*! ./Stores/AccessTokenStore.coffee */ 167),
	  githubStore: __webpack_require__(/*! ./Stores/GithubStore.coffee */ 168),
	  userReposStore: __webpack_require__(/*! ./Stores/UserReposStore.coffee */ 169),
	  repoStore: __webpack_require__(/*! ./Stores/RepoStore.coffee */ 170),
	  repoTreeStore: __webpack_require__(/*! ./Stores/RepoTreeStore.coffee */ 171),
	  fileStore: __webpack_require__(/*! ./Stores/FileStore.coffee */ 172),
	  fileContentsStore: __webpack_require__(/*! ./Stores/FileContentsStore.coffee */ 173)
	};


/***/ },

/***/ 77:
/*!*****************************************!*\
  !*** ./src/Components/RepoChooser.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Loading, React, Reflux, RepoChooser, RepoLink, RepoList, Stores, timeago;
	
	React = __webpack_require__(/*! react */ 1);
	
	timeago = __webpack_require__(/*! timeago */ 2);
	
	Loading = __webpack_require__(/*! ./Loading.cjsx */ 155);
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 76);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	module.exports = RepoChooser = React.createClass({
	  displayName: 'RepoChooser',
	  mixins: [Reflux.ListenerMixin],
	  propTypes: {
	    loading: React.PropTypes.bool.isRequired,
	    error: React.PropTypes.bool.isRequired,
	    repos: React.PropTypes.array
	  },
	  render: function() {
	    __webpack_require__(/*! ./RepoChooser.less */ 158);
	    return React.createElement(Loading, {
	      "loading": this.props.loading,
	      "error": this.props.error,
	      "errorMessage": 'Error loading repos, please try again'
	    }, React.createElement(RepoList, {
	      "repos": this.props.repos
	    }));
	  }
	});
	
	RepoList = React.createClass({
	  displayName: 'RepoList',
	  propTypes: {
	    repos: React.PropTypes.array.isRequired
	  },
	  render: function() {
	    var sortedRepos;
	    sortedRepos = this.props.repos.slice(0);
	    sortedRepos.sort(function(a, b) {
	      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
	    });
	    return React.createElement(React.DOM.ul, {
	      "className": 'ghu-repo-list'
	    }, sortedRepos.filter(function(repo) {
	      return repo.has_pages;
	    }).map(function(repo) {
	      return React.createElement(RepoLink, {
	        "repo": repo,
	        "key": repo.name
	      });
	    }));
	  }
	});
	
	RepoLink = React.createClass({
	  displayName: 'RepoLink',
	  selectRepo: function() {
	    return Actions.selectRepo(this.props.repo.name);
	  },
	  render: function() {
	    return React.createElement(React.DOM.li, {
	      "key": this.props.repo.id,
	      "className": 'ghu-repo-link',
	      "onClick": this.selectRepo
	    }, React.createElement(React.DOM.a, null, this.props.repo.name), React.createElement(React.DOM.span, {
	      "className": 'ghu-last-updated'
	    }, "last updated ", timeago(this.props.repo.pushed_at)));
	  }
	});


/***/ },

/***/ 78:
/*!*****************************************!*\
  !*** ./src/Components/FileChooser.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileChooser, React, Reflux, Stores, TreeFileView, TreeView;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 76);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	FileChooser = module.exports = React.createClass({
	  displayName: 'FileChooser',
	  mixins: [Reflux.ListenerMixin],
	  propTypes: {
	    htmlFiles: React.PropTypes.array,
	    loading: React.PropTypes.bool.isRequired,
	    error: React.PropTypes.bool.isRequired
	  },
	  componentWillMount: function() {
	    return __webpack_require__(/*! ./FileChooser.less */ 160);
	  },
	  render: function() {
	    var Loading;
	    Loading = __webpack_require__(/*! ./Loading.cjsx */ 155);
	    return React.createElement(Loading, {
	      "loading": this.props.loading,
	      "error": this.props.error,
	      "errorMessage": "Error loading file list"
	    }, React.createElement(TreeView, {
	      "htmlFiles": this.props.htmlFiles
	    }));
	  }
	});
	
	TreeView = React.createClass({
	  displayName: 'TreeView',
	  propTypes: {
	    htmlFiles: React.PropTypes.array.isRequired
	  },
	  render: function() {
	    var item;
	    return React.createElement(React.DOM.ul, {
	      "className": 'ghu-file-chooser'
	    }, (function() {
	      var _i, _len, _ref, _results;
	      _ref = this.props.htmlFiles;
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        item = _ref[_i];
	        _results.push(React.createElement(TreeFileView, {
	          "item": item,
	          "key": item.path
	        }));
	      }
	      return _results;
	    }).call(this));
	  }
	});
	
	TreeFileView = React.createClass({
	  displayName: 'TreeFileView',
	  propTypes: {
	    item: React.PropTypes.object.isRequired
	  },
	  selectFile: function() {
	    return Actions.selectFile(this.props.item.path);
	  },
	  render: function() {
	    return React.createElement(React.DOM.li, {
	      "className": 'file',
	      "key": this.props.item.path,
	      "onClick": this.selectFile
	    }, this.props.item.path);
	  }
	});


/***/ },

/***/ 79:
/*!************************************!*\
  !*** ./src/Components/Editor.cjsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Editor, Loading, React, Reflux, fileContentsStore, fileStore, _ref;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	React = __webpack_require__(/*! react */ 1);
	
	Loading = __webpack_require__(/*! ./Loading.cjsx */ 155);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	_ref = __webpack_require__(/*! ../Stores.coffee */ 76), fileStore = _ref.fileStore, fileContentsStore = _ref.fileContentsStore;
	
	module.exports = Editor = React.createClass({
	  displayName: 'Editor',
	  mixins: [Reflux.ListenerMixin],
	  getInitialState: function() {
	    return {
	      file: fileStore.get(),
	      contents: fileContentsStore.getContents(),
	      loading: fileContentsStore.isLoading(),
	      error: fileContentsStore.hasError()
	    };
	  },
	  componentWillMount: function() {
	    __webpack_require__(/*! ./Editor.less */ 162);
	    this.listenTo(fileStore, this.syncToStore);
	    return this.listenTo(fileContentsStore, this.syncToStore);
	  },
	  syncToStore: function() {
	    if (this.isMounted()) {
	      return this.setState({
	        file: fileStore.get(),
	        contents: fileContentsStore.getContents(),
	        loading: fileContentsStore.isLoading(),
	        error: fileContentsStore.hasError()
	      });
	    }
	  },
	  handleSave: function() {
	    return Actions.saveFile({
	      contents: this.refs.editor.getDOMNode().value,
	      commitMessage: '[ghupdate commit]'
	    });
	  },
	  render: function() {
	    return React.createElement(Loading, {
	      "loading": this.state.loading,
	      "error": this.state.error,
	      "errorMessage": 'Error loading file, please try again'
	    }, React.createElement(React.DOM.div, {
	      "className": 'ghu-editor'
	    }, React.createElement(React.DOM.textarea, {
	      "defaultValue": this.state.contents,
	      "ref": 'editor'
	    }), React.createElement(React.DOM.button, {
	      "onClick": this.handleSave
	    }, "Save")));
	  }
	});


/***/ },

/***/ 80:
/*!*****************************************!*\
  !*** ./src/Components/LogInButton.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var LogInButton, React, Reflux, Stores;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 76);
	
	LogInButton = module.exports = React.createClass({
	  displayName: 'LogInButton',
	  mixins: [Reflux.ListenerMixin],
	  getInitialState: function() {
	    return {
	      loggedIn: Stores.accessTokenStore.isLoggedIn(),
	      accessTokenLoading: Stores.accessTokenStore.getAccessTokenLoading(),
	      accessTokenError: Stores.accessTokenStore.getAccessTokenError()
	    };
	  },
	  componentDidMount: function() {
	    return this.listenTo(Stores.accessTokenStore, (function(_this) {
	      return function() {
	        if (_this.isMounted()) {
	          return _this.setState({
	            loggedIn: Stores.accessTokenStore.isLoggedIn(),
	            accessTokenLoading: Stores.accessTokenStore.getAccessTokenLoading(),
	            accessTokenError: Stores.accessTokenStore.getAccessTokenError()
	          });
	        }
	      };
	    })(this));
	  },
	  redirectToOAuth: function() {
	    return window.location = "https://github.com/login/oauth/authorize" + "?client_id=138c264183219a2ac2c9" + "&amp;scope=repo" + "&amp;redirect_uri=http://iamdanfox.github.io/ghupdate/" + "&amp;state=helloworld";
	  },
	  render: function() {
	    if (this.state.loggedIn) {
	      return React.createElement(React.DOM.button, {
	        "disabled": true
	      }, "Logged in");
	    } else {
	      if (this.state.accessTokenLoading) {
	        return React.createElement(React.DOM.button, {
	          "disabled": true
	        }, "Logging in...");
	      } else {
	        if (this.state.accessTokenError) {
	          return React.createElement(React.DOM.p, null, "Error logging in. ", React.createElement(React.DOM.a, {
	            "href": "#",
	            "onClick": this.redirectToOAuth
	          }, "try again"));
	        } else {
	          return React.createElement(React.DOM.button, {
	            "onClick": this.redirectToOAuth
	          }, "Log in with GitHub");
	        }
	      }
	    }
	  }
	});


/***/ },

/***/ 81:
/*!*********************************************!*\
  !*** ./src/Components/UsernameChooser.cjsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, React, UsernameChooser;
	
	React = __webpack_require__(/*! react */ 1);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	UsernameChooser = module.exports = React.createClass({
	  displayName: 'UsernameChooser',
	  selectUsername: function(e) {
	    e.preventDefault();
	    return Actions.setUsername(this.refs.username.state.value);
	  },
	  render: function() {
	    var LogInButton;
	    __webpack_require__(/*! ./UsernameChooser.less */ 164);
	    LogInButton = __webpack_require__(/*! ./LogInButton.cjsx */ 80);
	    return React.createElement(React.DOM.div, {
	      "className": 'ghu-username-chooser'
	    }, React.createElement(React.DOM.form, {
	      "onSubmit": this.selectUsername
	    }, React.createElement(React.DOM.input, {
	      "type": 'text',
	      "ref": 'username',
	      "placeholder": 'Your GitHub username',
	      "autoFocus": true
	    })), React.createElement(React.DOM.p, null, "or"), React.createElement(LogInButton, null));
	  }
	});


/***/ },

/***/ 83:
/*!****************************************!*\
  !*** ./src/Router/RefluxRouter.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	
	/*
	
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
	 */
	var RefluxRouter,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	module.exports = RefluxRouter = (function() {
	  function RefluxRouter(routeBindings) {
	    this.routeBindings = routeBindings;
	    this.handleHashChange = __bind(this.handleHashChange, this);
	    this.handleStoreChange = __bind(this.handleStoreChange, this);
	  }
	
	  RefluxRouter.prototype.start = function() {
	    var allStores, deduped, store, stores, _i, _len;
	    stores = this.routeBindings.map(function(routeBinding) {
	      return routeBinding.listenToStores;
	    });
	    allStores = [].concat.apply([], stores);
	    deduped = allStores.filter(function(item, index, array) {
	      return index === array.lastIndexOf(item);
	    });
	    for (_i = 0, _len = deduped.length; _i < _len; _i++) {
	      store = deduped[_i];
	      store.listen(this.handleStoreChange);
	    }
	    window.addEventListener('hashchange', this.handleHashChange, false);
	    return this.handleHashChange();
	  };
	
	  RefluxRouter.prototype.handleStoreChange = function() {
	    var newUrl;
	    newUrl = '#' + this.makeUrl();
	    if (window.location.hash !== newUrl) {
	      this._lastUrlHandled = newUrl;
	      return window.location.hash = newUrl;
	    }
	  };
	
	  RefluxRouter.prototype.handleHashChange = function() {
	    var url;
	    if (window.location.hash !== this._lastUrlHandled) {
	      url = window.location.hash.replace('#', '');
	      this.getRouteBindingForUrl(url).handleUrl(url);
	      return this._lastUrlHandled = url;
	    }
	  };
	
	  RefluxRouter.prototype.makeUrl = function() {
	    var urls;
	    urls = this.routeBindings.map(function(routeBinding) {
	      return routeBinding.makeUrl();
	    }).filter(function(url) {
	      return url != null;
	    });
	    if (urls.length > 0) {
	      return urls[0];
	    } else {
	      throw new Error('makeUrl failed for all RouteBindings');
	    }
	  };
	
	  RefluxRouter.prototype.getRouteBindingForUrl = function(url) {
	    var matches;
	    matches = this.routeBindings.filter(function(routeBinding) {
	      return routeBinding.canHandleUrl(url);
	    });
	    if (matches.length > 0) {
	      return matches[0];
	    } else {
	      throw new Error('no RouteBinding matched ' + url);
	    }
	  };
	
	  return RefluxRouter;
	
	})();


/***/ },

/***/ 84:
/*!****************************************!*\
  !*** ./src/Router/RouteBinding.coffee ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var RouteBinding,
	  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	module.exports = RouteBinding = (function() {
	  function RouteBinding(options) {
	    this.canHandleUrl = __bind(this.canHandleUrl, this);
	    this.urlRegex = __bind(this.urlRegex, this);
	    this.makeUrl = __bind(this.makeUrl, this);
	    this.handleUrl = __bind(this.handleUrl, this);
	    this.pattern = options.pattern, this.listenToStores = options.listenToStores;
	    this._handleUrl = options.handleUrl;
	    this._makeUrl = options.makeUrl;
	  }
	
	  RouteBinding.prototype.handleUrl = function(string) {
	    var i, key, keys, urlParameters, values;
	    keys = this.pattern.match(/:([^\/\(]+)/g);
	    urlParameters = {};
	    values = this.urlRegex().exec(string).slice(1);
	    for (i in keys) {
	      key = keys[i];
	      urlParameters[key.substr(1)] = values[i];
	    }
	    return this._handleUrl(urlParameters);
	  };
	
	  RouteBinding.prototype.makeUrl = function() {
	    var key, mapping, url, value;
	    mapping = this._makeUrl();
	    if (mapping != null) {
	      url = this.pattern.replace('(/)', '');
	      for (key in mapping) {
	        value = mapping[key];
	        if (value === null) {
	          return null;
	        }
	        url = url.replace(':' + key, value);
	      }
	      return url;
	    } else {
	      return null;
	    }
	  };
	
	  RouteBinding.prototype.urlRegex = function() {
	    var regex;
	    regex = this.pattern.replace(/\(\/\)/g, '/?').replace(/\//g, '\\/').replace(/:([^\/\)\\]+)/g, '([^\\/]+)');
	    return new RegExp("^" + regex + "$");
	  };
	
	  RouteBinding.prototype.canHandleUrl = function(string) {
	    return this.urlRegex().test(string);
	  };
	
	  return RouteBinding;
	
	})();


/***/ },

/***/ 155:
/*!*************************************!*\
  !*** ./src/Components/Loading.cjsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Loading, React;
	
	React = __webpack_require__(/*! react */ 1);
	
	Loading = module.exports = React.createClass({
	  displayName: 'Loading',
	  propTypes: {
	    loading: React.PropTypes.bool.isRequired,
	    error: React.PropTypes.bool,
	    errorMessage: React.PropTypes.renderable,
	    children: React.PropTypes.renderable.isRequired
	  },
	  render: function() {
	    var Spinkit;
	    __webpack_require__(/*! ./Loading.less */ 223);
	    if (this.props.loading) {
	      Spinkit = __webpack_require__(/*! react-spinkit */ 6);
	      return React.createElement(React.DOM.div, {
	        "className": 'ghu-spinner'
	      }, React.createElement(Spinkit, {
	        "spinnerName": 'double-bounce',
	        "cssRequire": true
	      }));
	    } else {
	      if (this.props.error) {
	        return React.createElement(React.DOM.span, {
	          "className": 'ghu-loading-error'
	        }, this.props.errorMessage || "Error, please try again.");
	      } else {
	        return this.props.children;
	      }
	    }
	  }
	});


/***/ },

/***/ 156:
/*!*********************************!*\
  !*** ./src/Components/App.less ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/App.less */ 157);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/App.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/App.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 157:
/*!****************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/App.less ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, "body {\n  background: #eee;\n}\n.ghu-app {\n  background: #fcfcfc;\n  margin: 30px auto;\n  width: 40em;\n}\n.ghu-app h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: normal;\n  letter-spacing: 3px;\n  padding-top: 30px;\n  font-size: 14px;\n}\n.ghu-app h2.ghu-username a {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.ghu-app h2.ghu-username a:hover {\n  color: blue;\n}\n.ghu-app h2.ghu-username a:active {\n  color: #0000e6;\n}\n", ""]);

/***/ },

/***/ 158:
/*!*****************************************!*\
  !*** ./src/Components/RepoChooser.less ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/RepoChooser.less */ 159);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/RepoChooser.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/RepoChooser.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 159:
/*!************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/RepoChooser.less ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, "h2.ghu-username {\n  text-align: center;\n  font-size: 200%;\n  margin: 0;\n}\nul.ghu-repo-list {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\nul.ghu-repo-list li.ghu-repo-link {\n  padding: 10px 30px;\n  border-top: 1px solid #eee;\n  cursor: pointer;\n}\nul.ghu-repo-list li.ghu-repo-link .ghu-last-updated {\n  display: block;\n  color: #aaa;\n}\nul.ghu-repo-list li.ghu-repo-link:hover {\n  background: #444;\n  color: white;\n}\n", ""]);

/***/ },

/***/ 160:
/*!*****************************************!*\
  !*** ./src/Components/FileChooser.less ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/FileChooser.less */ 161);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/FileChooser.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/FileChooser.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 161:
/*!************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/FileChooser.less ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, "ul.ghu-file-chooser {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\nul.ghu-file-chooser li.file {\n  padding: 10px 30px;\n  border-top: 1px solid #eee;\n  cursor: pointer;\n}\nul.ghu-file-chooser li.file:hover {\n  background: #444;\n  color: white;\n}\n", ""]);

/***/ },

/***/ 162:
/*!************************************!*\
  !*** ./src/Components/Editor.less ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/Editor.less */ 163);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/Editor.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/Editor.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 163:
/*!*******************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/Editor.less ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, ".ghu-editor {\n  padding: 10px;\n}\n.ghu-editor textarea {\n  display: block;\n  height: 40em;\n  width: 100%;\n}\n.ghu-editor button {\n  display: block;\n  margin: 20px auto;\n  font-size: 130%;\n}\n", ""]);

/***/ },

/***/ 164:
/*!*********************************************!*\
  !*** ./src/Components/UsernameChooser.less ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/UsernameChooser.less */ 165);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/UsernameChooser.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/UsernameChooser.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 165:
/*!****************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/UsernameChooser.less ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, ".ghu-username-chooser {\n  padding-bottom: 30px;\n  text-align: center;\n}\n.ghu-username-chooser input {\n  font-size: 200%;\n  margin: 0 auto;\n  display: block;\n}\n.ghu-username-chooser button {\n  font-size: 130%;\n}\n", ""]);

/***/ },

/***/ 166:
/*!*************************************!*\
  !*** ./src/Stores/UserStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, UserStore, _username;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	_username = null;
	
	module.exports = UserStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(Actions.setUsername, this.setUsername);
	  },
	  setUsername: function(newUsername) {
	    if (_username !== newUsername) {
	      _username = newUsername;
	      return this.trigger();
	    }
	  },
	  get: function() {
	    return _username;
	  }
	});


/***/ },

/***/ 167:
/*!********************************************!*\
  !*** ./src/Stores/AccessTokenStore.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var AccessTokenStore, Actions, Reflux, _accessToken, _accessTokenError, _accessTokenLoading;
	
	__webpack_require__(/*! es6-promise */ 7).polyfill();
	
	__webpack_require__(/*! fetch */ 3);
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	_accessToken = null;
	
	_accessTokenLoading = false;
	
	_accessTokenError = false;
	
	module.exports = AccessTokenStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(Actions.readCodeFromUrl, this.readCodeFromUrl);
	    return this.listenTo(Actions.readAccessTokenFromLocalStorage, this.readAccessTokenFromLocalStorage);
	  },
	  readCodeFromUrl: function() {
	    var code, regex, results;
	    regex = new RegExp("[\\?&]code=([^&#]*)");
	    results = regex.exec(location.search);
	    code = results != null ? decodeURIComponent(results[1].replace(/\+/g, " ")) : '';
	    if (code !== '' && !_accessTokenLoading) {
	      _accessTokenLoading = true;
	      _accessTokenError = false;
	      this.trigger();
	      return fetch('https://ghupdate.herokuapp.com/login/oauth/access_token?code=' + code, {
	        method: 'post'
	      }).then(function(response) {
	        return response.json();
	      }).then(function(json) {
	        if (json.access_token != null) {
	          _accessToken = json.access_token;
	          return localStorage.setItem('ghu-token', _accessToken);
	        } else {
	          return Promise.reject(json);
	        }
	      })["catch"](function(error) {
	        _accessTokenError = true;
	        return console.error(error);
	      }).then((function(_this) {
	        return function() {
	          _accessTokenLoading = false;
	          return _this.trigger();
	        };
	      })(this));
	    }
	  },
	  readAccessTokenFromLocalStorage: function() {
	    var token;
	    token = localStorage.getItem('ghu-token');
	    if (!_accessTokenLoading && (token != null)) {
	      _accessTokenLoading = true;
	      _accessTokenError = false;
	      this.trigger();
	      return fetch('https://api.github.com/user', {
	        headers: {
	          'Accept': 'application/vnd.github.v3+json',
	          'Authorization': 'token ' + token
	        }
	      }).then(function(response) {
	        if (response.status === 200) {
	          return _accessToken = token;
	        } else {
	          return Promise.reject();
	        }
	      })["catch"](function() {
	        _accessTokenError = true;
	        return localStorage.removeItem('ghu-token');
	      }).then((function(_this) {
	        return function() {
	          _accessTokenLoading = false;
	          return _this.trigger();
	        };
	      })(this));
	    }
	  },
	  isLoggedIn: function() {
	    return _accessToken != null;
	  },
	  getAccessTokenLoading: function() {
	    return _accessTokenLoading;
	  },
	  getAccessTokenError: function() {
	    return _accessTokenError;
	  },
	  getAccessToken: function() {
	    return _accessToken;
	  }
	});


/***/ },

/***/ 168:
/*!***************************************!*\
  !*** ./src/Stores/GithubStore.coffee ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var Github, GithubStore, Reflux, accessTokenStore, _github;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Github = __webpack_require__(/*! github-api */ 4);
	
	accessTokenStore = __webpack_require__(/*! ./AccessTokenStore.coffee */ 167);
	
	_github = null;
	
	module.exports = GithubStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(accessTokenStore, this._connectToGithubIfNecessary);
	  },
	  _connectToGithubIfNecessary: function() {
	    if (accessTokenStore.isLoggedIn() && (_github == null)) {
	      _github = new Github({
	        auth: 'oauth',
	        token: accessTokenStore.getAccessToken()
	      });
	      return this.trigger();
	    }
	  },
	  get: function() {
	    return _github;
	  }
	});


/***/ },

/***/ 169:
/*!******************************************!*\
  !*** ./src/Stores/UserReposStore.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var Reflux, UserReposStore, apiModule, userStore, _cachedReposForUsername, _repos, _reposLoading, _reposLoadingError;
	
	__webpack_require__(/*! es6-promise */ 7).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	userStore = __webpack_require__(/*! ./UserStore.coffee */ 166);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 225);
	
	_cachedReposForUsername = null;
	
	_repos = null;
	
	_reposLoading = false;
	
	_reposLoadingError = false;
	
	module.exports = UserReposStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(userStore, this.loadReposIfNecessary);
	  },
	  loadReposIfNecessary: function() {
	    var newUsername;
	    newUsername = userStore.get();
	    if (_cachedReposForUsername !== newUsername) {
	      _reposLoading = true;
	      _reposLoadingError = false;
	      _repos = null;
	      this.trigger();
	      return apiModule.getRepos().then(function(repos) {
	        _cachedReposForUsername = newUsername;
	        _repos = repos;
	        return _reposLoadingError = false;
	      })["catch"](function(err) {
	        console.error(err);
	        return _reposLoadingError = true;
	      }).then((function(_this) {
	        return function() {
	          _reposLoading = false;
	          return _this.trigger();
	        };
	      })(this));
	    }
	  },
	  getAll: function() {
	    return {
	      loading: _reposLoading,
	      error: _reposLoadingError,
	      repos: _repos
	    };
	  },
	  isLoading: function() {
	    return _reposLoading;
	  },
	  hasError: function() {
	    return _reposLoadingError;
	  },
	  getRepos: function() {
	    return _repos;
	  }
	});


/***/ },

/***/ 170:
/*!*************************************!*\
  !*** ./src/Stores/RepoStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, RepoStore, userStore, _selectedRepoName;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	userStore = __webpack_require__(/*! ./UserStore.coffee */ 166);
	
	_selectedRepoName = null;
	
	module.exports = RepoStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(Actions.selectRepo, this.selectRepo);
	    return this.listenTo(userStore, this.wipeRepoIfNecessary);
	  },
	  wipeRepoIfNecessary: function() {
	    if (userStore.get() === null) {
	      return this.selectRepo(null);
	    }
	  },
	  selectRepo: function(repoName) {
	    if (_selectedRepoName !== repoName) {
	      _selectedRepoName = repoName;
	      return this.trigger();
	    }
	  },
	  get: function() {
	    return _selectedRepoName;
	  }
	});


/***/ },

/***/ 171:
/*!*****************************************!*\
  !*** ./src/Stores/RepoTreeStore.coffee ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, RepoTreeStore, apiModule, repoStore, _cachedTreeForRepo, _tree, _treeLoading, _treeLoadingError;
	
	__webpack_require__(/*! es6-promise */ 7).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	repoStore = __webpack_require__(/*! ./RepoStore.coffee */ 170);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 225);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	_cachedTreeForRepo = null;
	
	_tree = null;
	
	_treeLoading = false;
	
	_treeLoadingError = false;
	
	module.exports = RepoTreeStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(repoStore, this.loadTreeIfNecessary);
	  },
	  loadTreeIfNecessary: function() {
	    var selectedRepoName;
	    selectedRepoName = repoStore.get();
	    if (_cachedTreeForRepo !== selectedRepoName) {
	      _tree = null;
	      _treeLoading = true;
	      _treeLoadingError = false;
	      this.trigger();
	      return apiModule.getGHPagesTree(selectedRepoName).then(function(tree) {
	        _cachedTreeForRepo = selectedRepoName;
	        return _tree = tree;
	      })["catch"](function(err) {
	        console.error(err);
	        return _treeLoadingError = true;
	      }).then((function(_this) {
	        return function() {
	          _treeLoading = false;
	          return _this.trigger();
	        };
	      })(this));
	    }
	  },
	  getAll: function() {
	    return {
	      loading: _treeLoading,
	      error: _treeLoadingError,
	      htmlFiles: this.getHTMLFiles()
	    };
	  },
	  isLoading: function() {
	    return _treeLoading;
	  },
	  hasError: function() {
	    return _treeLoadingError;
	  },
	  getHTMLFiles: function() {
	    return _tree != null ? _tree.filter(function(item) {
	      return /\.html$/.test(item.path);
	    }) : void 0;
	  }
	});
	
	RepoTreeStore.listen(function() {
	  var _ref;
	  if (((_ref = RepoTreeStore.getHTMLFiles()) != null ? _ref.length : void 0) === 1) {
	    return Actions.selectFile(RepoTreeStore.getHTMLFiles()[0].path);
	  }
	});


/***/ },

/***/ 172:
/*!*************************************!*\
  !*** ./src/Stores/FileStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileStore, Reflux, repoStore, _selectedFile;
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	repoStore = __webpack_require__(/*! ./RepoStore.coffee */ 170);
	
	_selectedFile = null;
	
	module.exports = FileStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(Actions.selectFile, this.selectFile);
	    return this.listenTo(repoStore, this.wipeFileIfNecessary);
	  },
	  wipeFileIfNecessary: function() {
	    if (repoStore.get() === null) {
	      return this.selectFile(null);
	    }
	  },
	  selectFile: function(filePath) {
	    if (_selectedFile !== filePath) {
	      _selectedFile = filePath;
	      return this.trigger();
	    }
	  },
	  get: function() {
	    return _selectedFile;
	  }
	});


/***/ },

/***/ 173:
/*!*********************************************!*\
  !*** ./src/Stores/FileContentsStore.coffee ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileContentsStore, Reflux, apiModule, fileStore, _cachedContentsForFile, _contents, _contentsLoading, _contentsLoadingError;
	
	__webpack_require__(/*! es6-promise */ 7).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 5);
	
	fileStore = __webpack_require__(/*! ./FileStore.coffee */ 172);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 225);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 23);
	
	_cachedContentsForFile = null;
	
	_contents = null;
	
	_contentsLoading = false;
	
	_contentsLoadingError = false;
	
	module.exports = FileContentsStore = Reflux.createStore({
	  init: function() {
	    this.listenTo(fileStore, this.loadFileIfNecessary);
	    return this.listenTo(Actions.saveFile, this.saveFile);
	  },
	  saveFile: function(_arg) {
	    var commitMessage, contents;
	    contents = _arg.contents, commitMessage = _arg.commitMessage;
	    return apiModule.writeFileContents({
	      contents: contents,
	      commitMessage: commitMessage
	    }).then(function() {
	      return console.log('writeFileContents succeeded');
	    });
	  },
	  loadFileIfNecessary: function() {
	    var selectedFileName;
	    selectedFileName = fileStore.get();
	    if (_cachedContentsForFile !== selectedFileName) {
	      _contents = null;
	      _contentsLoading = true;
	      _contentsLoadingError = false;
	      this.trigger();
	      return apiModule.getFileContents().then(function(contents) {
	        _cachedContentsForFile = selectedFileName;
	        return _contents = contents;
	      })["catch"](function(error) {
	        console.error(error);
	        return _contentsLoadingError = true;
	      }).then((function(_this) {
	        return function() {
	          _contentsLoading = false;
	          return _this.trigger();
	        };
	      })(this));
	    }
	  },
	  isLoading: function() {
	    return _contentsLoading;
	  },
	  hasError: function() {
	    return _contentsLoadingError;
	  },
	  getContents: function() {
	    return _contents;
	  }
	});


/***/ },

/***/ 223:
/*!*************************************!*\
  !*** ./src/Components/Loading.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/Loading.less */ 224);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 82)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/Loading.less", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/less-loader/index.js!/Users/danfox/ghupdate/src/Components/Loading.less");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 224:
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/Loading.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 154)();
	exports.push([module.id, ".ghu-spinner {\n  padding: 20px;\n  text-align: center;\n}\n.ghu-spinner .spinner {\n  display: inline-block;\n}\n.ghu-loading-error {\n  padding: 20px;\n  display: block;\n}\n", ""]);

/***/ },

/***/ 225:
/*!******************************!*\
  !*** ./src/ApiModule.coffee ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var ApiModule, fileStore, githubStore, repoStore, userStore, _promisify;
	
	__webpack_require__(/*! es6-promise */ 7).polyfill();
	
	__webpack_require__(/*! fetch */ 3);
	
	userStore = __webpack_require__(/*! ./Stores/UserStore.coffee */ 166);
	
	githubStore = __webpack_require__(/*! ./Stores/GithubStore.coffee */ 168);
	
	repoStore = __webpack_require__(/*! ./Stores/RepoStore.coffee */ 170);
	
	fileStore = __webpack_require__(/*! ./Stores/FileStore.coffee */ 172);
	
	_promisify = function(resolve, reject) {
	  return function(errorValue, successValue) {
	    if (errorValue) {
	      return reject(errorValue);
	    } else {
	      return resolve(successValue);
	    }
	  };
	};
	
	module.exports = ApiModule = {
	  writeFileContents: function(_arg) {
	    var commitMessage, contents, github, pathToFile, repo, username;
	    contents = _arg.contents, commitMessage = _arg.commitMessage;
	    pathToFile = fileStore.get();
	    username = userStore.get();
	    repo = repoStore.get();
	    github = githubStore.get();
	    if (github != null) {
	      return new Promise(function(resolve, reject) {
	        return github.getRepo(username, repo).write('gh-pages', pathToFile, contents, commitMessage, _promisify(resolve, reject));
	      });
	    } else {
	      return Promise.reject('Must authorize before trying to write file contents');
	    }
	  },
	  getFileContents: function() {
	    var github, pathToFile, repo, username;
	    pathToFile = fileStore.get();
	    username = userStore.get();
	    repo = repoStore.get();
	    github = githubStore.get();
	    if (github != null) {
	      return new Promise(function(resolve, reject) {
	        return github.getRepo(username, repo).read('gh-pages', pathToFile, _promisify(resolve, reject));
	      });
	    } else {
	      return Promise.reject('Must authorize before loading up a file contents');
	    }
	  },
	  getGHPagesTree: function(repo) {
	    var github, username;
	    username = userStore.get();
	    github = githubStore.get();
	    if (github != null) {
	      return new Promise(function(resolve, reject) {
	        return github.getRepo(username, repo).getTree('gh-pages', _promisify(resolve, reject));
	      });
	    } else {
	      return fetch("https://api.github.com/repos/" + username + "/" + repo + "/branches/gh-pages").then(function(response) {
	        return response.json();
	      }).then(function(branchObject) {
	        return fetch(branchObject.commit.commit.tree.url);
	      }).then(function(response) {
	        return response.json();
	      }).then(function(json) {
	        return json.tree;
	      });
	    }
	  },
	  getRepos: function() {
	    var github;
	    github = githubStore.get();
	    if (github != null) {
	      return new Promise(function(resolve, reject) {
	        return github.getUser().repos(_promisify(resolve, reject));
	      });
	    } else {
	      return fetch("https://api.github.com/users/" + (userStore.get()) + "/repos").then(function(response) {
	        return response.json();
	      });
	    }
	  }
	};


/***/ }

});
//# sourceMappingURL=bundle.js.map