webpackJsonp([1],[
/* 0 */
/*!*******************!*\
  !*** ./main.cjsx ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, App, React, Router;
	
	React = __webpack_require__(/*! react */ 1);
	
	App = __webpack_require__(/*! ./src/Components/App.cjsx */ 5);
	
	Actions = __webpack_require__(/*! ./src/Actions.coffee */ 3);
	
	Router = __webpack_require__(/*! ./src/Router.coffee */ 4);
	
	window.React = React;
	
	React.renderComponent(React.createElement(App, null), document.getElementsByTagName('body')[0]);
	
	Actions.readCodeFromUrl();
	
	Actions.readAccessTokenFromLocalStorage();
	
	Router.start();


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/*!****************************!*\
  !*** ./src/Actions.coffee ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	module.exports = Actions = Reflux.createActions(['setUsername', 'selectRepo', 'selectFile', 'readCodeFromUrl', 'readAccessTokenFromLocalStorage', 'saveFile']);


/***/ },
/* 4 */
/*!***************************!*\
  !*** ./src/Router.coffee ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, RefluxRouter, RouteBinding, Stores;
	
	Actions = __webpack_require__(/*! ./Actions.coffee */ 3);
	
	Stores = __webpack_require__(/*! ./Stores.coffee */ 6);
	
	RefluxRouter = __webpack_require__(/*! ./Router/RefluxRouter.coffee */ 33);
	
	RouteBinding = __webpack_require__(/*! ./Router/RouteBinding.coffee */ 34);
	
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
/* 5 */
/*!*********************************!*\
  !*** ./src/Components/App.cjsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, App, Editor, FileChooser, LogInButton, React, Reflux, RepoChooser, Stores, UsernameChooser;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 6);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	RepoChooser = __webpack_require__(/*! ./RepoChooser.cjsx */ 7);
	
	FileChooser = __webpack_require__(/*! ./FileChooser.cjsx */ 8);
	
	Editor = __webpack_require__(/*! ./Editor.cjsx */ 9);
	
	LogInButton = __webpack_require__(/*! ./LogInButton.cjsx */ 10);
	
	UsernameChooser = __webpack_require__(/*! ./UsernameChooser.cjsx */ 11);
	
	App = module.exports = React.createClass({
	  displayName: 'App',
	  mixins: [Reflux.ListenerMixin],
	  getInitialState: function() {
	    return {
	      username: null,
	      isLoggedIn: false,
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
	    __webpack_require__(/*! ./App.less */ 97);
	    return React.createElement(React.DOM.div, {
	      "className": "ghu-app"
	    }, React.createElement(React.DOM.h1, null, "GH Update"), (this.state.username == null ? React.createElement(UsernameChooser, null) : this.state.repoName == null ? React.createElement(React.DOM.div, null, React.createElement(React.DOM.h2, {
	      "className": 'ghu-username'
	    }, this.state.username), React.createElement(RepoChooser, {
	      "username": this.state.username
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
/* 6 */
/*!***************************!*\
  !*** ./src/Stores.coffee ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Stores;
	
	Actions = __webpack_require__(/*! ./Actions.coffee */ 3);
	
	module.exports = Stores = {
	  userStore: __webpack_require__(/*! ./Stores/UserStore.coffee */ 108),
	  accessTokenStore: __webpack_require__(/*! ./Stores/AccessTokenStore.coffee */ 109),
	  githubStore: __webpack_require__(/*! ./Stores/GithubStore.coffee */ 110),
	  userReposStore: __webpack_require__(/*! ./Stores/UserReposStore.coffee */ 111),
	  repoStore: __webpack_require__(/*! ./Stores/RepoStore.coffee */ 112),
	  repoTreeStore: __webpack_require__(/*! ./Stores/RepoTreeStore.coffee */ 113),
	  fileStore: __webpack_require__(/*! ./Stores/FileStore.coffee */ 114),
	  fileContentsStore: __webpack_require__(/*! ./Stores/FileContentsStore.coffee */ 115)
	};


/***/ },
/* 7 */
/*!*****************************************!*\
  !*** ./src/Components/RepoChooser.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Loading, React, Reflux, RepoChooser, RepoLink, RepoList, Stores, timeago;
	
	React = __webpack_require__(/*! react */ 1);
	
	timeago = __webpack_require__(/*! timeago */ 119);
	
	Loading = __webpack_require__(/*! ./Loading.cjsx */ 35);
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 6);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	module.exports = RepoChooser = React.createClass({
	  displayName: 'RepoChooser',
	  mixins: [Reflux.ListenerMixin],
	  propTypes: {
	    username: React.PropTypes.string.isRequired
	  },
	  componentWillMount: function() {
	    this.syncToStore();
	    return this.listenTo(Stores.userReposStore, this.syncToStore);
	  },
	  syncToStore: function() {
	    return this.setState({
	      loading: Stores.userReposStore.isLoading(),
	      error: Stores.userReposStore.hasError(),
	      repos: Stores.userReposStore.getRepos()
	    });
	  },
	  render: function() {
	    __webpack_require__(/*! ./RepoChooser.less */ 101);
	    return React.createElement(Loading, {
	      "loading": this.state.loading,
	      "error": this.state.error,
	      "errorMessage": 'Error loading repos, please try again'
	    }, React.createElement(RepoList, {
	      "repos": this.state.repos
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
/* 8 */
/*!*****************************************!*\
  !*** ./src/Components/FileChooser.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileChooser, React, Reflux, Stores, TreeFileView, TreeView;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 6);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	FileChooser = module.exports = React.createClass({
	  displayName: 'FileChooser',
	  mixins: [Reflux.ListenerMixin],
	  propTypes: {
	    htmlFiles: React.PropTypes.array,
	    loading: React.PropTypes.bool.isRequired,
	    error: React.PropTypes.bool.isRequired
	  },
	  componentWillMount: function() {
	    return __webpack_require__(/*! ./FileChooser.less */ 99);
	  },
	  render: function() {
	    var Loading;
	    Loading = __webpack_require__(/*! ./Loading.cjsx */ 35);
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
/* 9 */
/*!************************************!*\
  !*** ./src/Components/Editor.cjsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Editor, Loading, React, Reflux, fileContentsStore, fileStore, _ref;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	React = __webpack_require__(/*! react */ 1);
	
	Loading = __webpack_require__(/*! ./Loading.cjsx */ 35);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	_ref = __webpack_require__(/*! ../Stores.coffee */ 6), fileStore = _ref.fileStore, fileContentsStore = _ref.fileContentsStore;
	
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
	    __webpack_require__(/*! ./Editor.less */ 103);
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
/* 10 */
/*!*****************************************!*\
  !*** ./src/Components/LogInButton.cjsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var LogInButton, React, Reflux, Stores;
	
	React = __webpack_require__(/*! react */ 1);
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Stores = __webpack_require__(/*! ../Stores.coffee */ 6);
	
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
/* 11 */
/*!*********************************************!*\
  !*** ./src/Components/UsernameChooser.cjsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, React, UsernameChooser;
	
	React = __webpack_require__(/*! react */ 1);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	UsernameChooser = module.exports = React.createClass({
	  displayName: 'UsernameChooser',
	  selectUsername: function(e) {
	    e.preventDefault();
	    return Actions.setUsername(this.refs.username.state.value);
	  },
	  render: function() {
	    var LogInButton;
	    __webpack_require__(/*! ./UsernameChooser.less */ 105);
	    LogInButton = __webpack_require__(/*! ./LogInButton.cjsx */ 10);
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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
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
/* 34 */
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
/* 35 */
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
	    __webpack_require__(/*! ./Loading.less */ 117);
	    if (this.props.loading) {
	      Spinkit = __webpack_require__(/*! react-spinkit */ 189);
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
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */
/*!*********************************!*\
  !*** ./src/Components/App.less ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/App.less */ 98);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 98 */
/*!****************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/App.less ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, "body {\n  background: #eee;\n}\n.ghu-app {\n  background: #fcfcfc;\n  margin: 30px auto;\n  width: 40em;\n}\n.ghu-app h1 {\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: normal;\n  letter-spacing: 3px;\n  padding-top: 30px;\n  font-size: 14px;\n}\n.ghu-app h2.ghu-username a {\n  text-decoration: underline;\n  cursor: pointer;\n}\n.ghu-app h2.ghu-username a:hover {\n  color: blue;\n}\n.ghu-app h2.ghu-username a:active {\n  color: #0000e6;\n}\n", ""]);

/***/ },
/* 99 */
/*!*****************************************!*\
  !*** ./src/Components/FileChooser.less ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/FileChooser.less */ 100);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 100 */
/*!************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/FileChooser.less ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, "ul.ghu-file-chooser {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\nul.ghu-file-chooser li.file {\n  padding: 10px 30px;\n  border-top: 1px solid #eee;\n  cursor: pointer;\n}\nul.ghu-file-chooser li.file:hover {\n  background: #444;\n  color: white;\n}\n", ""]);

/***/ },
/* 101 */
/*!*****************************************!*\
  !*** ./src/Components/RepoChooser.less ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/RepoChooser.less */ 102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 102 */
/*!************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/RepoChooser.less ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, "h2.ghu-username {\n  text-align: center;\n  font-size: 200%;\n  margin: 0;\n}\nul.ghu-repo-list {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\nul.ghu-repo-list li.ghu-repo-link {\n  padding: 10px 30px;\n  border-top: 1px solid #eee;\n  cursor: pointer;\n}\nul.ghu-repo-list li.ghu-repo-link .ghu-last-updated {\n  display: block;\n  color: #aaa;\n}\nul.ghu-repo-list li.ghu-repo-link:hover {\n  background: #444;\n  color: white;\n}\n", ""]);

/***/ },
/* 103 */
/*!************************************!*\
  !*** ./src/Components/Editor.less ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/Editor.less */ 104);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 104 */
/*!*******************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/Editor.less ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".ghu-editor {\n  padding: 10px;\n}\n.ghu-editor textarea {\n  display: block;\n  height: 40em;\n  width: 100%;\n}\n.ghu-editor button {\n  display: block;\n  margin: 20px auto;\n  font-size: 130%;\n}\n", ""]);

/***/ },
/* 105 */
/*!*********************************************!*\
  !*** ./src/Components/UsernameChooser.less ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/UsernameChooser.less */ 106);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 106 */
/*!****************************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/UsernameChooser.less ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".ghu-username-chooser {\n  padding-bottom: 30px;\n  text-align: center;\n}\n.ghu-username-chooser input {\n  font-size: 200%;\n  margin: 0 auto;\n  display: block;\n}\n.ghu-username-chooser button {\n  font-size: 130%;\n}\n", ""]);

/***/ },
/* 107 */
/*!*******************************!*\
  !*** ./~/reflux/src/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	exports.ListenerMethods = __webpack_require__(/*! ./ListenerMethods */ 166);
	
	exports.PublisherMethods = __webpack_require__(/*! ./PublisherMethods */ 167);
	
	exports.createAction = __webpack_require__(/*! ./createAction */ 168);
	
	exports.createStore = __webpack_require__(/*! ./createStore */ 169);
	
	exports.connect = __webpack_require__(/*! ./connect */ 170);
	
	exports.ListenerMixin = __webpack_require__(/*! ./ListenerMixin */ 171);
	
	exports.listenTo = __webpack_require__(/*! ./listenTo */ 172);
	
	exports.listenToMany = __webpack_require__(/*! ./listenToMany */ 173);
	
	
	var maker = __webpack_require__(/*! ./joins */ 174).staticJoinCreator;
	
	exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility
	
	exports.joinLeading = maker("first");
	
	exports.joinStrict = maker("strict");
	
	exports.joinConcat = maker("all");
	
	
	/**
	 * Convenience function for creating a set of actions
	 *
	 * @param actionNames the names for the actions to be created
	 * @returns an object with actions of corresponding action names
	 */
	exports.createActions = function(actionNames) {
	    var i = 0, actions = {};
	    for (; i < actionNames.length; i++) {
	        actions[actionNames[i]] = exports.createAction();
	    }
	    return actions;
	};
	
	/**
	 * Sets the eventmitter that Reflux uses
	 */
	exports.setEventEmitter = function(ctx) {
	    var _ = __webpack_require__(/*! ./utils */ 175);
	    _.EventEmitter = ctx;
	};
	
	/**
	 * Sets the method used for deferring actions and stores
	 */
	exports.nextTick = function(nextTick) {
	    var _ = __webpack_require__(/*! ./utils */ 175);
	    _.nextTick = nextTick;
	};
	
	/**
	 * Provides the set of created actions and stores for introspection
	 */
	exports.__keep = __webpack_require__(/*! ./Keep */ 176);


/***/ },
/* 108 */
/*!*************************************!*\
  !*** ./src/Stores/UserStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, UserStore, _username;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
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
/* 109 */
/*!********************************************!*\
  !*** ./src/Stores/AccessTokenStore.coffee ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var AccessTokenStore, Actions, Reflux, _accessToken, _accessTokenError, _accessTokenLoading;
	
	__webpack_require__(/*! es6-promise */ 191).polyfill();
	
	__webpack_require__(/*! fetch */ 190);
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
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
/* 110 */
/*!***************************************!*\
  !*** ./src/Stores/GithubStore.coffee ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var Github, GithubStore, Reflux, accessTokenStore, _github;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Github = __webpack_require__(/*! github-api */ 188);
	
	accessTokenStore = __webpack_require__(/*! ./AccessTokenStore.coffee */ 109);
	
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
/* 111 */
/*!******************************************!*\
  !*** ./src/Stores/UserReposStore.coffee ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var Reflux, UserReposStore, apiModule, userStore, _cachedReposForUsername, _repos, _reposLoading, _reposLoadingError;
	
	__webpack_require__(/*! es6-promise */ 191).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	userStore = __webpack_require__(/*! ./UserStore.coffee */ 108);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 177);
	
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
/* 112 */
/*!*************************************!*\
  !*** ./src/Stores/RepoStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, RepoStore, _selectedRepoName;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	_selectedRepoName = null;
	
	module.exports = RepoStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(Actions.selectRepo, this.selectRepo);
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
/* 113 */
/*!*****************************************!*\
  !*** ./src/Stores/RepoTreeStore.coffee ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, Reflux, RepoTreeStore, apiModule, repoStore, _cachedTreeForRepo, _tree, _treeLoading, _treeLoadingError;
	
	__webpack_require__(/*! es6-promise */ 191).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	repoStore = __webpack_require__(/*! ./RepoStore.coffee */ 112);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 177);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
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
/* 114 */
/*!*************************************!*\
  !*** ./src/Stores/FileStore.coffee ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileStore, Reflux, _selectedFile;
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
	_selectedFile = null;
	
	module.exports = FileStore = Reflux.createStore({
	  init: function() {
	    return this.listenTo(Actions.selectFile, this.selectFile);
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
/* 115 */
/*!*********************************************!*\
  !*** ./src/Stores/FileContentsStore.coffee ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Actions, FileContentsStore, Reflux, apiModule, fileStore, _cachedContentsForFile, _contents, _contentsLoading, _contentsLoadingError;
	
	__webpack_require__(/*! es6-promise */ 191).polyfill();
	
	Reflux = __webpack_require__(/*! reflux */ 107);
	
	fileStore = __webpack_require__(/*! ./FileStore.coffee */ 114);
	
	apiModule = __webpack_require__(/*! ../ApiModule.coffee */ 177);
	
	Actions = __webpack_require__(/*! ../Actions.coffee */ 3);
	
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
/* 116 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:stylesheet/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 117 */
/*!*************************************!*\
  !*** ./src/Components/Loading.less ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/less-loader!./src/Components/Loading.less */ 118);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
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
/* 118 */
/*!********************************************************************!*\
  !*** ./~/css-loader!./~/less-loader!./src/Components/Loading.less ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".ghu-spinner {\n  padding: 20px;\n  text-align: center;\n}\n.ghu-spinner .spinner {\n  display: inline-block;\n}\n.ghu-loading-error {\n  padding: 20px;\n  display: block;\n}\n", ""]);

/***/ },
/* 119 */
/*!******************************!*\
  !*** ./~/timeago/timeago.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/*
	 * node-timeago
	 * Cam Pedersen
	 * <diffference@gmail.com>
	 * Oct 6, 2011
	 * Timeago is a jQuery plugin that makes it easy to support automatically
	 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
	 *
	 * @name timeago
	 * @version 0.10.0
	 * @requires jQuery v1.2.3+
	 * @author Ryan McGeary
	 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
	 *
	 * For usage and examples, visit:
	 * http://timeago.yarp.com/
	 *
	 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
	 */
	module.exports = function (timestamp) {
	  if (timestamp instanceof Date) {
	    return inWords(timestamp);
	  } else if (typeof timestamp === "string") {
	    return inWords(parse(timestamp));
	  } else if (typeof timestamp === "number") {
	    return inWords(new Date(timestamp))
	  }
	};
	
	var settings = {
	  allowFuture: false,
	  strings: {
	    prefixAgo: null,
	    prefixFromNow: null,
	    suffixAgo: "ago",
	    suffixFromNow: "from now",
	    seconds: "less than a minute",
	    minute: "about a minute",
	    minutes: "%d minutes",
	    hour: "about an hour",
	    hours: "about %d hours",
	    day: "a day",
	    days: "%d days",
	    month: "about a month",
	    months: "%d months",
	    year: "about a year",
	    years: "%d years",
	    numbers: []
	  }
	};
	
	var $l = settings.strings;
	
	module.exports.settings = settings;
	
	$l.inWords = function (distanceMillis) {
	  var prefix = $l.prefixAgo;
	  var suffix = $l.suffixAgo;
	  if (settings.allowFuture) {
	    if (distanceMillis < 0) {
	      prefix = $l.prefixFromNow;
	      suffix = $l.suffixFromNow;
	    }
	  }
	
	  var seconds = Math.abs(distanceMillis) / 1000;
	  var minutes = seconds / 60;
	  var hours = minutes / 60;
	  var days = hours / 24;
	  var years = days / 365;
	
	  function substitute (stringOrFunction, number) {
	    var string = typeof stringOrFunction === 'function' ? stringOrFunction(number, distanceMillis) : stringOrFunction;
	    var value = ($l.numbers && $l.numbers[number]) || number;
	    return string.replace(/%d/i, value);
	  }
	
	  var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
	    seconds < 90 && substitute($l.minute, 1) ||
	    minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
	    minutes < 90 && substitute($l.hour, 1) ||
	    hours < 24 && substitute($l.hours, Math.round(hours)) ||
	    hours < 48 && substitute($l.day, 1) ||
	    days < 30 && substitute($l.days, Math.floor(days)) ||
	    days < 60 && substitute($l.month, 1) ||
	    days < 365 && substitute($l.months, Math.floor(days / 30)) ||
	    years < 2 && substitute($l.year, 1) ||
	    substitute($l.years, Math.floor(years));
	
	  return [prefix, words, suffix].join(" ").toString().trim();
	};
	
	function parse (iso8601) {
	  if (!iso8601) return;
	  var s = iso8601.trim();
	  s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
	  s = s.replace(/-/,"/").replace(/-/,"/");
	  s = s.replace(/T/," ").replace(/Z/," UTC");
	  s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
	  return new Date(s);
	}
	
	$l.parse = parse;
	
	function inWords (date) {
	  return $l.inWords(distance(date));
	}
	
	function distance (date) {
	  return (new Date().getTime() - date.getTime());
	}


/***/ },
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
/*!*************************************!*\
  !*** ./~/css-loader/cssToString.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 165 */,
/* 166 */
/*!*****************************************!*\
  !*** ./~/reflux/src/ListenerMethods.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! ./utils */ 175),
	    maker = __webpack_require__(/*! ./joins */ 174).instanceJoinCreator;
	
	/**
	 * A module of methods related to listening.
	 */
	module.exports = {
	
	    /**
	     * An internal utility function used by `validateListening`
	     *
	     * @param {Action|Store} listenable The listenable we want to search for
	     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
	     */
	    hasListener: function(listenable) {
	        var i = 0,
	            listener;
	        for (;i < (this.subscriptions||[]).length; ++i) {
	            listener = this.subscriptions[i].listenable;
	            if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
	                return true;
	            }
	        }
	        return false;
	    },
	
	    /**
	     * A convenience method that listens to all listenables in the given object.
	     *
	     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
	     */
	    listenToMany: function(listenables){
	        for(var key in listenables){
	            var cbname = _.callbackName(key),
	                localname = this[cbname] ? cbname : this[key] ? key : undefined;
	            if (localname){
	                this.listenTo(listenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
	            }
	        }
	    },
	
	    /**
	     * Checks if the current context can listen to the supplied listenable
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @returns {String|Undefined} An error message, or undefined if there was no problem.
	     */
	    validateListening: function(listenable){
	        if (listenable === this) {
	            return "Listener is not able to listen to itself";
	        }
	        if (!_.isFunction(listenable.listen)) {
	            return listenable + " is missing a listen method";
	        }
	        if (listenable.hasListener && listenable.hasListener(this)) {
	            return "Listener cannot listen to this listenable because of circular loop";
	        }
	    },
	
	    /**
	     * Sets up a subscription to the given listenable for the context object
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @param {Function|String} callback The callback to register as event handler
	     * @param {Function|String} defaultCallback The callback to register as default handler
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
	     */
	    listenTo: function(listenable, callback, defaultCallback) {
	        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
	        _.throwIf(this.validateListening(listenable));
	        this.fetchDefaultData(listenable, defaultCallback);
	        desub = listenable.listen(this[callback]||callback, this);
	        unsubscriber = function() {
	            var index = subs.indexOf(subscriptionobj);
	            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
	            subs.splice(index, 1);
	            desub();
	        };
	        subscriptionobj = {
	            stop: unsubscriber,
	            listenable: listenable
	        };
	        subs.push(subscriptionobj);
	        return subscriptionobj;
	    },
	
	    /**
	     * Stops listening to a single listenable
	     *
	     * @param {Action|Store} listenable The action or store we no longer want to listen to
	     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
	     */
	    stopListeningTo: function(listenable){
	        var sub, i = 0, subs = this.subscriptions || [];
	        for(;i < subs.length; i++){
	            sub = subs[i];
	            if (sub.listenable === listenable){
	                sub.stop();
	                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
	                return true;
	            }
	        }
	        return false;
	    },
	
	    /**
	     * Stops all subscriptions and empties subscriptions array
	     */
	    stopListeningToAll: function(){
	        var remaining, subs = this.subscriptions || [];
	        while((remaining=subs.length)){
	            subs[0].stop();
	            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
	        }
	    },
	
	    /**
	     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getDefaultData` method.
	     * @param {Action|Store} listenable The publisher we want to get default data from
	     * @param {Function|String} defaultCallback The method to receive the data
	     */
	    fetchDefaultData: function (listenable, defaultCallback) {
	        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
	        var me = this;
	        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getDefaultData)) {
	            data = listenable.getDefaultData();
	            if (data && _.isFunction(data.then)) {
	                data.then(function() {
	                    defaultCallback.apply(me, arguments);
	                });
	            } else {
	                defaultCallback.call(this, data);
	            }
	        }
	    },
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the last emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     */
	    joinTrailing: maker("last"),
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the first emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     */
	    joinLeading: maker("first"),
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with all emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     */
	    joinConcat: maker("all"),
	
	    /**
	     * The callback will be called once all listenables have triggered.
	     * If a callback triggers twice before that happens, an error is thrown.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     */
	    joinStrict: maker("strict"),
	};
	


/***/ },
/* 167 */
/*!******************************************!*\
  !*** ./~/reflux/src/PublisherMethods.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! ./utils */ 175);
	
	/**
	 * A module of methods for object that you want to be able to listen to.
	 * This module is consumed by `createStore` and `createAction`
	 */
	module.exports = {
	
	    /**
	     * Hook used by the publisher that is invoked before emitting
	     * and before `shouldEmit`. The arguments are the ones that the action
	     * is invoked with. If this function returns something other than
	     * undefined, that will be passed on as arguments for shouldEmit and
	     * emission.
	     */
	    preEmit: function() {},
	
	    /**
	     * Hook used by the publisher after `preEmit` to determine if the
	     * event should be emitted with given arguments. This may be overridden
	     * in your application, default implementation always returns true.
	     *
	     * @returns {Boolean} true if event should be emitted
	     */
	    shouldEmit: function() { return true; },
	
	    /**
	     * Subscribes the given callback for action triggered
	     *
	     * @param {Function} callback The callback to register as event handler
	     * @param {Mixed} [optional] bindContext The context to bind the callback with
	     * @returns {Function} Callback that unsubscribes the registered event handler
	     */
	    listen: function(callback, bindContext) {
	        var eventHandler = function(args) {
	            callback.apply(bindContext, args);
	        }, me = this;
	        this.emitter.addListener(this.eventLabel, eventHandler);
	        return function() {
	            me.emitter.removeListener(me.eventLabel, eventHandler);
	        };
	    },
	
	    /**
	     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
	     */
	    trigger: function() {
	        var args = arguments,
	            pre = this.preEmit.apply(this, args);
	        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
	        if (this.shouldEmit.apply(this, args)) {
	            this.emitter.emit(this.eventLabel, args);
	        }
	    },
	
	    /**
	     * Tries to publish the event on the next tick
	     */
	    triggerAsync: function(){
	        var args = arguments,me = this;
	        _.nextTick(function() {
	            me.trigger.apply(me, args);
	        });
	    }
	};


/***/ },
/* 168 */
/*!**************************************!*\
  !*** ./~/reflux/src/createAction.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! ./utils */ 175),
	    Reflux = __webpack_require__(/*! ../src */ 107),
	    Keep = __webpack_require__(/*! ./Keep */ 176),
	    allowed = {preEmit:1,shouldEmit:1};
	
	/**
	 * Creates an action functor object. It is mixed in with functions
	 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
	 * be overridden in the definition object.
	 *
	 * @param {Object} definition The action object definition
	 */
	module.exports = function(definition) {
	
	    definition = definition || {};
	
	    for(var d in definition){
	        if (!allowed[d] && Reflux.PublisherMethods[d]) {
	            throw new Error("Cannot override API method " + d +
	                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
	            );
	        }
	    }
	
	    var context = _.extend({
	        eventLabel: "action",
	        emitter: new _.EventEmitter(),
	        _isAction: true
	    },Reflux.PublisherMethods,definition);
	
	    var functor = function() {
	        functor[functor.sync?"trigger":"triggerAsync"].apply(functor, arguments);
	    };
	
	    _.extend(functor,context);
	
	    Keep.createdActions.push(functor);
	
	    return functor;
	
	};


/***/ },
/* 169 */
/*!*************************************!*\
  !*** ./~/reflux/src/createStore.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! ./utils */ 175),
	    Reflux = __webpack_require__(/*! ../src */ 107),
	    Keep = __webpack_require__(/*! ./Keep */ 176),
	    allowed = {preEmit:1,shouldEmit:1};
	
	/**
	 * Creates an event emitting Data Store. It is mixed in with functions
	 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
	 * and `shouldEmit` may be overridden in the definition object.
	 *
	 * @param {Object} definition The data store object definition
	 * @returns {Store} A data store instance
	 */
	module.exports = function(definition) {
	
	    definition = definition || {};
	
	    for(var d in definition){
	        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
	            throw new Error("Cannot override API method " + d + 
	                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
	            );
	        }
	    }
	
	    function Store() {
	        var i=0, arr;
	        this.subscriptions = [];
	        this.emitter = new _.EventEmitter();
	        this.eventLabel = "change";
	        if (this.init && _.isFunction(this.init)) {
	            this.init();
	        }
	        if (this.listenables){
	            arr = [].concat(this.listenables);
	            for(;i < arr.length;i++){
	                this.listenToMany(arr[i]);
	            }
	        }
	    }
	
	    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, definition);
	
	    var store = new Store();
	    Keep.createdStores.push(store);
	
	    return store;
	};


/***/ },
/* 170 */
/*!*********************************!*\
  !*** ./~/reflux/src/connect.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(/*! ../src */ 107),
	    _ = __webpack_require__(/*! ./utils */ 175);
	
	module.exports = function(listenable,key){
	    return {
	        componentDidMount: function(){
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            var me = this, cb = (key === undefined ? this.setState : function(v){me.setState(_.object([key],[v]));});
	            this.listenTo(listenable,cb,cb);
	        },
	        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
	    };
	};


/***/ },
/* 171 */
/*!***************************************!*\
  !*** ./~/reflux/src/ListenerMixin.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! ./utils */ 175),
	    ListenerMethods = __webpack_require__(/*! ./ListenerMethods */ 166);
	
	/**
	 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
	 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
	 */
	module.exports = _.extend({
	
	    /**
	     * Cleans up all listener previously registered.
	     */
	    componentWillUnmount: ListenerMethods.stopListeningToAll
	
	}, ListenerMethods);


/***/ },
/* 172 */
/*!**********************************!*\
  !*** ./~/reflux/src/listenTo.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(/*! ../src */ 107);
	
	
	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method.
	 *
	 * @param {Action|Store} listenable An Action or Store that should be
	 *  listened to.
	 * @param {Function|String} callback The callback to register as event handler
	 * @param {Function|String} defaultCallback The callback to register as default handler
	 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
	 */
	module.exports = function(listenable,callback,initial){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenTo(listenable,callback,initial);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },
/* 173 */
/*!**************************************!*\
  !*** ./~/reflux/src/listenToMany.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(/*! ../src */ 107);
	
	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method. This version is used
	 * to automatically set up a `listenToMany` call.
	 *
	 * @param {Object} listenables An object of listenables
	 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
	 */
	module.exports = function(listenables){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenToMany(listenables);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },
/* 174 */
/*!*******************************!*\
  !*** ./~/reflux/src/joins.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Internal module used to create static and instance join methods
	 */
	
	var slice = Array.prototype.slice,
	    createStore = __webpack_require__(/*! ./createStore */ 169),
	    strategyMethodNames = {
	        strict: "joinStrict",
	        first: "joinLeading",
	        last: "joinTrailing",
	        all: "joinConcat"
	    };
	
	/**
	 * Used in `index.js` to create the static join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
	 */
	exports.staticJoinCreator = function(strategy){
	    return function(/* listenables... */) {
	        var listenables = slice.call(arguments);
	        return createStore({
	            init: function(){
	                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
	            }
	        });
	    };
	};
	
	/**
	 * Used in `ListenerMethods.js` to create the instance join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
	 */
	exports.instanceJoinCreator = function(strategy){
	    return function(/* listenables..., callback*/){
	        var listenables = slice.call(arguments),
	            callback = listenables.pop(),
	            numberOfListenables = listenables.length,
	            join = {
	                numberOfListenables: numberOfListenables,
	                callback: this[callback]||callback,
	                listener: this,
	                strategy: strategy
	            };
	        for (var i = 0; i < numberOfListenables; i++) {
	            this.listenTo(listenables[i],newListener(i,join));
	        }
	        reset(join);
	    };
	};
	
	// ---- internal join functions ----
	
	function reset(join) {
	    join.listenablesEmitted = new Array(join.numberOfListenables);
	    join.args = new Array(join.numberOfListenables);
	}
	
	function newListener(i,join) {
	    return function() {
	        var callargs = slice.call(arguments);
	        if (join.listenablesEmitted[i]){
	            switch(join.strategy){
	                case "strict": throw new Error("Strict join failed because listener triggered twice.");
	                case "last": join.args[i] = callargs; break;
	                case "all": join.args[i].push(callargs);
	            }
	        } else {
	            join.listenablesEmitted[i] = true;
	            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
	        }
	        emitIfAllListenablesEmitted(join);
	    };
	}
	
	function emitIfAllListenablesEmitted(join) {
	    for (var i = 0; i < join.numberOfListenables; i++) {
	        if (!join.listenablesEmitted[i]) {
	            return;
	        }
	    }
	    join.callback.apply(join.listener,join.args);
	    reset(join);
	}


/***/ },
/* 175 */
/*!*******************************!*\
  !*** ./~/reflux/src/utils.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/*
	 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
	 * order to remove the dependency
	 */
	var isObject = exports.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};
	
	exports.extend = function(obj) {
	    if (!isObject(obj)) {
	        return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	        source = arguments[i];
	        for (prop in source) {
	            obj[prop] = source[prop];
	        }
	    }
	    return obj;
	};
	
	exports.isFunction = function(value) {
	    return typeof value === 'function';
	};
	
	exports.EventEmitter = __webpack_require__(/*! eventemitter3 */ 195);
	
	exports.nextTick = function(callback) {
	    setTimeout(callback, 0);
	};
	
	exports.callbackName = function(string){
	    return "on"+string.charAt(0).toUpperCase()+string.slice(1);
	};
	
	exports.object = function(keys,vals){
	    var o={}, i=0;
	    for(;i<keys.length;i++){
	        o[keys[i]] = vals[i];
	    }
	    return o;
	};
	
	exports.isArguments = function(value) {
	    return value && typeof value == 'object' && typeof value.length == 'number' &&
	      (toString.call(value) === '[object Arguments]' || (hasOwnProperty.call(value, 'callee' && !propertyIsEnumerable.call(value, 'callee')))) || false;
	};
	
	exports.throwIf = function(val,msg){
	    if (val){
	        throw Error(msg||val);
	    }
	};


/***/ },
/* 176 */
/*!******************************!*\
  !*** ./~/reflux/src/Keep.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	exports.createdStores = [];
	
	exports.createdActions = [];
	
	exports.reset = function() {
	    while(exports.createdStores.length) {
	        exports.createdStores.pop();
	    }
	    while(exports.createdActions.length) {
	        exports.createdActions.pop();
	    }
	};


/***/ },
/* 177 */
/*!******************************!*\
  !*** ./src/ApiModule.coffee ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var ApiModule, fileStore, githubStore, repoStore, userStore, _promisify;
	
	__webpack_require__(/*! es6-promise */ 191).polyfill();
	
	__webpack_require__(/*! fetch */ 190);
	
	userStore = __webpack_require__(/*! ./Stores/UserStore.coffee */ 108);
	
	githubStore = __webpack_require__(/*! ./Stores/GithubStore.coffee */ 110);
	
	repoStore = __webpack_require__(/*! ./Stores/RepoStore.coffee */ 112);
	
	fileStore = __webpack_require__(/*! ./Stores/FileStore.coffee */ 114);
	
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


/***/ },
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */
/*!********************************!*\
  !*** ./~/github-api/github.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	// Github.js 0.9.0
	// (c) 2013 Michael Aufreiter, Development Seed
	// Github.js is freely distributable under the MIT license.
	// For all details and documentation:
	// http://substance.io/michael/github
	
	(function() {
	
	  // Initial Setup
	  // -------------
	
	  var XMLHttpRequest, Base64, _;
	  if (true) {
	      XMLHttpRequest = __webpack_require__(/*! xmlhttprequest */ 194).XMLHttpRequest;
	      _ = __webpack_require__(/*! underscore */ 227);
	      Base64 = __webpack_require__(/*! ./lib/base64.js */ 197);
	  }else{
	      _ = window._;
	      Base64 = window.Base64;
	  }
	  //prefer native XMLHttpRequest always
	  if (typeof window !== 'undefined' && typeof window.XMLHttpRequest !== 'undefined'){
	      XMLHttpRequest = window.XMLHttpRequest;
	  }
	
	
	  var API_URL = 'https://api.github.com';
	
	  var Github = function(options) {
	
	    // HTTP Request Abstraction
	    // =======
	    //
	    // I'm not proud of this and neither should you be if you were responsible for the XMLHttpRequest spec.
	
	    function _request(method, path, data, cb, raw, sync) {
	      function getURL() {
	        var url = path.indexOf('//') >= 0 ? path : API_URL + path;
	        return url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
	      }
	
	      var xhr = new XMLHttpRequest();
	      if (!raw) {xhr.dataType = "json";}
	
	      xhr.open(method, getURL(), !sync);
	      if (!sync) {
	        xhr.onreadystatechange = function () {
	          if (this.readyState == 4) {
	            if (this.status >= 200 && this.status < 300 || this.status === 304) {
	              cb(null, raw ? this.responseText : this.responseText ? JSON.parse(this.responseText) : true, this);
	            } else {
	              cb({path: path, request: this, error: this.status});
	            }
	          }
	        }
	      };
	      xhr.setRequestHeader('Accept','application/vnd.github.v3.raw+json');
	      xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
	      if ((options.token) || (options.username && options.password)) {
	           xhr.setRequestHeader('Authorization', options.token
	             ? 'token '+ options.token
	             : 'Basic ' + Base64.encode(options.username + ':' + options.password)
	           );
	         }
	      data ? xhr.send(JSON.stringify(data)) : xhr.send();
	      if (sync) return xhr.response;
	    }
	
	    function _requestAllPages(path, cb) {
	      var results = [];
	      (function iterate() {
	        _request("GET", path, null, function(err, res, xhr) {
	          if (err) {
	            return cb(err);
	          }
	
	          results.push.apply(results, res);
	
	          var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g),
	              next = _.find(links, function(link) { return /rel="next"/.test(link); });
	
	          if (next) {
	            next = (/<(.*)>/.exec(next) || [])[1];
	          }
	
	          if (!next) {
	            cb(err, results);
	          } else {
	            path = next;
	            iterate();
	          }
	        });
	      })();
	    }
	
	
	
	    // User API
	    // =======
	
	    Github.User = function() {
	      this.repos = function(cb) {
	        // Github does not always honor the 1000 limit so we want to iterate over the data set.
	        _requestAllPages("/user/repos?type=all&per_page=1000&sort=updated", function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // List user organizations
	      // -------
	
	      this.orgs = function(cb) {
	        _request("GET", "/user/orgs", null, function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // List authenticated user's gists
	      // -------
	
	      this.gists = function(cb) {
	        _request("GET", "/gists", null, function(err, res) {
	          cb(err,res);
	        });
	      };
	
	      // List authenticated user's unread notifications
	      // -------
	
	      this.notifications = function(cb) {
	        _request("GET", "/notifications", null, function(err, res) {
	          cb(err,res);
	        });
	      };
	
	      // Show user information
	      // -------
	
	      this.show = function(username, cb) {
	        var command = username ? "/users/"+username : "/user";
	
	        _request("GET", command, null, function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // List user repositories
	      // -------
	
	      this.userRepos = function(username, cb) {
	        // Github does not always honor the 1000 limit so we want to iterate over the data set.
	        _requestAllPages("/users/"+username+"/repos?type=all&per_page=1000&sort=updated", function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // List a user's gists
	      // -------
	
	      this.userGists = function(username, cb) {
	        _request("GET", "/users/"+username+"/gists", null, function(err, res) {
	          cb(err,res);
	        });
	      };
	
	      // List organization repositories
	      // -------
	
	      this.orgRepos = function(orgname, cb) {
	        // Github does not always honor the 1000 limit so we want to iterate over the data set.
	        _requestAllPages("/orgs/"+orgname+"/repos?type=all&&page_num=1000&sort=updated&direction=desc", function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // Follow user
	      // -------
	
	      this.follow = function(username, cb) {
	        _request("PUT", "/user/following/"+username, null, function(err, res) {
	          cb(err, res);
	        });
	      };
	
	      // Unfollow user
	      // -------
	
	      this.unfollow = function(username, cb) {
	        _request("DELETE", "/user/following/"+username, null, function(err, res) {
	          cb(err, res);
	        });
	      };
	    };
	
	
	    // Repository API
	    // =======
	
	    Github.Repository = function(options) {
	      var repo = options.name;
	      var user = options.user;
	
	      var that = this;
	      var repoPath = "/repos/" + user + "/" + repo;
	
	      var currentTree = {
	        "branch": null,
	        "sha": null
	      };
	
	      // Uses the cache if branch has not been changed
	      // -------
	
	      function updateTree(branch, cb) {
	        if (branch === currentTree.branch && currentTree.sha) return cb(null, currentTree.sha);
	        that.getRef("heads/"+branch, function(err, sha) {
	          currentTree.branch = branch;
	          currentTree.sha = sha;
	          cb(err, sha);
	        });
	      }
	
	      // Get a particular reference
	      // -------
	
	      this.getRef = function(ref, cb) {
	        _request("GET", repoPath + "/git/refs/" + ref, null, function(err, res) {
	          if (err) return cb(err);
	          cb(null, res.object.sha);
	        });
	      };
	
	      // Create a new reference
	      // --------
	      //
	      // {
	      //   "ref": "refs/heads/my-new-branch-name",
	      //   "sha": "827efc6d56897b048c772eb4087f854f46256132"
	      // }
	
	      this.createRef = function(options, cb) {
	        _request("POST", repoPath + "/git/refs", options, cb);
	      };
	
	      // Delete a reference
	      // --------
	      //
	      // repo.deleteRef('heads/gh-pages')
	      // repo.deleteRef('tags/v1.0')
	
	      this.deleteRef = function(ref, cb) {
	        _request("DELETE", repoPath + "/git/refs/"+ref, options, cb);
	      };
	
	      // Create a repo  
	      // -------
	
	      this.createRepo = function(options, cb) {
	        _request("POST", "/user/repos", options, cb);
	      };
	
	      // Delete a repo  
	      // --------  
	
	      this.deleteRepo = function(cb) {  
	        _request("DELETE", repoPath, options, cb);  
	      };
	
	      // List all tags of a repository
	      // -------
	
	      this.listTags = function(cb) {
	        _request("GET", repoPath + "/tags", null, function(err, tags) {
	          if (err) return cb(err);
	          cb(null, tags);
	        });
	      };
	
	      // List all pull requests of a respository
	      // -------
	
	      this.listPulls = function(state, cb) {
	        _request("GET", repoPath + "/pulls" + (state ? '?state=' + state : ''), null, function(err, pulls) {
	          if (err) return cb(err);
	          cb(null, pulls);
	        });
	      };
	
	      // Gets details for a specific pull request
	      // -------
	
	      this.getPull = function(number, cb) {
	        _request("GET", repoPath + "/pulls/" + number, null, function(err, pull) {
	          if (err) return cb(err);
	          cb(null, pull);
	        });
	      };
	
	      // Retrieve the changes made between base and head
	      // -------
	
	      this.compare = function(base, head, cb) {
	        _request("GET", repoPath + "/compare/" + base + "..." + head, null, function(err, diff) {
	          if (err) return cb(err);
	          cb(null, diff);
	        });
	      };
	
	      // List all branches of a repository
	      // -------
	
	      this.listBranches = function(cb) {
	        _request("GET", repoPath + "/git/refs/heads", null, function(err, heads) {
	          if (err) return cb(err);
	          cb(null, _.map(heads, function(head) { return _.last(head.ref.split('/')); }));
	        });
	      };
	
	      // Retrieve the contents of a blob
	      // -------
	
	      this.getBlob = function(sha, cb) {
	        _request("GET", repoPath + "/git/blobs/" + sha, null, cb, 'raw');
	      };
	
	      // For a given file path, get the corresponding sha (blob for files, tree for dirs)
	      // -------
	
	      this.getSha = function(branch, path, cb) {
	        // Just use head if path is empty
	        if (path === "") return that.getRef("heads/"+branch, cb);
	        that.getTree(branch+"?recursive=true", function(err, tree) {
	          if (err) return cb(err);
	          var file = _.select(tree, function(file) {
	            return file.path === path;
	          })[0];
	          cb(null, file ? file.sha : null);
	        });
	      };
	
	      // Retrieve the tree a commit points to
	      // -------
	
	      this.getTree = function(tree, cb) {
	        _request("GET", repoPath + "/git/trees/"+tree, null, function(err, res) {
	          if (err) return cb(err);
	          cb(null, res.tree);
	        });
	      };
	
	      // Post a new blob object, getting a blob SHA back
	      // -------
	
	      this.postBlob = function(content, cb) {
	        if (typeof(content) === "string") {
	          content = {
	            "content": content,
	            "encoding": "utf-8"
	          };
	        } else {
	          	content = {
	              "content": btoa(String.fromCharCode.apply(null, new Uint8Array(content))),
	              "encoding": "base64"
	            };
	          }
	
	        _request("POST", repoPath + "/git/blobs", content, function(err, res) {
	          if (err) return cb(err);
	          cb(null, res.sha);
	        });
	      };
	
	      // Update an existing tree adding a new blob object getting a tree SHA back
	      // -------
	
	      this.updateTree = function(baseTree, path, blob, cb) {
	        var data = {
	          "base_tree": baseTree,
	          "tree": [
	            {
	              "path": path,
	              "mode": "100644",
	              "type": "blob",
	              "sha": blob
	            }
	          ]
	        };
	        _request("POST", repoPath + "/git/trees", data, function(err, res) {
	          if (err) return cb(err);
	          cb(null, res.sha);
	        });
	      };
	
	      // Post a new tree object having a file path pointer replaced
	      // with a new blob SHA getting a tree SHA back
	      // -------
	
	      this.postTree = function(tree, cb) {
	        _request("POST", repoPath + "/git/trees", { "tree": tree }, function(err, res) {
	          if (err) return cb(err);
	          cb(null, res.sha);
	        });
	      };
	
	      // Create a new commit object with the current commit SHA as the parent
	      // and the new tree SHA, getting a commit SHA back
	      // -------
	
	      this.commit = function(parent, tree, message, cb) {
	        var data = {
	          "message": message,
	          "parents": [
	            parent
	          ],
	          "tree": tree
	        };
	        if(options.username) {
	          data.author = {
	            "name": options.username
	          };
	        }
	
	        _request("POST", repoPath + "/git/commits", data, function(err, res) {
	          currentTree.sha = res.sha; // update latest commit
	          if (err) return cb(err);
	          cb(null, res.sha);
	        });
	      };
	
	      // Update the reference of your head to point to the new commit SHA
	      // -------
	
	      this.updateHead = function(head, commit, cb) {
	        _request("PATCH", repoPath + "/git/refs/heads/" + head, { "sha": commit }, function(err, res) {
	          cb(err);
	        });
	      };
	
	      // Show repository information
	      // -------
	
	      this.show = function(cb) {
	        _request("GET", repoPath, null, cb);
	      };
	
	      // Get contents
	      // --------
	
	      this.contents = function(branch, path, cb, sync) {
	        return _request("GET", repoPath + "/contents?ref=" + branch + (path ? "&path=" + path : ""), null, cb, 'raw', sync);
	      };
	
	      // Fork repository
	      // -------
	
	      this.fork = function(cb) {
	        _request("POST", repoPath + "/forks", null, cb);
	      };
	
	      // Branch repository  
	      // --------  
	 
	      this.branch = function(oldBranch,newBranch,cb) {
	        if(arguments.length === 2 && typeof arguments[1] === "function") {
	          cb = newBranch;
	          newBranch = oldBranch;
	          oldBranch = "master";
	        }
	        this.getRef("heads/" + oldBranch, function(err,ref) {
	          if(err && cb) return cb(err);
	          that.createRef({
	            ref: "refs/heads/" + newBranch,
	            sha: ref
	          },cb);
	        });
	      }
	
	      // Create pull request
	      // --------
	
	      this.createPullRequest = function(options, cb) {
	        _request("POST", repoPath + "/pulls", options, cb);
	      };
	
	      // List hooks
	      // --------
	
	      this.listHooks = function(cb) {
	        _request("GET", repoPath + "/hooks", null, cb);
	      };
	
	      // Get a hook
	      // --------
	
	      this.getHook = function(id, cb) {
	        _request("GET", repoPath + "/hooks/" + id, null, cb);
	      };
	
	      // Create a hook
	      // --------
	
	      this.createHook = function(options, cb) {
	        _request("POST", repoPath + "/hooks", options, cb);
	      };
	
	      // Edit a hook
	      // --------
	
	      this.editHook = function(id, options, cb) {
	        _request("PATCH", repoPath + "/hooks/" + id, options, cb);
	      };
	
	      // Delete a hook
	      // --------
	
	      this.deleteHook = function(id, cb) {
	        _request("DELETE", repoPath + "/hooks/" + id, null, cb);
	      };
	
	      // Read file at given path
	      // -------
	
	      this.read = function(branch, path, cb) {
	        that.getSha(branch, path, function(err, sha) {
	          if (!sha) return cb("not found", null);
	          that.getBlob(sha, function(err, content) {
	            cb(err, content, sha);
	          });
	        });
	      };
	
	      // Remove a file from the tree
	      // -------
	
	      this.remove = function(branch, path, cb) {
	        updateTree(branch, function(err, latestCommit) {
	          that.getTree(latestCommit+"?recursive=true", function(err, tree) {
	            // Update Tree
	            var newTree = _.reject(tree, function(ref) { return ref.path === path; });
	            _.each(newTree, function(ref) {
	              if (ref.type === "tree") delete ref.sha;
	            });
	
	            that.postTree(newTree, function(err, rootTree) {
	              that.commit(latestCommit, rootTree, 'Deleted '+path , function(err, commit) {
	                that.updateHead(branch, commit, function(err) {
	                  cb(err);
	                });
	              });
	            });
	          });
	        });
	      };
	      
	      // Delete a file from the tree
	      // -------
	      
	      this.delete = function(branch, path, cb) {
	        that.getSha(branch, path, function(err, sha) {
	          if (!sha) return cb("not found", null);
	          var delPath = repoPath + "/contents/" + path;
	          var params = {
	            "message": "Deleted " + path,
	            "sha": sha 
	          };
	          delPath += "?message=" + encodeURIComponent(params.message);
	          delPath += "&sha=" + encodeURIComponent(params.sha);
	          _request("DELETE", delPath, null, cb);
	        })
	      }
	      
	      // Move a file to a new location
	      // -------
	
	      this.move = function(branch, path, newPath, cb) {
	        updateTree(branch, function(err, latestCommit) {
	          that.getTree(latestCommit+"?recursive=true", function(err, tree) {
	            // Update Tree
	            _.each(tree, function(ref) {
	              if (ref.path === path) ref.path = newPath;
	              if (ref.type === "tree") delete ref.sha;
	            });
	
	            that.postTree(tree, function(err, rootTree) {
	              that.commit(latestCommit, rootTree, 'Deleted '+path , function(err, commit) {
	                that.updateHead(branch, commit, function(err) {
	                  cb(err);
	                });
	              });
	            });
	          });
	        });
	      };
	
	      // Write file contents to a given branch and path
	      // -------
	
	      this.write = function(branch, path, content, message, cb) {
	        updateTree(branch, function(err, latestCommit) {
	          if (err) return cb(err);
	          that.postBlob(content, function(err, blob) {
	            if (err) return cb(err);
	            that.updateTree(latestCommit, path, blob, function(err, tree) {
	              if (err) return cb(err);
	              that.commit(latestCommit, tree, message, function(err, commit) {
	                if (err) return cb(err);
	                that.updateHead(branch, commit, cb);
	              });
	            });
	          });
	        });
	      };
	
	      // List commits on a repository. Takes an object of optional paramaters:
	      // sha: SHA or branch to start listing commits from
	      // path: Only commits containing this file path will be returned
	      // since: ISO 8601 date - only commits after this date will be returned
	      // until: ISO 8601 date - only commits before this date will be returned
	      // -------
	
	      this.getCommits = function(options, cb) {
	          options = options || {};
	          var url = repoPath + "/commits";
	          var params = [];
	          if (options.sha) {
	              params.push("sha=" + encodeURIComponent(options.sha));
	          }
	          if (options.path) {
	              params.push("path=" + encodeURIComponent(options.path));
	          }
	          if (options.since) {
	              var since = options.since;
	              if (since.constructor === Date) {
	                  since = since.toISOString();
	              }
	              params.push("since=" + encodeURIComponent(since));
	          }
	          if (options.until) {
	              var until = options.until;
	              if (until.constructor === Date) {
	                  until = until.toISOString();
	              }
	              params.push("until=" + encodeURIComponent(until));
	          }
	          if (params.length > 0) {
	              url += "?" + params.join("&");
	          }
	          _request("GET", url, null, cb);
	      };
	    };
	
	    // Gists API
	    // =======
	
	    Github.Gist = function(options) {
	      var id = options.id;
	      var gistPath = "/gists/"+id;
	
	      // Read the gist
	      // --------
	
	      this.read = function(cb) {
	        _request("GET", gistPath, null, function(err, gist) {
	          cb(err, gist);
	        });
	      };
	
	      // Create the gist
	      // --------
	      // {
	      //  "description": "the description for this gist",
	      //    "public": true,
	      //    "files": {
	      //      "file1.txt": {
	      //        "content": "String file contents"
	      //      }
	      //    }
	      // }
	
	      this.create = function(options, cb){
	        _request("POST","/gists", options, cb);
	      };
	
	      // Delete the gist
	      // --------
	
	      this.delete = function(cb) {
	        _request("DELETE", gistPath, null, function(err,res) {
	          cb(err,res);
	        });
	      };
	
	      // Fork a gist
	      // --------
	
	      this.fork = function(cb) {
	        _request("POST", gistPath+"/fork", null, function(err,res) {
	          cb(err,res);
	        });
	      };
	
	      // Update a gist with the new stuff
	      // --------
	
	      this.update = function(options, cb) {
	        _request("PATCH", gistPath, options, function(err,res) {
	          cb(err,res);
	        });
	      };
	
	      // Star a gist
	      // --------
	
	      this.star = function(cb) {
	        _request("PUT", gistPath+"/star", null, function(err,res) {
	          cb(err,res);
	        });
	      };
	
	      // Untar a gist
	      // --------
	
	      this.unstar = function(cb) {
	        _request("DELETE", gistPath+"/star", null, function(err,res) {
	          cb(err,res);
	        });
	      };
	
	      // Check if a gist is starred
	      // --------
	
	      this.isStarred = function(cb) {
	        _request("GET", gistPath+"/star", null, function(err,res) {
	          cb(err,res);
	        });
	      };
	    };
	
	    // Issues API
	    // ==========
	
	    Github.Issue = function(options) {
	      var path = "/repos/" + options.user + "/" + options.repo + "/issues";
	
	      this.list = function(options, cb) {
	        _request("GET", path, options, function(err, res) {
	          cb(err,res)
	        });
	      };
	    };
	
	    // Top Level API
	    // -------
	
	    this.getIssues = function(user, repo) {
	      return new Github.Issue({user: user, repo: repo});
	    };
	
	    this.getRepo = function(user, repo) {
	      return new Github.Repository({user: user, name: repo});
	    };
	
	    this.getUser = function() {
	      return new Github.User();
	    };
	
	    this.getGist = function(id) {
	      return new Github.Gist({id: id});
	    };
	  };
	
	
	  if (true) {
	    // Github = exports;
	    module.exports = Github;
	  } else {
	    window.Github = Github;
	  }
	}).call(this);


/***/ },
/* 189 */
/*!***************************************!*\
  !*** ./~/react-spinkit/dist/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript undefined
	var React;
	
	React = __webpack_require__(/*! react/addons */ 196);
	
	module.exports = React.createClass({
	  displayName: "SpinKit",
	  getDefaultProps: function() {
	    return {
	      cssRequire: false,
	      spinnerName: 'three-bounce',
	      fadeIn: false
	    };
	  },
	  propTypes: {
	    cssRequire: React.PropTypes.bool.isRequired,
	    spinnerName: React.PropTypes.string.isRequired,
	    fadeIn: React.PropTypes.bool.isRequired
	  },
	  render: function() {
	    var classes, cx;
	    cx = React.addons.classSet;
	    classes = cx({
	      spinner: true,
	      "fade-in": this.props.fadeIn
	    });
	    if (this.props.cssRequire && this.props.fadeIn) {
	      __webpack_require__(/*! ../css/fade-in.css */ 198);
	    }
	    switch (this.props.spinnerName) {
	      case "three-bounce":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/three-bounce.css */ 200);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " three-bounce"
	        }, React.DOM.div({
	          "className": "bounce1"
	        }), React.DOM.div({
	          "className": "bounce2"
	        }), React.DOM.div({
	          "className": "bounce3"
	        })));
	      case "double-bounce":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/double-bounce.css */ 202);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " double-bounce"
	        }, React.DOM.div({
	          "className": "double-bounce1"
	        }), React.DOM.div({
	          "className": "double-bounce2"
	        })));
	      case "rotating-plane":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/rotating-plane.css */ 204);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " rotating-plane"
	        }));
	      case "wave":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/wave.css */ 206);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " wave"
	        }, React.DOM.div({
	          "className": "rect1"
	        }), React.DOM.div({
	          "className": "rect2"
	        }), React.DOM.div({
	          "className": "rect3"
	        }), React.DOM.div({
	          "className": "rect4"
	        }), React.DOM.div({
	          "className": "rect5"
	        })));
	      case "wandering-cubes":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/wandering-cubes.css */ 208);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " wandering-cubes"
	        }, React.DOM.div({
	          "className": "cube1"
	        }), React.DOM.div({
	          "className": "cube2"
	        })));
	      case "pulse":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/pulse.css */ 210);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " pulse"
	        }));
	      case "chasing-dots":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/chasing-dots.css */ 212);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " chasing-dots"
	        }, React.DOM.div({
	          "className": "dot1"
	        }), React.DOM.div({
	          "className": "dot2"
	        })));
	      case "circle":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/circle.css */ 214);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " circle-wrapper"
	        }, React.DOM.div({
	          "className": "circle1 circle"
	        }), React.DOM.div({
	          "className": "circle2 circle"
	        }), React.DOM.div({
	          "className": "circle3 circle"
	        }), React.DOM.div({
	          "className": "circle4 circle"
	        }), React.DOM.div({
	          "className": "circle5 circle"
	        }), React.DOM.div({
	          "className": "circle6 circle"
	        }), React.DOM.div({
	          "className": "circle7 circle"
	        }), React.DOM.div({
	          "className": "circle8 circle"
	        }), React.DOM.div({
	          "className": "circle9 circle"
	        }), React.DOM.div({
	          "className": "circle10 circle"
	        }), React.DOM.div({
	          "className": "circle11 circle"
	        }), React.DOM.div({
	          "className": "circle12 circle"
	        })));
	      case "cube-grid":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/cube-grid.css */ 216);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " cube-grid"
	        }, React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        }), React.DOM.div({
	          "className": "cube"
	        })));
	      case "wordpress":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/wordpress.css */ 218);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " wordpress"
	        }, React.DOM.span({
	          "className": "inner-circle"
	        })));
	      case "fading-circle":
	        if (this.props.cssRequire) {
	          __webpack_require__(/*! ../css/fading-circle.css */ 220);
	        }
	        return this.transferPropsTo(React.DOM.div({
	          "className": classes + " fading-circle"
	        }, React.DOM.div({
	          "className": "circle1 circle"
	        }), React.DOM.div({
	          "className": "circle2 circle"
	        }), React.DOM.div({
	          "className": "circle3 circle"
	        }), React.DOM.div({
	          "className": "circle4 circle"
	        }), React.DOM.div({
	          "className": "circle5 circle"
	        }), React.DOM.div({
	          "className": "circle6 circle"
	        }), React.DOM.div({
	          "className": "circle7 circle"
	        }), React.DOM.div({
	          "className": "circle8 circle"
	        }), React.DOM.div({
	          "className": "circle9 circle"
	        }), React.DOM.div({
	          "className": "circle10 circle"
	        }), React.DOM.div({
	          "className": "circle11 circle"
	        }), React.DOM.div({
	          "className": "circle12 circle"
	        })));
	    }
	  }
	});


/***/ },
/* 190 */
/*!**************************!*\
  !*** ./~/fetch/fetch.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	(function() {
	  'use strict';
	
	  if (window.fetch) {
	    return
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    var self = this
	    if (headers instanceof Headers) {
	      headers.forEach(function(name, values) {
	        values.forEach(function(value) {
	          self.append(name, value)
	        })
	      })
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        self.append(name, headers[name])
	      })
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[name]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[name]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[name] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(name)
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[name] = [value]
	  }
	
	  // Instead of iterable for now.
	  Headers.prototype.forEach = function(callback) {
	    var self = this
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      callback(name, self.map[name])
	    })
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Body already consumed'))
	    }
	    body.bodyUsed = true
	  }
	
	  function Body() {
	    this.body = null
	    this.bodyUsed = false
	
	    this.arrayBuffer = function() {
	      throw new Error('Not implemented yet')
	    }
	
	    this.blob = function() {
	      var rejected = consumed(this)
	      return rejected ? rejected : Promise.resolve(new Blob([this.body]))
	    }
	
	    this.formData = function() {
	      return Promise.resolve(decode(this.body))
	    }
	
	    this.json = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      var body = this.body
	      return new Promise(function(resolve, reject) {
	        try {
	          resolve(JSON.parse(body))
	        } catch (ex) {
	          reject(ex)
	        }
	      })
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      return rejected ? rejected : Promise.resolve(this.body)
	    }
	
	    return this
	  }
	
	  function Request(url, options) {
	    options = options || {}
	    this.url = url
	    this.body = options.body
	    this.credentials = options.credentials || null
	    this.headers = new Headers(options.headers)
	    this.method = options.method || 'GET'
	    this.mode = options.mode || null
	    this.referrer = null
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Request.prototype.fetch = function() {
	    var self = this
	
	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr)
	        }
	        resolve(new Response(xhr.responseText, options))
	      }
	
	      xhr.onerror = function() {
	        reject()
	      }
	
	      xhr.open(self.method, self.url)
	
	      self.headers.forEach(function(name, values) {
	        values.forEach(function(value) {
	          xhr.setRequestHeader(name, value)
	        })
	      })
	
	      xhr.send(self.body)
	    })
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(body, options) {
	    this.body = body
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.statusText = options.statusText
	    this.headers = options.headers
	  }
	
	  Body.call(Response.prototype)
	
	  window.fetch = function (url, options) {
	    return new Request(url, options).fetch()
	  }
	})();


/***/ },
/* 191 */
/*!*******************************************!*\
  !*** ./~/es6-promise/dist/es6-promise.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.0
	 */
	
	(function() {
	    "use strict";
	
	    function $$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function $$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function $$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var $$utils$$_isArray;
	
	    if (!Array.isArray) {
	      $$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      $$utils$$_isArray = Array.isArray;
	    }
	
	    var $$utils$$isArray = $$utils$$_isArray;
	    var $$utils$$now = Date.now || function() { return new Date().getTime(); };
	    function $$utils$$F() { }
	
	    var $$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      $$utils$$F.prototype = o;
	      return new $$utils$$F();
	    });
	
	    var $$asap$$len = 0;
	
	    var $$asap$$default = function asap(callback, arg) {
	      $$asap$$queue[$$asap$$len] = callback;
	      $$asap$$queue[$$asap$$len + 1] = arg;
	      $$asap$$len += 2;
	      if ($$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        $$asap$$scheduleFlush();
	      }
	    };
	
	    var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
	    var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;
	
	    // test for web worker but not in IE10
	    var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function $$asap$$useNextTick() {
	      return function() {
	        process.nextTick($$asap$$flush);
	      };
	    }
	
	    function $$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function $$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = $$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function $$asap$$useSetTimeout() {
	      return function() {
	        setTimeout($$asap$$flush, 1);
	      };
	    }
	
	    var $$asap$$queue = new Array(1000);
	
	    function $$asap$$flush() {
	      for (var i = 0; i < $$asap$$len; i+=2) {
	        var callback = $$asap$$queue[i];
	        var arg = $$asap$$queue[i+1];
	
	        callback(arg);
	
	        $$asap$$queue[i] = undefined;
	        $$asap$$queue[i+1] = undefined;
	      }
	
	      $$asap$$len = 0;
	    }
	
	    var $$asap$$scheduleFlush;
	
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      $$asap$$scheduleFlush = $$asap$$useNextTick();
	    } else if ($$asap$$BrowserMutationObserver) {
	      $$asap$$scheduleFlush = $$asap$$useMutationObserver();
	    } else if ($$asap$$isWorker) {
	      $$asap$$scheduleFlush = $$asap$$useMessageChannel();
	    } else {
	      $$asap$$scheduleFlush = $$asap$$useSetTimeout();
	    }
	
	    function $$$internal$$noop() {}
	    var $$$internal$$PENDING   = void 0;
	    var $$$internal$$FULFILLED = 1;
	    var $$$internal$$REJECTED  = 2;
	    var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();
	
	    function $$$internal$$selfFullfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function $$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.')
	    }
	
	    function $$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        $$$internal$$GET_THEN_ERROR.error = error;
	        return $$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function $$$internal$$handleForeignThenable(promise, thenable, then) {
	       $$asap$$default(function(promise) {
	        var sealed = false;
	        var error = $$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            $$$internal$$resolve(promise, value);
	          } else {
	            $$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          $$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          $$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function $$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, thenable._result);
	      } else if (promise._state === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, thenable._result);
	      } else {
	        $$$internal$$subscribe(thenable, undefined, function(value) {
	          $$$internal$$resolve(promise, value);
	        }, function(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        $$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = $$$internal$$getThen(maybeThenable);
	
	        if (then === $$$internal$$GET_THEN_ERROR) {
	          $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          $$$internal$$fulfill(promise, maybeThenable);
	        } else if ($$utils$$isFunction(then)) {
	          $$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          $$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function $$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        $$$internal$$reject(promise, $$$internal$$selfFullfillment());
	      } else if ($$utils$$objectOrFunction(value)) {
	        $$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        $$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function $$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      $$$internal$$publish(promise);
	    }
	
	    function $$$internal$$fulfill(promise, value) {
	      if (promise._state !== $$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = $$$internal$$FULFILLED;
	
	      if (promise._subscribers.length === 0) {
	      } else {
	        $$asap$$default($$$internal$$publish, promise);
	      }
	    }
	
	    function $$$internal$$reject(promise, reason) {
	      if (promise._state !== $$$internal$$PENDING) { return; }
	      promise._state = $$$internal$$REJECTED;
	      promise._result = reason;
	
	      $$asap$$default($$$internal$$publishRejection, promise);
	    }
	
	    function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + $$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        $$asap$$default($$$internal$$publish, parent);
	      }
	    }
	
	    function $$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          $$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function $$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();
	
	    function $$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        $$$internal$$TRY_CATCH_ERROR.error = e;
	        return $$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function $$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = $$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = $$$internal$$tryCatch(callback, detail);
	
	        if (value === $$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== $$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        $$$internal$$resolve(promise, value);
	      } else if (failed) {
	        $$$internal$$reject(promise, error);
	      } else if (settled === $$$internal$$FULFILLED) {
	        $$$internal$$fulfill(promise, value);
	      } else if (settled === $$$internal$$REJECTED) {
	        $$$internal$$reject(promise, value);
	      }
	    }
	
	    function $$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          $$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          $$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        $$$internal$$reject(promise, e);
	      }
	    }
	
	    function $$$enumerator$$makeSettledResult(state, position, value) {
	      if (state === $$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	        return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }
	
	    function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor($$$internal$$noop, label);
	      this._abortOnReject = abortOnReject;
	
	      if (this._validateInput(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._init();
	
	        if (this.length === 0) {
	          $$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            $$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        $$$internal$$reject(this.promise, this._validationError());
	      }
	    }
	
	    $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return $$utils$$isArray(input);
	    };
	
	    $$$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    $$$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    var $$$enumerator$$default = $$$enumerator$$Enumerator;
	
	    $$$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var promise = this.promise;
	      var input   = this._input;
	
	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      if ($$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
	          entry._onerror = null;
	          this._settledAt(entry._state, i, entry._result);
	        } else {
	          this._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        this._remaining--;
	        this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
	      }
	    };
	
	    $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === $$$internal$$PENDING) {
	        this._remaining--;
	
	        if (this._abortOnReject && state === $$$internal$$REJECTED) {
	          $$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = this._makeResult(state, i, value);
	        }
	      }
	
	      if (this._remaining === 0) {
	        $$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };
	
	    $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      $$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt($$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt($$$internal$$REJECTED, i, reason);
	      });
	    };
	
	    var $$promise$all$$default = function all(entries, label) {
	      return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    };
	
	    var $$promise$race$$default = function race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor($$$internal$$noop, label);
	
	      if (!$$utils$$isArray(entries)) {
	        $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        $$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        $$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
	        $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    };
	
	    var $$promise$resolve$$default = function resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$resolve(promise, object);
	      return promise;
	    };
	
	    var $$promise$reject$$default = function reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor($$$internal$$noop, label);
	      $$$internal$$reject(promise, reason);
	      return promise;
	    };
	
	    var $$es6$promise$promise$$counter = 0;
	
	    function $$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function $$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;
	
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise’s eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @constructor
	    */
	    function $$es6$promise$promise$$Promise(resolver, label) {
	      this._id = $$es6$promise$promise$$counter++;
	      this._label = label;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if ($$$internal$$noop !== resolver) {
	        if (!$$utils$$isFunction(resolver)) {
	          $$es6$promise$promise$$needsResolver();
	        }
	
	        if (!(this instanceof $$es6$promise$promise$$Promise)) {
	          $$es6$promise$promise$$needsNew();
	        }
	
	        $$$internal$$initializePromise(this, resolver);
	      }
	    }
	
	    $$es6$promise$promise$$Promise.all = $$promise$all$$default;
	    $$es6$promise$promise$$Promise.race = $$promise$race$$default;
	    $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
	    $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;
	
	    $$es6$promise$promise$$Promise.prototype = {
	      constructor: $$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection, label) {
	        var parent = this;
	        var state = parent._state;
	
	        if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
	          return this;
	        }
	
	        parent._onerror = null;
	
	        var child = new this.constructor($$$internal$$noop, label);
	        var result = parent._result;
	
	        if (state) {
	          var callback = arguments[state - 1];
	          $$asap$$default(function(){
	            $$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }
	
	        return child;
	      },
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection, label) {
	        return this.then(null, onRejection, label);
	      }
	    };
	
	    var $$es6$promise$polyfill$$default = function polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	        local = global;
	      } else if (typeof window !== 'undefined' && window.document) {
	        local = window;
	      } else {
	        local = self;
	      }
	
	      var es6PromiseSupport =
	        "Promise" in local &&
	        // Some of these methods are missing from
	        // Firefox/Chrome experimental implementations
	        "resolve" in local.Promise &&
	        "reject" in local.Promise &&
	        "all" in local.Promise &&
	        "race" in local.Promise &&
	        // Older version of the spec had a resolver object
	        // as the arg rather than a function
	        (function() {
	          var resolve;
	          new local.Promise(function(r) { resolve = r; });
	          return $$utils$$isFunction(resolve);
	        }());
	
	      if (!es6PromiseSupport) {
	        local.Promise = $$es6$promise$promise$$default;
	      }
	    };
	
	    var es6$promise$umd$$ES6Promise = {
	      Promise: $$es6$promise$promise$$default,
	      polyfill: $$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(/*! !webpack amd define */ 225)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = es6$promise$umd$$ES6Promise;
	    }
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36), (function() { return this; }()), __webpack_require__(/*! (webpack)/buildin/module.js */ 226)(module)))

/***/ },
/* 192 */,
/* 193 */,
/* 194 */
/*!********************************!*\
  !*** xmlhttprequest (ignored) ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 195 */
/*!*******************************************!*\
  !*** ./~/reflux/~/eventemitter3/index.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  if (!this._events || !this._events[event]) return [];
	
	  for (var i = 0, l = this._events[event].length, ee = []; i < l; i++) {
	    ee.push(this._events[event][i].fn);
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  if (!this._events || !this._events[event]) return false;
	
	  var listeners = this._events[event]
	    , length = listeners.length
	    , len = arguments.length
	    , ee = listeners[0]
	    , args
	    , i, j;
	
	  if (1 === length) {
	    if (ee.once) this.removeListener(event, ee.fn, true);
	
	    switch (len) {
	      case 1: return ee.fn.call(ee.context), true;
	      case 2: return ee.fn.call(ee.context, a1), true;
	      case 3: return ee.fn.call(ee.context, a1, a2), true;
	      case 4: return ee.fn.call(ee.context, a1, a2, a3), true;
	      case 5: return ee.fn.call(ee.context, a1, a2, a3, a4), true;
	      case 6: return ee.fn.call(ee.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    ee.fn.apply(ee.context, args);
	  } else {
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = [];
	  this._events[event].push(new EE( fn, context || this ));
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = [];
	  this._events[event].push(new EE(fn, context || this, true ));
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
	  if (!this._events || !this._events[event]) return this;
	
	  var listeners = this._events[event]
	    , events = [];
	
	  if (fn) for (var i = 0, length = listeners.length; i < length; i++) {
	    if (listeners[i].fn !== fn && listeners[i].once !== once) {
	      events.push(listeners[i]);
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) this._events[event] = events;
	  else this._events[event] = null;
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) this._events[event] = null;
	  else this._events = {};
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the module.
	//
	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.EventEmitter2 = EventEmitter;
	EventEmitter.EventEmitter3 = EventEmitter;
	
	if ('object' === typeof module && module.exports) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 196 */
/*!***************************!*\
  !*** ./~/react/addons.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/ReactWithAddons */ 224);


/***/ },
/* 197 */
/*!************************************!*\
  !*** ./~/github-api/lib/base64.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// This code was written by Tyler Akins and has been placed in the
	// public domain.  It would be nice if you left this header intact.
	// Base64 code from Tyler Akins -- http://rumkin.com
	
	var Base64 = (function () {
	    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
	    var obj = {
	        /**
	         * Encodes a string in base64
	         * @param {String} input The string to encode in base64.
	         */
	        encode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3;
	            var enc1, enc2, enc3, enc4;
	            var i = 0;
	
	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);
	
	                enc1 = chr1 >> 2;
	                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                enc4 = chr3 & 63;
	
	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }
	
	                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
	                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
	            } while (i < input.length);
	
	            return output;
	        },
	
	        /**
	         * Decodes a base64 string.
	         * @param {String} input The string to decode.
	         */
	        decode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3;
	            var enc1, enc2, enc3, enc4;
	            var i = 0;
	
	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	            do {
	                enc1 = keyStr.indexOf(input.charAt(i++));
	                enc2 = keyStr.indexOf(input.charAt(i++));
	                enc3 = keyStr.indexOf(input.charAt(i++));
	                enc4 = keyStr.indexOf(input.charAt(i++));
	
	                chr1 = (enc1 << 2) | (enc2 >> 4);
	                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                chr3 = ((enc3 & 3) << 6) | enc4;
	
	                output = output + String.fromCharCode(chr1);
	
	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }
	            } while (i < input.length);
	
	            return output;
	        }
	    };
	
	    return obj;
	})();
	if (true) {
	    // Github = exports;
	    module.exports = Base64;
	} else {
	    window.Base64 = Base64;
	}
	


/***/ },
/* 198 */
/*!*****************************************!*\
  !*** ./~/react-spinkit/css/fade-in.css ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/fade-in.css */ 199);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/fade-in.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/fade-in.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 199 */
/*!********************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/fade-in.css ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, "@-webkit-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@-moz-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@-ms-keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n@keyframes fade-in {\n  0% {\n      opacity: 0;\n  }\n  50% {\n      opacity: 0;\n  }\n  100% {\n      opacity: 1;\n  }\n}\n\n.fade-in {\n  -webkit-animation: fade-in 2s;\n  -moz-animation: fade-in 2s;\n  -o-animation: fade-in 2s;\n  -ms-animation: fade-in 2s;\n}\n", ""]);

/***/ },
/* 200 */
/*!**********************************************!*\
  !*** ./~/react-spinkit/css/three-bounce.css ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/three-bounce.css */ 201);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/three-bounce.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/three-bounce.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 201 */
/*!*************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/three-bounce.css ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".three-bounce > div {\n  width: 18px;\n  height: 18px;\n  background-color: #333;\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n  animation: bouncedelay 1.4s infinite ease-in-out;\n  /* Prevent first frame from flickering when animation starts */\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.three-bounce .bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.three-bounce .bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0.0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 40% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n", ""]);

/***/ },
/* 202 */
/*!***********************************************!*\
  !*** ./~/react-spinkit/css/double-bounce.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/double-bounce.css */ 203);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/double-bounce.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/double-bounce.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 203 */
/*!**************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/double-bounce.css ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".double-bounce {\n  width: 27px;\n  height: 27px;\n\n  position: relative;\n}\n\n.double-bounce1, .double-bounce2 {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #333;\n  opacity: 0.6;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  -webkit-animation: bounce 2.0s infinite ease-in-out;\n  animation: bounce 2.0s infinite ease-in-out;\n}\n\n.double-bounce2 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% { -webkit-transform: scale(0.0) }\n  50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 50% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n\n", ""]);

/***/ },
/* 204 */
/*!************************************************!*\
  !*** ./~/react-spinkit/css/rotating-plane.css ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/rotating-plane.css */ 205);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/rotating-plane.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/rotating-plane.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 205 */
/*!***************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/rotating-plane.css ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".rotating-plane {\n  width: 27px;\n  height: 27px;\n  background-color: #333;\n\n  -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n  animation: rotateplane 1.2s infinite ease-in-out;\n}\n\n@-webkit-keyframes rotateplane {\n  0% { -webkit-transform: perspective(120px) }\n  50% { -webkit-transform: perspective(120px) rotateY(180deg) }\n  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }\n}\n\n@keyframes rotateplane {\n  0% {\n    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n  } 50% {\n    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n  } 100% {\n    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n  }\n}\n\n", ""]);

/***/ },
/* 206 */
/*!**************************************!*\
  !*** ./~/react-spinkit/css/wave.css ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/wave.css */ 207);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wave.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wave.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 207 */
/*!*****************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/wave.css ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".wave {\n  width: 50px;\n  height: 27px;\n}\n\n.wave > div {\n  background-color: #333;\n  height: 100%;\n  width: 6px;\n  display: inline-block;\n\n  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n  animation: stretchdelay 1.2s infinite ease-in-out;\n}\n\n.wave .rect2 {\n  -webkit-animation-delay: -1.1s;\n  animation-delay: -1.1s;\n}\n\n.wave .rect3 {\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n.wave .rect4 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n\n.wave .rect5 {\n  -webkit-animation-delay: -0.8s;\n  animation-delay: -0.8s;\n}\n\n@-webkit-keyframes stretchdelay {\n  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }\n  20% { -webkit-transform: scaleY(1.0) }\n}\n\n@keyframes stretchdelay {\n  0%, 40%, 100% {\n    transform: scaleY(0.4);\n    -webkit-transform: scaleY(0.4);\n  } 20% {\n    transform: scaleY(1.0);\n    -webkit-transform: scaleY(1.0);\n  }\n}\n\n", ""]);

/***/ },
/* 208 */
/*!*************************************************!*\
  !*** ./~/react-spinkit/css/wandering-cubes.css ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/wandering-cubes.css */ 209);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wandering-cubes.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wandering-cubes.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 209 */
/*!****************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/wandering-cubes.css ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".wandering-cubes {\n  width: 27px;\n  height: 27px;\n  position: relative;\n}\n\n.cube1, .cube2 {\n  background-color: #333;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  -webkit-animation: cubemove 1.8s infinite ease-in-out;\n  animation: cubemove 1.8s infinite ease-in-out;\n}\n\n.cube2 {\n  -webkit-animation-delay: -0.9s;\n  animation-delay: -0.9s;\n}\n\n@-webkit-keyframes cubemove {\n  25% { -webkit-transform: translateX(22px) rotate(-90deg) scale(0.5) }\n  50% { -webkit-transform: translateX(22px) translateY(22px) rotate(-180deg) }\n  75% { -webkit-transform: translateX(0px) translateY(22px) rotate(-270deg) scale(0.5) }\n  100% { -webkit-transform: rotate(-360deg) }\n}\n\n@keyframes cubemove {\n  25% { \n    transform: translateX(42px) rotate(-90deg) scale(0.5);\n    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n  } 50% {\n    /* Hack to make FF rotate in the right direction */\n    transform: translateX(42px) translateY(42px) rotate(-179deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n  } 50.1% {\n    transform: translateX(42px) translateY(42px) rotate(-180deg);\n    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n  } 75% {\n    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n  } 100% {\n    transform: rotate(-360deg);\n    -webkit-transform: rotate(-360deg);\n  }\n}\n\n", ""]);

/***/ },
/* 210 */
/*!***************************************!*\
  !*** ./~/react-spinkit/css/pulse.css ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/pulse.css */ 211);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/pulse.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/pulse.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 211 */
/*!******************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/pulse.css ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".pulse {\n  width: 27px;\n  height: 27px;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: scaleout 1.0s infinite ease-in-out;\n  animation: scaleout 1.0s infinite ease-in-out;\n}\n\n@-webkit-keyframes scaleout {\n  0% { -webkit-transform: scale(0.0) }\n  100% {\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n@keyframes scaleout {\n  0% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 100% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n    opacity: 0;\n  }\n}\n\n", ""]);

/***/ },
/* 212 */
/*!**********************************************!*\
  !*** ./~/react-spinkit/css/chasing-dots.css ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/chasing-dots.css */ 213);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/chasing-dots.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/chasing-dots.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 213 */
/*!*************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/chasing-dots.css ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".chasing-dots {\n  width: 27px;\n  height: 27px;\n  position: relative;\n\n  -webkit-animation: rotate 2.0s infinite linear;\n  animation: rotate 2.0s infinite linear;\n}\n\n.dot1, .dot2 {\n  width: 60%;\n  height: 60%;\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  background-color: #333;\n  border-radius: 100%;\n\n  -webkit-animation: bounce 2.0s infinite ease-in-out;\n  animation: bounce 2.0s infinite ease-in-out;\n}\n\n.dot2 {\n  top: auto;\n  bottom: 0px;\n  -webkit-animation-delay: -1.0s;\n  animation-delay: -1.0s;\n}\n\n@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes bounce {\n  0%, 100% { -webkit-transform: scale(0.0) }\n  50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: scale(0.0);\n    -webkit-transform: scale(0.0);\n  } 50% {\n    transform: scale(1.0);\n    -webkit-transform: scale(1.0);\n  }\n}\n\n", ""]);

/***/ },
/* 214 */
/*!****************************************!*\
  !*** ./~/react-spinkit/css/circle.css ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/circle.css */ 215);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/circle.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/circle.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 215 */
/*!*******************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/circle.css ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".circle-wrapper {\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\n\n.circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 20%;\n  height: 20%;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\n  animation: bouncedelay 1.2s infinite ease-in-out;\n  /* Prevent first frame from flickering when animation starts */\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.circle2  { -webkit-transform: rotate(30deg);  transform: rotate(30deg)  }\n.circle3  { -webkit-transform: rotate(60deg);  transform: rotate(60deg)  }\n.circle4  { -webkit-transform: rotate(90deg);  transform: rotate(90deg)  }\n.circle5  { -webkit-transform: rotate(120deg); transform: rotate(120deg) }\n.circle6  { -webkit-transform: rotate(150deg); transform: rotate(150deg) }\n.circle7  { -webkit-transform: rotate(180deg); transform: rotate(180deg) }\n.circle8  { -webkit-transform: rotate(210deg); transform: rotate(210deg) }\n.circle9  { -webkit-transform: rotate(240deg); transform: rotate(240deg) }\n.circle10 { -webkit-transform: rotate(270deg); transform: rotate(270deg) }\n.circle11 { -webkit-transform: rotate(300deg); transform: rotate(300deg) }\n.circle12 { -webkit-transform: rotate(330deg); transform: rotate(330deg) }\n\n.circle2:before  { -webkit-animation-delay: -1.1s; animation-delay: -1.1s }\n.circle3:before  { -webkit-animation-delay: -1.0s; animation-delay: -1.0s }\n.circle4:before  { -webkit-animation-delay: -0.9s; animation-delay: -0.9s }\n.circle5:before  { -webkit-animation-delay: -0.8s; animation-delay: -0.8s }\n.circle6:before  { -webkit-animation-delay: -0.7s; animation-delay: -0.7s }\n.circle7:before  { -webkit-animation-delay: -0.6s; animation-delay: -0.6s }\n.circle8:before  { -webkit-animation-delay: -0.5s; animation-delay: -0.5s }\n.circle9:before  { -webkit-animation-delay: -0.4s; animation-delay: -0.4s }\n.circle10:before { -webkit-animation-delay: -0.3s; animation-delay: -0.3s }\n.circle11:before { -webkit-animation-delay: -0.2s; animation-delay: -0.2s }\n.circle12:before { -webkit-animation-delay: -0.1s; animation-delay: -0.1s }\n\n@-webkit-keyframes bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0.0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0.0);\n    transform: scale(0.0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n", ""]);

/***/ },
/* 216 */
/*!*******************************************!*\
  !*** ./~/react-spinkit/css/cube-grid.css ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/cube-grid.css */ 217);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/cube-grid.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/cube-grid.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 217 */
/*!**********************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/cube-grid.css ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".cube-grid {\n  width:27px;\n  height:27px;\n}\n\n.cube {\n  width:33%;\n  height:33%;\n  background:#333;\n  float:left;\n  -webkit-animation: scaleDelay 1.3s infinite ease-in-out;\n  animation: scaleDelay 1.3s infinite ease-in-out;\n}\n\n/*\n * Spinner positions\n * 1 2 3\n * 4 5 6\n * 7 8 9\n */\n\n.spinner .cube:nth-child(1) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n.spinner .cube:nth-child(2) { -webkit-animation-delay: 0.3s; animation-delay: 0.3s  }\n.spinner .cube:nth-child(3) { -webkit-animation-delay: 0.4s; animation-delay: 0.4s  }\n.spinner .cube:nth-child(4) { -webkit-animation-delay: 0.1s; animation-delay: 0.1s  }\n.spinner .cube:nth-child(5) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n.spinner .cube:nth-child(6) { -webkit-animation-delay: 0.3s; animation-delay: 0.3s  }\n.spinner .cube:nth-child(7) { -webkit-animation-delay: 0.0s; animation-delay: 0.0s  }\n.spinner .cube:nth-child(8) { -webkit-animation-delay: 0.1s; animation-delay: 0.1s  }\n.spinner .cube:nth-child(9) { -webkit-animation-delay: 0.2s; animation-delay: 0.2s  }\n\n@-webkit-keyframes scaleDelay {\n  0%, 70%, 100% { -webkit-transform:scale3D(1.0, 1.0, 1.0) }\n  35%           { -webkit-transform:scale3D(0.0, 0.0, 1.0) }\n}\n\n@keyframes scaleDelay {\n  0%, 70%, 100% { -webkit-transform:scale3D(1.0, 1.0, 1.0); transform:scale3D(1.0, 1.0, 1.0) }\n  35%           { -webkit-transform:scale3D(1.0, 1.0, 1.0); transform:scale3D(0.0, 0.0, 1.0) }\n}\n\n", ""]);

/***/ },
/* 218 */
/*!*******************************************!*\
  !*** ./~/react-spinkit/css/wordpress.css ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/wordpress.css */ 219);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wordpress.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/wordpress.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 219 */
/*!**********************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/wordpress.css ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".wordpress {\n  background: #333;\n  width: 27px;\n  height: 27px;\n  display: inline-block;\n  border-radius: 27px;\n  position: relative;\n  -webkit-animation: inner-circle 1s linear infinite;\n  animation: inner-circle 1s linear infinite;\n}\n\n.inner-circle {\n  display: block;\n  background: #fff;\n  width: 8px;\n  height: 8px;\n  position: absolute;\n  border-radius: 8px;\n  top: 5px;\n  left: 5px;\n}\n\n@-webkit-keyframes inner-circle {\n  0% { -webkit-transform: rotate(0); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes inner-circle {\n  0% { transform: rotate(0); -webkit-transform:rotate(0); }\n  100% { transform: rotate(360deg); -webkit-transform:rotate(360deg); }\n}\n\n", ""]);

/***/ },
/* 220 */
/*!***********************************************!*\
  !*** ./~/react-spinkit/css/fading-circle.css ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./~/css-loader!./~/react-spinkit/css/fading-circle.css */ 221);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./~/style-loader/addStyles.js */ 116)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/fading-circle.css", function() {
			var newContent = require("!!/Users/danfox/ghupdate/node_modules/css-loader/index.js!/Users/danfox/ghupdate/node_modules/react-spinkit/css/fading-circle.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 221 */
/*!**************************************************************!*\
  !*** ./~/css-loader!./~/react-spinkit/css/fading-circle.css ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./~/css-loader/cssToString.js */ 164)();
	exports.push([module.id, ".fading-circle {\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\n\n.fading-circle .circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.fading-circle .circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 18%;\n  height: 18%;\n  background-color: #333;\n\n  border-radius: 100%;\n  -webkit-animation: fadedelay 1.2s infinite ease-in-out;\n  animation: fadedelay 1.2s infinite ease-in-out;\n  /* Prevent first frame from flickering when animation starts */\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.circle2  { transform: rotate(30deg);  -webkit-transform: rotate(30deg)  }\n.circle3  { transform: rotate(60deg);  -webkit-transform: rotate(60deg)  }\n.circle4  { transform: rotate(90deg);  -webkit-transform: rotate(90deg)  }\n.circle5  { transform: rotate(120deg); -webkit-transform: rotate(120deg) }\n.circle6  { transform: rotate(150deg); -webkit-transform: rotate(150deg) }\n.circle7  { transform: rotate(180deg); -webkit-transform: rotate(180deg) }\n.circle8  { transform: rotate(210deg); -webkit-transform: rotate(210deg) }\n.circle9  { transform: rotate(240deg); -webkit-transform: rotate(240deg) }\n.circle10 { transform: rotate(270deg); -webkit-transform: rotate(270deg) }\n.circle11 { transform: rotate(300deg); -webkit-transform: rotate(300deg) }\n.circle12 { transform: rotate(330deg); -webkit-transform: rotate(330deg) }\n\n.circle2:before  { animation-delay: -1.1s; -webkit-animation-delay: -1.1s }\n.circle3:before  { animation-delay: -1.0s; -webkit-animation-delay: -1.0s }\n.circle4:before  { animation-delay: -0.9s; -webkit-animation-delay: -0.9s }\n.circle5:before  { animation-delay: -0.8s; -webkit-animation-delay: -0.8s }\n.circle6:before  { animation-delay: -0.7s; -webkit-animation-delay: -0.7s }\n.circle7:before  { animation-delay: -0.6s; -webkit-animation-delay: -0.6s }\n.circle8:before  { animation-delay: -0.5s; -webkit-animation-delay: -0.5s }\n.circle9:before  { animation-delay: -0.4s; -webkit-animation-delay: -0.4s }\n.circle10:before { animation-delay: -0.3s; -webkit-animation-delay: -0.3s }\n.circle11:before { animation-delay: -0.2s; -webkit-animation-delay: -0.2s }\n.circle12:before { animation-delay: -0.1s; -webkit-animation-delay: -0.1s }\n\n@-webkit-keyframes fadedelay {\n  0%, 39%, 100% { opacity: 0 }\n  40% { opacity: 1 }\n}\n\n@keyframes fadedelay {\n  0%, 39%, 100% { opacity: 0 }\n  40% { opacity: 0 }\n}\n\n", ""]);

/***/ },
/* 222 */,
/* 223 */,
/* 224 */
/*!****************************************!*\
  !*** ./~/react/lib/ReactWithAddons.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactWithAddons
	 */
	
	/**
	 * This module exists purely in the open source project, and is meant as a way
	 * to create a separate standalone build of React. This build has "addons", or
	 * functionality we've built and think might be useful but doesn't have a good
	 * place to live inside React core.
	 */
	
	"use strict";
	
	var LinkedStateMixin = __webpack_require__(/*! ./LinkedStateMixin */ 229);
	var React = __webpack_require__(/*! ./React */ 2);
	var ReactComponentWithPureRenderMixin =
	  __webpack_require__(/*! ./ReactComponentWithPureRenderMixin */ 230);
	var ReactCSSTransitionGroup = __webpack_require__(/*! ./ReactCSSTransitionGroup */ 231);
	var ReactTransitionGroup = __webpack_require__(/*! ./ReactTransitionGroup */ 232);
	
	var cx = __webpack_require__(/*! ./cx */ 233);
	var cloneWithProps = __webpack_require__(/*! ./cloneWithProps */ 234);
	var update = __webpack_require__(/*! ./update */ 235);
	
	React.addons = {
	  CSSTransitionGroup: ReactCSSTransitionGroup,
	  LinkedStateMixin: LinkedStateMixin,
	  PureRenderMixin: ReactComponentWithPureRenderMixin,
	  TransitionGroup: ReactTransitionGroup,
	
	  classSet: cx,
	  cloneWithProps: cloneWithProps,
	  update: update
	};
	
	if ("production" !== process.env.NODE_ENV) {
	  React.addons.Perf = __webpack_require__(/*! ./ReactDefaultPerf */ 88);
	  React.addons.TestUtils = __webpack_require__(/*! ./ReactTestUtils */ 236);
	}
	
	module.exports = React;
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36)))

/***/ },
/* 225 */
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 226 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 227 */
/*!*************************************************!*\
  !*** ./~/github-api/~/underscore/underscore.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.7.0';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var createCallback = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  _.iteratee = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return createCallback(value, context, argCount);
	    if (_.isObject(value)) return _.matches(value);
	    return _.property(value);
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    if (obj == null) return obj;
	    iteratee = createCallback(iteratee, context);
	    var i, length = obj.length;
	    if (length === +length) {
	      for (i = 0; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    if (obj == null) return [];
	    iteratee = _.iteratee(iteratee, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length),
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  var reduceError = 'Reduce of empty array with no initial value';
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index = 0, currentKey;
	    if (arguments.length < 3) {
	      if (!length) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[index++] : index++];
	    }
	    for (; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
	    if (obj == null) obj = [];
	    iteratee = createCallback(iteratee, context, 4);
	    var keys = obj.length !== + obj.length && _.keys(obj),
	        index = (keys || obj).length,
	        currentKey;
	    if (arguments.length < 3) {
	      if (!index) throw new TypeError(reduceError);
	      memo = obj[keys ? keys[--index] : --index];
	    }
	    while (index--) {
	      currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    predicate = _.iteratee(predicate, context);
	    _.some(obj, function(value, index, list) {
	      if (predicate(value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    predicate = _.iteratee(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    if (obj == null) return true;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    if (obj == null) return false;
	    predicate = _.iteratee(predicate, context);
	    var keys = obj.length !== +obj.length && _.keys(obj),
	        length = (keys || obj).length,
	        index, currentKey;
	    for (index = 0; index < length; index++) {
	      currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (obj.length !== +obj.length) obj = _.values(obj);
	    return _.indexOf(obj, target) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = obj.length === +obj.length ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = _.iteratee(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = _.iteratee(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = low + high >>> 1;
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = _.iteratee(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    for (var i = 0, length = input.length; i < length; i++) {
	      var value = input[i];
	      if (!_.isArray(value) && !_.isArguments(value)) {
	        if (!strict) output.push(value);
	      } else if (shallow) {
	        push.apply(output, value);
	      } else {
	        flatten(value, shallow, strict, output);
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false, []);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (array == null) return [];
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = array.length; i < length; i++) {
	      var value = array[i];
	      if (isSorted) {
	        if (!i || seen !== value) result.push(value);
	        seen = value;
	      } else if (iteratee) {
	        var computed = iteratee(value, i, array);
	        if (_.indexOf(seen, computed) < 0) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (_.indexOf(result, value) < 0) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true, []));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    if (array == null) return [];
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = array.length; i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(slice.call(arguments, 1), true, true, []);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function(array) {
	    if (array == null) return [];
	    var length = _.max(arguments, 'length').length;
	    var results = Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, i);
	    }
	    return results;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };
	
	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var idx = array.length;
	    if (typeof from == 'number') {
	      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
	    }
	    while (--idx >= 0) if (array[idx] === item) return idx;
	    return -1;
	  };
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Reusable constructor function for prototype setting.
	  var Ctor = function(){};
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    args = slice.call(arguments, 2);
	    bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      Ctor.prototype = func.prototype;
	      var self = new Ctor;
	      Ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (_.isObject(result)) return result;
	      return self;
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = hasher ? hasher.apply(this, arguments) : key;
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last > 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed before being called N times.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      source = arguments[i];
	      for (prop in source) {
	        if (hasOwnProperty.call(source, prop)) {
	            obj[prop] = source[prop];
	        }
	      }
	    }
	    return obj;
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj, iteratee, context) {
	    var result = {}, key;
	    if (obj == null) return result;
	    if (_.isFunction(iteratee)) {
	      iteratee = createCallback(iteratee, context);
	      for (key in obj) {
	        var value = obj[key];
	        if (iteratee(value, key, obj)) result[key] = value;
	      }
	    } else {
	      var keys = concat.apply([], slice.call(arguments, 1));
	      obj = new Object(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        key = keys[i];
	        if (key in obj) result[key] = obj[key];
	      }
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	      var source = arguments[i];
	      for (var prop in source) {
	        if (obj[prop] === void 0) obj[prop] = source[prop];
	      }
	    }
	    return obj;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (
	      aCtor !== bCtor &&
	      // Handle Object.create(x) cases
	      'constructor' in a && 'constructor' in b &&
	      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	        _.isFunction(bCtor) && bCtor instanceof bCtor)
	    ) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size, result;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size === b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      size = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      result = _.keys(b).length === size;
	      if (result) {
	        while (size--) {
	          // Deep compare each member
	          key = keys[size];
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    var pairs = _.pairs(attrs), length = pairs.length;
	    return function(obj) {
	      if (obj == null) return !length;
	      obj = new Object(obj);
	      for (var i = 0; i < length; i++) {
	        var pair = pairs[i], key = pair[0];
	        if (pair[1] !== obj[key] || !(key in obj)) return false;
	      }
	      return true;
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = createCallback(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? object[property]() : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 228 */,
/* 229 */
/*!*****************************************!*\
  !*** ./~/react/lib/LinkedStateMixin.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule LinkedStateMixin
	 * @typechecks static-only
	 */
	
	"use strict";
	
	var ReactLink = __webpack_require__(/*! ./ReactLink */ 238);
	var ReactStateSetters = __webpack_require__(/*! ./ReactStateSetters */ 239);
	
	/**
	 * A simple mixin around ReactLink.forState().
	 */
	var LinkedStateMixin = {
	  /**
	   * Create a ReactLink that's linked to part of this component's state. The
	   * ReactLink will have the current value of this.state[key] and will call
	   * setState() when a change is requested.
	   *
	   * @param {string} key state key to update. Note: you may want to use keyOf()
	   * if you're using Google Closure Compiler advanced mode.
	   * @return {ReactLink} ReactLink instance linking to the state.
	   */
	  linkState: function(key) {
	    return new ReactLink(
	      this.state[key],
	      ReactStateSetters.createStateKeySetter(this, key)
	    );
	  }
	};
	
	module.exports = LinkedStateMixin;


/***/ },
/* 230 */
/*!**********************************************************!*\
  !*** ./~/react/lib/ReactComponentWithPureRenderMixin.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/
	
	"use strict";
	
	var shallowEqual = __webpack_require__(/*! ./shallowEqual */ 151);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 231 */
/*!************************************************!*\
  !*** ./~/react/lib/ReactCSSTransitionGroup.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroup
	 */
	
	"use strict";
	
	var React = __webpack_require__(/*! ./React */ 2);
	
	var ReactTransitionGroup = __webpack_require__(/*! ./ReactTransitionGroup */ 232);
	var ReactCSSTransitionGroupChild = __webpack_require__(/*! ./ReactCSSTransitionGroupChild */ 240);
	
	var ReactCSSTransitionGroup = React.createClass({
	  displayName: 'ReactCSSTransitionGroup',
	
	  propTypes: {
	    transitionName: React.PropTypes.string.isRequired,
	    transitionEnter: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool
	  },
	
	  getDefaultProps: function() {
	    return {
	      transitionEnter: true,
	      transitionLeave: true
	    };
	  },
	
	  _wrapChild: function(child) {
	    // We need to provide this childFactory so that
	    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
	    // leave while it is leaving.
	    return ReactCSSTransitionGroupChild(
	      {
	        name: this.props.transitionName,
	        enter: this.props.transitionEnter,
	        leave: this.props.transitionLeave
	      },
	      child
	    );
	  },
	
	  render: function() {
	    return this.transferPropsTo(
	      ReactTransitionGroup(
	        {childFactory: this._wrapChild},
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = ReactCSSTransitionGroup;


/***/ },
/* 232 */
/*!*********************************************!*\
  !*** ./~/react/lib/ReactTransitionGroup.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactTransitionGroup
	 */
	
	"use strict";
	
	var React = __webpack_require__(/*! ./React */ 2);
	var ReactTransitionChildMapping = __webpack_require__(/*! ./ReactTransitionChildMapping */ 241);
	
	var cloneWithProps = __webpack_require__(/*! ./cloneWithProps */ 234);
	var emptyFunction = __webpack_require__(/*! ./emptyFunction */ 94);
	var merge = __webpack_require__(/*! ./merge */ 47);
	
	var ReactTransitionGroup = React.createClass({
	  displayName: 'ReactTransitionGroup',
	
	  propTypes: {
	    component: React.PropTypes.func,
	    childFactory: React.PropTypes.func
	  },
	
	  getDefaultProps: function() {
	    return {
	      component: React.DOM.span,
	      childFactory: emptyFunction.thatReturnsArgument
	    };
	  },
	
	  getInitialState: function() {
	    return {
	      children: ReactTransitionChildMapping.getChildMapping(this.props.children)
	    };
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(
	      nextProps.children
	    );
	    var prevChildMapping = this.state.children;
	
	    this.setState({
	      children: ReactTransitionChildMapping.mergeChildMappings(
	        prevChildMapping,
	        nextChildMapping
	      )
	    });
	
	    var key;
	
	    for (key in nextChildMapping) {
	      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	      if (nextChildMapping[key] && !hasPrev &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToEnter.push(key);
	      }
	    }
	
	    for (key in prevChildMapping) {
	      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	      if (prevChildMapping[key] && !hasNext &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToLeave.push(key);
	      }
	    }
	
	    // If we want to someday check for reordering, we could do it here.
	  },
	
	  componentWillMount: function() {
	    this.currentlyTransitioningKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  },
	
	  componentDidUpdate: function() {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);
	
	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },
	
	  performEnter: function(key) {
	    this.currentlyTransitioningKeys[key] = true;
	
	    var component = this.refs[key];
	
	    if (component.componentWillEnter) {
	      component.componentWillEnter(
	        this._handleDoneEntering.bind(this, key)
	      );
	    } else {
	      this._handleDoneEntering(key);
	    }
	  },
	
	  _handleDoneEntering: function(key) {
	    var component = this.refs[key];
	    if (component.componentDidEnter) {
	      component.componentDidEnter();
	    }
	
	    delete this.currentlyTransitioningKeys[key];
	
	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );
	
	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  },
	
	  performLeave: function(key) {
	    this.currentlyTransitioningKeys[key] = true;
	
	    var component = this.refs[key];
	    if (component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  },
	
	  _handleDoneLeaving: function(key) {
	    var component = this.refs[key];
	
	    if (component.componentDidLeave) {
	      component.componentDidLeave();
	    }
	
	    delete this.currentlyTransitioningKeys[key];
	
	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );
	
	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      var newChildren = merge(this.state.children);
	      delete newChildren[key];
	      this.setState({children: newChildren});
	    }
	  },
	
	  render: function() {
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    var childrenToRender = {};
	    for (var key in this.state.children) {
	      var child = this.state.children[key];
	      if (child) {
	        // You may need to apply reactive updates to a child as it is leaving.
	        // The normal React way to do it won't work since the child will have
	        // already been removed. In case you need this behavior you can provide
	        // a childFactory function to wrap every child, even the ones that are
	        // leaving.
	        childrenToRender[key] = cloneWithProps(
	          this.props.childFactory(child),
	          {ref: key}
	        );
	      }
	    }
	    return this.transferPropsTo(this.props.component(null, childrenToRender));
	  }
	});
	
	module.exports = ReactTransitionGroup;


/***/ },
/* 233 */
/*!***************************!*\
  !*** ./~/react/lib/cx.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule cx
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;


/***/ },
/* 234 */
/*!***************************************!*\
  !*** ./~/react/lib/cloneWithProps.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks
	 * @providesModule cloneWithProps
	 */
	
	"use strict";
	
	var ReactPropTransferer = __webpack_require__(/*! ./ReactPropTransferer */ 51);
	
	var keyOf = __webpack_require__(/*! ./keyOf */ 63);
	var warning = __webpack_require__(/*! ./warning */ 31);
	
	var CHILDREN_PROP = keyOf({children: null});
	
	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {object} child child component you'd like to clone
	 * @param {object} props props you'd like to modify. They will be merged
	 * as if you used `transferPropsTo()`.
	 * @return {object} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if ("production" !== process.env.NODE_ENV) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      !child.props.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }
	
	  var newProps = ReactPropTransferer.mergeProps(props, child.props);
	
	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }
	
	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactDescriptor.cloneAndReplaceProps.
	  return child.constructor(newProps);
	}
	
	module.exports = cloneWithProps;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36)))

/***/ },
/* 235 */
/*!*******************************!*\
  !*** ./~/react/lib/update.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule update
	 */
	
	"use strict";
	
	var copyProperties = __webpack_require__(/*! ./copyProperties */ 162);
	var keyOf = __webpack_require__(/*! ./keyOf */ 63);
	var invariant = __webpack_require__(/*! ./invariant */ 41);
	
	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return copyProperties(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}
	
	var COMMAND_PUSH = keyOf({$push: null});
	var COMMAND_UNSHIFT = keyOf({$unshift: null});
	var COMMAND_SPLICE = keyOf({$splice: null});
	var COMMAND_SET = keyOf({$set: null});
	var COMMAND_MERGE = keyOf({$merge: null});
	var COMMAND_APPLY = keyOf({$apply: null});
	
	var ALL_COMMANDS_LIST = [
	  COMMAND_PUSH,
	  COMMAND_UNSHIFT,
	  COMMAND_SPLICE,
	  COMMAND_SET,
	  COMMAND_MERGE,
	  COMMAND_APPLY
	];
	
	var ALL_COMMANDS_SET = {};
	
	ALL_COMMANDS_LIST.forEach(function(command) {
	  ALL_COMMANDS_SET[command] = true;
	});
	
	function invariantArrayCase(value, spec, command) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  ) : invariant(Array.isArray(value)));
	  var specValue = spec[command];
	  ("production" !== process.env.NODE_ENV ? invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  ) : invariant(Array.isArray(specValue)));
	}
	
	function update(value, spec) {
	  ("production" !== process.env.NODE_ENV ? invariant(
	    typeof spec === 'object',
	    'update(): You provided a key path to update() that did not contain one ' +
	    'of %s. Did you forget to include {%s: ...}?',
	    ALL_COMMANDS_LIST.join(', '),
	    COMMAND_SET
	  ) : invariant(typeof spec === 'object'));
	
	  if (spec.hasOwnProperty(COMMAND_SET)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Object.keys(spec).length === 1,
	      'Cannot have more than one key in an object with %s',
	      COMMAND_SET
	    ) : invariant(Object.keys(spec).length === 1));
	
	    return spec[COMMAND_SET];
	  }
	
	  var nextValue = shallowCopy(value);
	
	  if (spec.hasOwnProperty(COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    ("production" !== process.env.NODE_ENV ? invariant(
	      mergeObj && typeof mergeObj === 'object',
	      'update(): %s expects a spec of type \'object\'; got %s',
	      COMMAND_MERGE,
	      mergeObj
	    ) : invariant(mergeObj && typeof mergeObj === 'object'));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      nextValue && typeof nextValue === 'object',
	      'update(): %s expects a target of type \'object\'; got %s',
	      COMMAND_MERGE,
	      nextValue
	    ) : invariant(nextValue && typeof nextValue === 'object'));
	    copyProperties(nextValue, spec[COMMAND_MERGE]);
	  }
	
	  if (spec.hasOwnProperty(COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function(item) {
	      nextValue.push(item);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function(item) {
	      nextValue.unshift(item);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_SPLICE)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(value),
	      'Expected %s target to be an array; got %s',
	      COMMAND_SPLICE,
	      value
	    ) : invariant(Array.isArray(value)));
	    ("production" !== process.env.NODE_ENV ? invariant(
	      Array.isArray(spec[COMMAND_SPLICE]),
	      'update(): expected spec of %s to be an array of arrays; got %s. ' +
	      'Did you forget to wrap your parameters in an array?',
	      COMMAND_SPLICE,
	      spec[COMMAND_SPLICE]
	    ) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
	    spec[COMMAND_SPLICE].forEach(function(args) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        Array.isArray(args),
	        'update(): expected spec of %s to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?',
	        COMMAND_SPLICE,
	        spec[COMMAND_SPLICE]
	      ) : invariant(Array.isArray(args)));
	      nextValue.splice.apply(nextValue, args);
	    });
	  }
	
	  if (spec.hasOwnProperty(COMMAND_APPLY)) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      typeof spec[COMMAND_APPLY] === 'function',
	      'update(): expected spec of %s to be a function; got %s.',
	      COMMAND_APPLY,
	      spec[COMMAND_APPLY]
	    ) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }
	
	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }
	
	  return nextValue;
	}
	
	module.exports = update;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36)))

/***/ },
/* 236 */
/*!***************************************!*\
  !*** ./~/react/lib/ReactTestUtils.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactTestUtils
	 */
	
	"use strict";
	
	var EventConstants = __webpack_require__(/*! ./EventConstants */ 40);
	var EventPluginHub = __webpack_require__(/*! ./EventPluginHub */ 128);
	var EventPropagators = __webpack_require__(/*! ./EventPropagators */ 133);
	var React = __webpack_require__(/*! ./React */ 2);
	var ReactDescriptor = __webpack_require__(/*! ./ReactDescriptor */ 19);
	var ReactDOM = __webpack_require__(/*! ./ReactDOM */ 20);
	var ReactBrowserEventEmitter = __webpack_require__(/*! ./ReactBrowserEventEmitter */ 62);
	var ReactMount = __webpack_require__(/*! ./ReactMount */ 24);
	var ReactTextComponent = __webpack_require__(/*! ./ReactTextComponent */ 29);
	var ReactUpdates = __webpack_require__(/*! ./ReactUpdates */ 45);
	var SyntheticEvent = __webpack_require__(/*! ./SyntheticEvent */ 135);
	
	var mergeInto = __webpack_require__(/*! ./mergeInto */ 59);
	var copyProperties = __webpack_require__(/*! ./copyProperties */ 162);
	
	var topLevelTypes = EventConstants.topLevelTypes;
	
	function Event(suffix) {}
	
	/**
	 * @class ReactTestUtils
	 */
	
	/**
	 * Todo: Support the entire DOM.scry query syntax. For now, these simple
	 * utilities will suffice for testing purposes.
	 * @lends ReactTestUtils
	 */
	var ReactTestUtils = {
	  renderIntoDocument: function(instance) {
	    var div = document.createElement('div');
	    // None of our tests actually require attaching the container to the
	    // DOM, and doing so creates a mess that we rely on test isolation to
	    // clean up, so we're going to stop honoring the name of this method
	    // (and probably rename it eventually) if no problems arise.
	    // document.documentElement.appendChild(div);
	    return React.renderComponent(instance, div);
	  },
	
	  isDescriptor: function(descriptor) {
	    return ReactDescriptor.isValidDescriptor(descriptor);
	  },
	
	  isDescriptorOfType: function(inst, convenienceConstructor) {
	    return (
	      ReactDescriptor.isValidDescriptor(inst) &&
	      inst.type === convenienceConstructor.type
	    );
	  },
	
	  isDOMComponent: function(inst) {
	    return !!(inst && inst.mountComponent && inst.tagName);
	  },
	
	  isDOMComponentDescriptor: function(inst) {
	    return !!(inst &&
	              ReactDescriptor.isValidDescriptor(inst) &&
	              !!inst.tagName);
	  },
	
	  isCompositeComponent: function(inst) {
	    return typeof inst.render === 'function' &&
	           typeof inst.setState === 'function';
	  },
	
	  isCompositeComponentWithType: function(inst, type) {
	    return !!(ReactTestUtils.isCompositeComponent(inst) &&
	             (inst.constructor === type.type));
	  },
	
	  isCompositeComponentDescriptor: function(inst) {
	    if (!ReactDescriptor.isValidDescriptor(inst)) {
	      return false;
	    }
	    // We check the prototype of the type that will get mounted, not the
	    // instance itself. This is a future proof way of duck typing.
	    var prototype = inst.type.prototype;
	    return (
	      typeof prototype.render === 'function' &&
	      typeof prototype.setState === 'function'
	    );
	  },
	
	  isCompositeComponentDescriptorWithType: function(inst, type) {
	    return !!(ReactTestUtils.isCompositeComponentDescriptor(inst) &&
	             (inst.constructor === type));
	  },
	
	  isTextComponent: function(inst) {
	    return inst instanceof ReactTextComponent.type;
	  },
	
	  findAllInRenderedTree: function(inst, test) {
	    if (!inst) {
	      return [];
	    }
	    var ret = test(inst) ? [inst] : [];
	    if (ReactTestUtils.isDOMComponent(inst)) {
	      var renderedChildren = inst._renderedChildren;
	      var key;
	      for (key in renderedChildren) {
	        if (!renderedChildren.hasOwnProperty(key)) {
	          continue;
	        }
	        ret = ret.concat(
	          ReactTestUtils.findAllInRenderedTree(renderedChildren[key], test)
	        );
	      }
	    } else if (ReactTestUtils.isCompositeComponent(inst)) {
	      ret = ret.concat(
	        ReactTestUtils.findAllInRenderedTree(inst._renderedComponent, test)
	      );
	    }
	    return ret;
	  },
	
	  /**
	   * Finds all instance of components in the rendered tree that are DOM
	   * components with the class name matching `className`.
	   * @return an array of all the matches.
	   */
	  scryRenderedDOMComponentsWithClass: function(root, className) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      var instClassName = inst.props.className;
	      return ReactTestUtils.isDOMComponent(inst) && (
	        instClassName &&
	        (' ' + instClassName + ' ').indexOf(' ' + className + ' ') !== -1
	      );
	    });
	  },
	
	  /**
	   * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactDOMComponent} The one match.
	   */
	  findRenderedDOMComponentWithClass: function(root, className) {
	    var all =
	      ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
	    if (all.length !== 1) {
	      throw new Error('Did not find exactly one match for class:' + className);
	    }
	    return all[0];
	  },
	
	
	  /**
	   * Finds all instance of components in the rendered tree that are DOM
	   * components with the tag name matching `tagName`.
	   * @return an array of all the matches.
	   */
	  scryRenderedDOMComponentsWithTag: function(root, tagName) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      return ReactTestUtils.isDOMComponent(inst) &&
	            inst.tagName === tagName.toUpperCase();
	    });
	  },
	
	  /**
	   * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactDOMComponent} The one match.
	   */
	  findRenderedDOMComponentWithTag: function(root, tagName) {
	    var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
	    if (all.length !== 1) {
	      throw new Error('Did not find exactly one match for tag:' + tagName);
	    }
	    return all[0];
	  },
	
	
	  /**
	   * Finds all instances of components with type equal to `componentType`.
	   * @return an array of all the matches.
	   */
	  scryRenderedComponentsWithType: function(root, componentType) {
	    return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
	      return ReactTestUtils.isCompositeComponentWithType(
	        inst,
	        componentType
	      );
	    });
	  },
	
	  /**
	   * Same as `scryRenderedComponentsWithType` but expects there to be one result
	   * and returns that one result, or throws exception if there is any other
	   * number of matches besides one.
	   * @return {!ReactComponent} The one match.
	   */
	  findRenderedComponentWithType: function(root, componentType) {
	    var all = ReactTestUtils.scryRenderedComponentsWithType(
	      root,
	      componentType
	    );
	    if (all.length !== 1) {
	      throw new Error(
	        'Did not find exactly one match for componentType:' + componentType
	      );
	    }
	    return all[0];
	  },
	
	  /**
	   * Pass a mocked component module to this method to augment it with
	   * useful methods that allow it to be used as a dummy React component.
	   * Instead of rendering as usual, the component will become a simple
	   * <div> containing any provided children.
	   *
	   * @param {object} module the mock function object exported from a
	   *                        module that defines the component to be mocked
	   * @param {?string} mockTagName optional dummy root tag name to return
	   *                              from render method (overrides
	   *                              module.mockTagName if provided)
	   * @return {object} the ReactTestUtils object (for chaining)
	   */
	  mockComponent: function(module, mockTagName) {
	    var ConvenienceConstructor = React.createClass({
	      render: function() {
	        var mockTagName = mockTagName || module.mockTagName || "div";
	        return ReactDOM[mockTagName](null, this.props.children);
	      }
	    });
	
	    copyProperties(module, ConvenienceConstructor);
	    module.mockImplementation(ConvenienceConstructor);
	
	    return this;
	  },
	
	  /**
	   * Simulates a top level event being dispatched from a raw event that occured
	   * on an `Element` node.
	   * @param topLevelType {Object} A type from `EventConstants.topLevelTypes`
	   * @param {!Element} node The dom to simulate an event occurring on.
	   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
	   */
	  simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
	    fakeNativeEvent.target = node;
	    ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(
	      topLevelType,
	      fakeNativeEvent
	    );
	  },
	
	  /**
	   * Simulates a top level event being dispatched from a raw event that occured
	   * on the `ReactDOMComponent` `comp`.
	   * @param topLevelType {Object} A type from `EventConstants.topLevelTypes`.
	   * @param comp {!ReactDOMComponent}
	   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
	   */
	  simulateNativeEventOnDOMComponent: function(
	      topLevelType,
	      comp,
	      fakeNativeEvent) {
	    ReactTestUtils.simulateNativeEventOnNode(
	      topLevelType,
	      comp.getDOMNode(),
	      fakeNativeEvent
	    );
	  },
	
	  nativeTouchData: function(x, y) {
	    return {
	      touches: [
	        {pageX: x, pageY: y}
	      ]
	    };
	  },
	
	  Simulate: null,
	  SimulateNative: {}
	};
	
	/**
	 * Exports:
	 *
	 * - `ReactTestUtils.Simulate.click(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.Simulate.mouseMove(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.Simulate.change(Element/ReactDOMComponent)`
	 * - ... (All keys from event plugin `eventTypes` objects)
	 */
	function makeSimulator(eventType) {
	  return function(domComponentOrNode, eventData) {
	    var node;
	    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
	      node = domComponentOrNode.getDOMNode();
	    } else if (domComponentOrNode.tagName) {
	      node = domComponentOrNode;
	    }
	
	    var fakeNativeEvent = new Event();
	    fakeNativeEvent.target = node;
	    // We don't use SyntheticEvent.getPooled in order to not have to worry about
	    // properly destroying any properties assigned from `eventData` upon release
	    var event = new SyntheticEvent(
	      ReactBrowserEventEmitter.eventNameDispatchConfigs[eventType],
	      ReactMount.getID(node),
	      fakeNativeEvent
	    );
	    mergeInto(event, eventData);
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	
	    ReactUpdates.batchedUpdates(function() {
	      EventPluginHub.enqueueEvents(event);
	      EventPluginHub.processEventQueue();
	    });
	  };
	}
	
	function buildSimulators() {
	  ReactTestUtils.Simulate = {};
	
	  var eventType;
	  for (eventType in ReactBrowserEventEmitter.eventNameDispatchConfigs) {
	    /**
	     * @param {!Element || ReactDOMComponent} domComponentOrNode
	     * @param {?object} eventData Fake event data to use in SyntheticEvent.
	     */
	    ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
	  }
	}
	
	// Rebuild ReactTestUtils.Simulate whenever event plugins are injected
	var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
	EventPluginHub.injection.injectEventPluginOrder = function() {
	  oldInjectEventPluginOrder.apply(this, arguments);
	  buildSimulators();
	};
	var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
	EventPluginHub.injection.injectEventPluginsByName = function() {
	  oldInjectEventPlugins.apply(this, arguments);
	  buildSimulators();
	};
	
	buildSimulators();
	
	/**
	 * Exports:
	 *
	 * - `ReactTestUtils.SimulateNative.click(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseMove(Element/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseIn/ReactDOMComponent)`
	 * - `ReactTestUtils.SimulateNative.mouseOut(Element/ReactDOMComponent)`
	 * - ... (All keys from `EventConstants.topLevelTypes`)
	 *
	 * Note: Top level event types are a subset of the entire set of handler types
	 * (which include a broader set of "synthetic" events). For example, onDragDone
	 * is a synthetic event. Except when testing an event plugin or React's event
	 * handling code specifically, you probably want to use ReactTestUtils.Simulate
	 * to dispatch synthetic events.
	 */
	
	function makeNativeSimulator(eventType) {
	  return function(domComponentOrNode, nativeEventData) {
	    var fakeNativeEvent = new Event(eventType);
	    mergeInto(fakeNativeEvent, nativeEventData);
	    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
	      ReactTestUtils.simulateNativeEventOnDOMComponent(
	        eventType,
	        domComponentOrNode,
	        fakeNativeEvent
	      );
	    } else if (!!domComponentOrNode.tagName) {
	      // Will allow on actual dom nodes.
	      ReactTestUtils.simulateNativeEventOnNode(
	        eventType,
	        domComponentOrNode,
	        fakeNativeEvent
	      );
	    }
	  };
	}
	
	var eventType;
	for (eventType in topLevelTypes) {
	  // Event type is stored as 'topClick' - we transform that to 'click'
	  var convenienceName = eventType.indexOf('top') === 0 ?
	    eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
	  /**
	   * @param {!Element || ReactDOMComponent} domComponentOrNode
	   * @param {?Event} nativeEventData Fake native event to use in SyntheticEvent.
	   */
	  ReactTestUtils.SimulateNative[convenienceName] =
	    makeNativeSimulator(eventType);
	}
	
	module.exports = ReactTestUtils;


/***/ },
/* 237 */,
/* 238 */
/*!**********************************!*\
  !*** ./~/react/lib/ReactLink.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactLink
	 * @typechecks static-only
	 */
	
	"use strict";
	
	/**
	 * ReactLink encapsulates a common pattern in which a component wants to modify
	 * a prop received from its parent. ReactLink allows the parent to pass down a
	 * value coupled with a callback that, when invoked, expresses an intent to
	 * modify that value. For example:
	 *
	 * React.createClass({
	 *   getInitialState: function() {
	 *     return {value: ''};
	 *   },
	 *   render: function() {
	 *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
	 *     return <input valueLink={valueLink} />;
	 *   },
	 *   this._handleValueChange: function(newValue) {
	 *     this.setState({value: newValue});
	 *   }
	 * });
	 *
	 * We have provided some sugary mixins to make the creation and
	 * consumption of ReactLink easier; see LinkedValueUtils and LinkedStateMixin.
	 */
	
	var React = __webpack_require__(/*! ./React */ 2);
	
	/**
	 * @param {*} value current value of the link
	 * @param {function} requestChange callback to request a change
	 */
	function ReactLink(value, requestChange) {
	  this.value = value;
	  this.requestChange = requestChange;
	}
	
	/**
	 * Creates a PropType that enforces the ReactLink API and optionally checks the
	 * type of the value being passed inside the link. Example:
	 *
	 * MyComponent.propTypes = {
	 *   tabIndexLink: ReactLink.PropTypes.link(React.PropTypes.number)
	 * }
	 */
	function createLinkTypeChecker(linkType) {
	  var shapes = {
	    value: typeof linkType === 'undefined' ?
	      React.PropTypes.any.isRequired :
	      linkType.isRequired,
	    requestChange: React.PropTypes.func.isRequired
	  };
	  return React.PropTypes.shape(shapes);
	}
	
	ReactLink.PropTypes = {
	  link: createLinkTypeChecker
	};
	
	module.exports = ReactLink;


/***/ },
/* 239 */
/*!******************************************!*\
  !*** ./~/react/lib/ReactStateSetters.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactStateSetters
	 */
	
	"use strict";
	
	var ReactStateSetters = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(component, funcReturningState) {
	    return function(a, b, c, d, e, f) {
	      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
	      if (partialState) {
	        component.setState(partialState);
	      }
	    };
	  },
	
	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(component, key) {
	    // Memoize the setters.
	    var cache = component.__keySetters || (component.__keySetters = {});
	    return cache[key] || (cache[key] = createStateKeySetter(component, key));
	  }
	};
	
	function createStateKeySetter(component, key) {
	  // Partial state is allocated outside of the function closure so it can be
	  // reused with every call, avoiding memory allocation when this function
	  // is called.
	  var partialState = {};
	  return function stateKeySetter(value) {
	    partialState[key] = value;
	    component.setState(partialState);
	  };
	}
	
	ReactStateSetters.Mixin = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateSetter(function(xValue) {
	   *     return {x: xValue};
	   *   })(1);
	   *
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(funcReturningState) {
	    return ReactStateSetters.createStateSetter(this, funcReturningState);
	  },
	
	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateKeySetter('x')(1);
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(key) {
	    return ReactStateSetters.createStateKeySetter(this, key);
	  }
	};
	
	module.exports = ReactStateSetters;


/***/ },
/* 240 */
/*!*****************************************************!*\
  !*** ./~/react/lib/ReactCSSTransitionGroupChild.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroupChild
	 */
	
	"use strict";
	
	var React = __webpack_require__(/*! ./React */ 2);
	
	var CSSCore = __webpack_require__(/*! ./CSSCore */ 242);
	var ReactTransitionEvents = __webpack_require__(/*! ./ReactTransitionEvents */ 243);
	
	var onlyChild = __webpack_require__(/*! ./onlyChild */ 30);
	
	// We don't remove the element from the DOM until we receive an animationend or
	// transitionend event. If the user screws up and forgets to add an animation
	// their node will be stuck in the DOM forever, so we detect if an animation
	// does not start and if it doesn't, we just call the end listener immediately.
	var TICK = 17;
	var NO_EVENT_TIMEOUT = 5000;
	
	var noEventListener = null;
	
	
	if ("production" !== process.env.NODE_ENV) {
	  noEventListener = function() {
	    console.warn(
	      'transition(): tried to perform an animation without ' +
	      'an animationend or transitionend event after timeout (' +
	      NO_EVENT_TIMEOUT + 'ms). You should either disable this ' +
	      'transition in JS or add a CSS animation/transition.'
	    );
	  };
	}
	
	var ReactCSSTransitionGroupChild = React.createClass({
	  displayName: 'ReactCSSTransitionGroupChild',
	
	  transition: function(animationType, finishCallback) {
	    var node = this.getDOMNode();
	    var className = this.props.name + '-' + animationType;
	    var activeClassName = className + '-active';
	    var noEventTimeout = null;
	
	    var endListener = function() {
	      if ("production" !== process.env.NODE_ENV) {
	        clearTimeout(noEventTimeout);
	      }
	
	      CSSCore.removeClass(node, className);
	      CSSCore.removeClass(node, activeClassName);
	
	      ReactTransitionEvents.removeEndEventListener(node, endListener);
	
	      // Usually this optional callback is used for informing an owner of
	      // a leave animation and telling it to remove the child.
	      finishCallback && finishCallback();
	    };
	
	    ReactTransitionEvents.addEndEventListener(node, endListener);
	
	    CSSCore.addClass(node, className);
	
	    // Need to do this to actually trigger a transition.
	    this.queueClass(activeClassName);
	
	    if ("production" !== process.env.NODE_ENV) {
	      noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
	    }
	  },
	
	  queueClass: function(className) {
	    this.classNameQueue.push(className);
	
	    if (!this.timeout) {
	      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
	    }
	  },
	
	  flushClassNameQueue: function() {
	    if (this.isMounted()) {
	      this.classNameQueue.forEach(
	        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
	      );
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },
	
	  componentWillMount: function() {
	    this.classNameQueue = [];
	  },
	
	  componentWillUnmount: function() {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  },
	
	  componentWillEnter: function(done) {
	    if (this.props.enter) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },
	
	  componentWillLeave: function(done) {
	    if (this.props.leave) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },
	
	  render: function() {
	    return onlyChild(this.props.children);
	  }
	});
	
	module.exports = ReactCSSTransitionGroupChild;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36)))

/***/ },
/* 241 */
/*!****************************************************!*\
  !*** ./~/react/lib/ReactTransitionChildMapping.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @typechecks static-only
	 * @providesModule ReactTransitionChildMapping
	 */
	
	"use strict";
	
	var ReactChildren = __webpack_require__(/*! ./ReactChildren */ 14);
	
	var ReactTransitionChildMapping = {
	  /**
	   * Given `this.props.children`, return an object mapping key to child. Just
	   * simple syntactic sugar around ReactChildren.map().
	   *
	   * @param {*} children `this.props.children`
	   * @return {object} Mapping of key to child
	   */
	  getChildMapping: function(children) {
	    return ReactChildren.map(children, function(child) {
	      return child;
	    });
	  },
	
	  /**
	   * When you're adding or removing children some may be added or removed in the
	   * same render pass. We want ot show *both* since we want to simultaneously
	   * animate elements in and out. This function takes a previous set of keys
	   * and a new set of keys and merges them with its best guess of the correct
	   * ordering. In the future we may expose some of the utilities in
	   * ReactMultiChild to make this easy, but for now React itself does not
	   * directly have this concept of the union of prevChildren and nextChildren
	   * so we implement it here.
	   *
	   * @param {object} prev prev children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @param {object} next next children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @return {object} a key set that contains all keys in `prev` and all keys
	   * in `next` in a reasonable order.
	   */
	  mergeChildMappings: function(prev, next) {
	    prev = prev || {};
	    next = next || {};
	
	    function getValueForKey(key) {
	      if (next.hasOwnProperty(key)) {
	        return next[key];
	      } else {
	        return prev[key];
	      }
	    }
	
	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextKeysPending = {};
	
	    var pendingKeys = [];
	    for (var prevKey in prev) {
	      if (next.hasOwnProperty(prevKey)) {
	        if (pendingKeys.length) {
	          nextKeysPending[prevKey] = pendingKeys;
	          pendingKeys = [];
	        }
	      } else {
	        pendingKeys.push(prevKey);
	      }
	    }
	
	    var i;
	    var childMapping = {};
	    for (var nextKey in next) {
	      if (nextKeysPending.hasOwnProperty(nextKey)) {
	        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	          var pendingNextKey = nextKeysPending[nextKey][i];
	          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
	            pendingNextKey
	          );
	        }
	      }
	      childMapping[nextKey] = getValueForKey(nextKey);
	    }
	
	    // Finally, add the keys which didn't appear before any key in `next`
	    for (i = 0; i < pendingKeys.length; i++) {
	      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	    }
	
	    return childMapping;
	  }
	};
	
	module.exports = ReactTransitionChildMapping;


/***/ },
/* 242 */
/*!********************************!*\
  !*** ./~/react/lib/CSSCore.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */
	
	var invariant = __webpack_require__(/*! ./invariant */ 41);
	
	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */
	
	var CSSCore = {
	
	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSSCore.addClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));
	
	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },
	
	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));
	
	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className
	          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
	          .replace(/\s+/g, ' ') // multiple spaces to one
	          .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },
	
	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function(element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },
	
	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @returns {boolean} true if the element has the class, false if not
	   */
	  hasClass: function(element, className) {
	    ("production" !== process.env.NODE_ENV ? invariant(
	      !/\s/.test(className),
	      'CSS.hasClass takes only a single class name.'
	    ) : invariant(!/\s/.test(className)));
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }
	
	};
	
	module.exports = CSSCore;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 36)))

/***/ },
/* 243 */
/*!**********************************************!*\
  !*** ./~/react/lib/ReactTransitionEvents.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule ReactTransitionEvents
	 */
	
	"use strict";
	
	var ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ 32);
	
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },
	
	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}
	
	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var ReactTransitionEvents = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	module.exports = ReactTransitionEvents;


/***/ }
]);
//# sourceMappingURL=bundle.js.map