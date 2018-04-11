(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("jquery"), require("react-dom"), require("backbone"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "jquery", "react-dom", "backbone", "react"], factory);
	else if(typeof exports === 'object')
		exports["Tilegrid"] = factory(require("underscore"), require("jquery"), require("react-dom"), require("backbone"), require("react"));
	else
		root["Tilegrid"] = factory(root["_"], root["jQuery"], root["ReactDOM"], root["Backbone"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var React;

  React = __webpack_require__(16);

  if (React.PropTypes == null) {
    React.PropTypes = __webpack_require__(17);
  }

  module.exports = React;
}).call(undefined);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      Backbone,
      Tilegrid,
      _,
      jQuery,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  _ = __webpack_require__(0);

  $ = jQuery = __webpack_require__(1);

  Backbone = __webpack_require__(14);

  module.exports = Tilegrid = function () {
    Tilegrid.prototype.$tilegridTemplate = $("<div class=\"tilegrid\">\n    <div class=\"tilegrid-loading\">\n        <div class=\"placeholder fade in\">\n            ... more to come ...\n            &nbsp;\n        </div>\n    </div>\n</div>");

    /* 
      constructs a Tilegrid instance
      
      selector        - jquery compatible selector
      data            - can be an array or a Collection child
      tileTemplate    - can be a selector, jquery obj or html
     */

    function Tilegrid(selector, data, tileTemplate, options) {
      this.selector = selector;
      this.data = data;
      if (options == null) {
        options = {};
      }
      this._renderDerenderedPlaceholder = bind(this._renderDerenderedPlaceholder, this);
      this._derenderTile = bind(this._derenderTile, this);
      this._derenderOutsideTiles = bind(this._derenderOutsideTiles, this);
      this._onTileGridClick = bind(this._onTileGridClick, this);
      this._onResize = bind(this._onResize, this);
      this._onScroll = bind(this._onScroll, this);
      this._onModelRemove = bind(this._onModelRemove, this);
      this._onCollectionAdd = bind(this._onCollectionAdd, this);
      this._onCollectionReset = bind(this._onCollectionReset, this);
      this._loadingInWindow = bind(this._loadingInWindow, this);
      this._endOfData = bind(this._endOfData, this);
      this.tileFor = bind(this.tileFor, this);
      this.findTileAt = bind(this.findTileAt, this);
      this.tileAt = bind(this.tileAt, this);
      this._getTileTemplate = bind(this._getTileTemplate, this);
      this._renderTileTemplate = bind(this._renderTileTemplate, this);
      this.renderTile = bind(this.renderTile, this);
      this.renderTileAt = bind(this.renderTileAt, this);
      this._cloneTileTemplate = bind(this._cloneTileTemplate, this);
      this.appendTile = bind(this.appendTile, this);
      this.getTotalItems = bind(this.getTotalItems, this);
      this._onEnsureComplete = bind(this._onEnsureComplete, this);
      this._renderNextPage = bind(this._renderNextPage, this);
      this.renderAllTiles = bind(this.renderAllTiles, this);
      this._isInViewPort = bind(this._isInViewPort, this);
      this._findTileInViewport = bind(this._findTileInViewport, this);
      this._getTileDims = bind(this._getTileDims, this);
      this._getGridScrollDims = bind(this._getGridScrollDims, this);
      this.getViewingStats = bind(this.getViewingStats, this);
      this.getItemData = bind(this.getItemData, this);
      this._onEnsureRowsComplete = bind(this._onEnsureRowsComplete, this);
      this._ensureViewport = bind(this._ensureViewport, this);
      this._renderViewport = bind(this._renderViewport, this);
      this._renderGrid = bind(this._renderGrid, this);
      this._initializeCollection = bind(this._initializeCollection, this);
      this.updateCollectionViewStats = bind(this.updateCollectionViewStats, this);
      this.getRenderedTiles = bind(this.getRenderedTiles, this);
      this.setActiveTileFor = bind(this.setActiveTileFor, this);
      this.setActiveTile = bind(this.setActiveTile, this);
      this.getActiveTile = bind(this.getActiveTile, this);
      this.setTileTemplate = bind(this.setTileTemplate, this);
      this.focus = bind(this.focus, this);
      this.render = bind(this.render, this);
      this.refresh = bind(this.refresh, this);
      this.reset = bind(this.reset, this);
      this.destroy = bind(this.destroy, this);
      this.initialize = bind(this.initialize, this);
      this.options = _.defaults(options, {
        pageSize: 50,
        preloadCushion: 400,
        ignoreViewport: false,
        hideFunction: null,
        tileWrapperClassNames: ""
      });
      this.setTileTemplate(tileTemplate);
      if (!(_.isArray(this.data) || this.data instanceof Backbone.Collection)) {
        throw "Tilegrid expects @data constructor arg to be either and array or a Collection";
      }
      this.debouncedRefresh = _.debounce(this.refresh, 0);
      this.debouncedRender = _.debounce(this.render, 0);
      this.initialize();
    }

    Tilegrid.prototype.initialize = function () {
      var ref, ref1;
      this.$element = $(this.selector);
      _.extend(this, Backbone.Events);
      if (!(((ref = this.$element) != null ? ref.length : void 0) > 0)) {
        throw "Dev: error: " + this.$element.selector + " not found in DOM";
      }
      this._initializeCollection();
      this._renderGrid();
      this.reset();
      this.render();
      return (ref1 = this.$tilegrid) != null ? ref1.data('tilegrid', this) : void 0;
    };

    Tilegrid.prototype.destroy = function () {
      var ref;
      return (ref = this.$tilegrid) != null ? ref.data('tilegrid', null) : void 0;
    };

    Tilegrid.prototype.reset = function (options) {
      var i, len, ref, tileEl, totalItems;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        soft: false
      });
      this._$tilesByModelId = {};
      if (options.soft) {
        ref = this.$element.find('.tile');
        for (i = 0, len = ref.length; i < len; i++) {
          tileEl = ref[i];
          this._derenderTile($(tileEl));
        }
      } else {
        this.lastAppendedIndex = -1;
        this.$element.find('.tile').remove();
      }
      totalItems = this.getTotalItems();
      if (totalItems > 0 && totalItems > this.lastAppendedIndex + 1) {
        this.$loadingIndicator.show();
      }
      return this;
    };

    Tilegrid.prototype.refresh = function () {
      this.reset({
        soft: true
      });
      return this._ensureViewport();
    };

    Tilegrid.prototype.render = function () {
      this._renderViewport();
      return this;
    };

    Tilegrid.prototype.focus = function () {
      var base;
      if (this.selections != null) {
        return typeof (base = this.selections).focus === "function" ? base.focus() : void 0;
      } else {
        return _.delay(function (_this) {
          return function () {
            return _this.$tilegrid.focus();
          };
        }(this), 100);
      }
    };

    Tilegrid.prototype.setTileTemplate = function (tileTemplate1) {
      this.tileTemplate = tileTemplate1;
      this.$tileTemplate = $(this.tileTemplate);
      if (this.$tileTemplate.length <= 0) {
        throw "dev error: Invalid template in TileGrid construction:<br>" + tileTemplate;
      }
    };

    Tilegrid.prototype.getActiveTile = function () {
      var ref;
      return (ref = this.selections) != null ? typeof ref.getActiveTile === "function" ? ref.getActiveTile() : void 0 : void 0;
    };

    Tilegrid.prototype.setActiveTile = function (index) {
      var ref;
      return (ref = this.selections) != null ? typeof ref.setActiveTile === "function" ? ref.setActiveTile(index) : void 0 : void 0;
    };

    Tilegrid.prototype.setActiveTileFor = function (model) {
      var $tile, index, ref;
      if (model == null) {
        return null;
      }
      $tile = this.tileFor(model);
      if (!(($tile != null ? $tile.length : void 0) > 0)) {
        return null;
      }
      index = $tile.data('index');
      if (index == null) {
        throw "dev: unexpected: tile for model " + model.id + " has no index attribute";
      }
      if ((ref = this.selections) != null) {
        ref.setActiveTile(index);
      }
      return $tile;
    };

    Tilegrid.prototype.getRenderedTiles = function () {
      return _.values(this._$tilesByModelId);
    };

    Tilegrid.prototype.updateCollectionViewStats = function (stats) {
      var base, totalRows;
      if (this.collection == null) {
        return;
      }
      totalRows = this.getTotalItems();
      if (totalRows <= 0) {
        _.extend(stats, {
          topDisplayIndex: 0,
          bottomDisplayIndex: 0
        });
      }
      if (this.collection.hasStats) {
        return this.collection.updateStats(stats);
      } else {
        this.collection.topDisplayIndex = stats.topDisplayIndex;
        this.collection.bottomDisplayIndex = stats.bottomDisplayIndex;
        return typeof (base = this.collection).trigger === "function" ? base.trigger('viewStatsChanged') : void 0;
      }
    };

    Tilegrid.prototype._initializeCollection = function () {
      if (this.data instanceof Backbone.Collection) {
        this.collection || (this.collection = this.data);
      }
      if (this.collection != null) {
        this.collection.on('reset', this._onCollectionReset);
        return this.collection.on('add', this._onCollectionAdd);
      }
    };

    Tilegrid.prototype._renderGrid = function () {
      if (this.$tilegrid && this.$tilegrid.length > 0) {
        return this.$tilegrid;
      }
      this.$tilegrid = this.$tilegridTemplate.clone();
      this.$element.html(this.$tilegrid);
      this.$loadingIndicator = this.$element.find('.tilegrid-loading');
      if (!this.options.ignoreViewport) {
        this._debouncedOnScroll = _.debounce(this._onScroll, 500);
        this._debouncedOnResize = _.debounce(this._onResize, 100);
        this.$tilegrid.on('scroll', this._debouncedOnScroll);
        this.$tilegrid.on('resize', this._debouncedOnResize);
      }
      this.$tilegrid.on('click', this._onTilegridClick);
      return this.$tilegrid;
    };

    Tilegrid.prototype._renderViewport = function () {
      if (this.collection == null) {
        this._endOfData();
        return;
      }
      if (this._loadingInWindow()) {
        return this._renderNextPage({
          success: function (_this) {
            return function () {
              return _.defer(_this._renderViewport);
            };
          }(this)
        });
      } else {
        return this._ensureViewport();
      }
    };

    Tilegrid.prototype._ensureViewport = function () {
      var bottomIndex, topIndex, viewStats;
      if (this.options.ignoreViewport) {
        return;
      }
      viewStats = this.getViewingStats();
      topIndex = viewStats.topDisplayIndex;
      bottomIndex = viewStats.bottomDisplayIndex;
      if (!(topIndex != null && bottomIndex != null)) {
        return;
      }
      this.updateCollectionViewStats({
        topDisplayIndex: topIndex + 1,
        bottomDisplayIndex: bottomIndex + 1
      });
      this.topRenderIndex = Math.max(topIndex - this.options.pageSize, 0);
      this.bottomRenderIndex = (bottomIndex || 0) + this.options.pageSize;
      if (this.collection != null && _.isFunction(this.collection.ensureRows)) {
        return this.collection.ensureRows(this.topRenderIndex, this.bottomRenderIndex, {
          complete: this._onEnsureRowsComplete
        });
      } else {
        return this._onEnsureRowsComplete();
      }
    };

    Tilegrid.prototype._onEnsureRowsComplete = function () {
      var $nextTile, $tile, index, model;
      $tile = this.findTileAt(this.topRenderIndex);
      index = this.topRenderIndex;
      while (true) {
        if (!($tile && $tile.length > 0)) {
          break;
        }
        if (index != null) {
          model = this.getItemData(index);
        }
        $nextTile = $tile.next('.tile');
        if (model != null) {
          this.renderTile($tile, model);
        } else {
          $tile.remove();
        }
        $tile = $nextTile;
        if ((index += 1) > this.bottomRenderIndex) {
          break;
        }
      }
      return this._derenderOutsideTiles(this.topRenderIndex, this.bottomRenderIndex);
    };

    Tilegrid.prototype.getItemData = function (index) {
      var ref, ref1;
      return ((ref = this.collection) != null ? typeof ref.getItem === "function" ? ref.getItem(index, {
        warn: true
      }) : void 0 : void 0) || ((ref1 = this.collection) != null ? ref1.models[index] : void 0) || this.data[index];
    };

    Tilegrid.prototype.getViewingStats = function () {
      var $bottomTile, $next, $prev, $topTile, $visibleTile, gridScrollDims;
      gridScrollDims = this._getGridScrollDims();
      $visibleTile = this._findTileInViewport(gridScrollDims);
      $topTile = $bottomTile = $visibleTile;
      if (!(($visibleTile != null ? $visibleTile.length : void 0) > 0)) {
        return {
          topDisplayIndex: 0,
          bottomDisplayIndex: 0
        };
      }
      while (true) {
        $prev = $topTile.prev('.tile');
        if ($prev.length <= 0 || !this._isInViewPort(this._getTileDims($prev), gridScrollDims)) {
          break;
        }
        $topTile = $prev;
      }
      while (true) {
        $next = $bottomTile.next('.tile');
        if ($next.length <= 0 || !this._isInViewPort(this._getTileDims($next), gridScrollDims)) {
          break;
        }
        $bottomTile = $next;
      }
      return {
        topDisplayIndex: $topTile.data('index'),
        bottomDisplayIndex: $bottomTile.data('index')
      };
    };

    Tilegrid.prototype._getGridScrollDims = function () {
      var gridLeft, gridOffset, gridTop, h, w;
      gridOffset = this.$tilegrid.offset();
      gridTop = this.$tilegrid.scrollTop();
      gridLeft = this.$tilegrid.scrollLeft();
      h = this.$tilegrid.height();
      w = this.$tilegrid.width();
      return {
        top: gridTop + gridOffset.top,
        left: gridLeft + gridOffset.left,
        bottom: gridTop + gridOffset.top + h,
        right: gridLeft + gridOffset.left + w,
        height: h,
        width: w,
        gridOffsetTop: gridOffset.top,
        gridOffsetLeft: gridOffset.left
      };
    };

    Tilegrid.prototype._getTileDims = function ($tile) {
      var tilePosition;
      tilePosition = $tile.offset();
      _.extend(tilePosition, {
        bottom: tilePosition.top + $tile.height(),
        right: tilePosition.left + $tile.width()
      });
      return tilePosition;
    };

    Tilegrid.prototype._findTileInViewport = function (gridScrollDims) {
      var $tile, $tiles, absHalf, half, lastOffset, offset, tileDims;
      if (gridScrollDims == null) {
        gridScrollDims = this._getGridScrollDims();
      }
      $tiles = this.$tilegrid.find('.tile');
      $tile = null;
      half = Math.floor($tiles.length / 2);
      lastOffset = 0;
      while ((absHalf = Math.abs(half)) >= 2) {
        offset = Math.min(Math.max(0, lastOffset + half), $tiles.length - 1);
        $tile = $($tiles[offset]);
        if ($tile.length <= 0) {
          break;
        }
        tileDims = this._getTileDims($tile);
        if (this._isInViewPort(tileDims, gridScrollDims)) {
          break;
        }
        half = Math.floor(absHalf / 2);
        if (tileDims.left > gridScrollDims.gridOffsetLeft + gridScrollDims.width || tileDims.top > gridScrollDims.gridOffsetTop + gridScrollDims.height) {
          half *= -1;
        }
        lastOffset = offset;
      }
      return $tile;
    };

    Tilegrid.prototype._isInViewPort = function (tileDims, gridScrollDims) {
      var horzVisible, vertVisible;
      if (gridScrollDims == null) {
        gridScrollDims = this._getGridScrollDims();
      }
      horzVisible = tileDims.right > gridScrollDims.gridOffsetLeft && tileDims.left < gridScrollDims.gridOffsetLeft + gridScrollDims.width;
      vertVisible = tileDims.bottom > gridScrollDims.gridOffsetTop && tileDims.top < gridScrollDims.gridOffsetTop + gridScrollDims.height;
      return horzVisible && vertVisible;
    };

    Tilegrid.prototype.renderAllTiles = function (options) {
      var i, len, model, ref, ref1, results;
      if (options == null) {
        options = {};
      }
      this.lastAppendedIndex = -1;
      ref1 = ((ref = this.collection) != null ? ref.models : void 0) || this.data;
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        model = ref1[i];
        results.push(this.appendTile());
      }
      return results;
    };

    Tilegrid.prototype._renderNextPage = function (options) {
      var first, last;
      if (options == null) {
        options = {};
      }
      first = this.lastAppendedIndex + 1;
      last = first + this.options.pageSize;
      this.lastFirst = first;
      if (this.collection != null && _.isFunction(this.collection.ensureRows)) {
        return this.collection.ensureRows(first, last, {
          complete: this._onEnsureComplete
        });
      } else {
        return this._onEnsureComplete(first, last);
      }
    };

    Tilegrid.prototype._onEnsureComplete = function (first, last, options) {
      var appendTileDidFail, i, index, ref, ref1;
      if (options == null) {
        options = {};
      }
      if (last > this.lastAppendedIndex) {
        for (index = i = ref = this.lastAppendedIndex + 1, ref1 = last; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
          if (index >= this.getTotalItems()) {
            break;
          }
          appendTileDidFail = !this.appendTile();
          if (appendTileDidFail) {
            break;
          }
        }
      }
      if (index >= this.getTotalItems()) {
        this._endOfData();
      }
      return typeof options.success === "function" ? options.success() : void 0;
    };

    Tilegrid.prototype.getTotalItems = function () {
      var ref, ref1;
      if (this.collection == null) {
        return 0;
      }
      return ((ref = this.collection) != null ? typeof ref.getLength === "function" ? ref.getLength() : void 0 : void 0) || ((ref1 = this.collection) != null ? ref1.length : void 0) || this.data.length;
    };

    Tilegrid.prototype.appendTile = function () {
      var $tile, index, model;
      index = this.lastAppendedIndex + 1;
      model = this.getItemData(index);
      if (model == null) {
        return false;
      }
      this.lastAppendedIndex = index;
      $tile = this._cloneTileTemplate(model, this.options);
      $tile.attr('data-index', this.lastAppendedIndex);
      this.$loadingIndicator.before($tile);
      this.renderTile($tile, model);
      return true;
    };

    Tilegrid.prototype._cloneTileTemplate = function (model, options) {
      if (options == null) {
        options = {};
      }
      return this.$tileTemplate.clone();
    };

    Tilegrid.prototype.renderTileAt = function (index) {
      var $tile, model;
      $tile = this.tileAt(index);
      model = this.getItemData(index);
      if ($tile && model) {
        return this.renderTile($tile, model);
      }
    };

    Tilegrid.prototype.renderTile = function ($tile, model) {
      $tile.addClass("rendered");
      this._$tilesByModelId[model.id] = $tile;
      model.on("remove", this._onModelRemove);
      this._renderTileTemplate($tile, model);
      $tile.removeAttr('style');
      $tile.toggleClass("selected", model.selected === true);
      $tile.attr('data-id', model.id);
      if ($tile.hasClass('underscore-tile')) {
        this.underscroreTemplate || (this.underscroreTemplate = _.template(this.tileTemplate));
        $tile.html(this.underscroreTemplate(model.attributes));
      }
      if (this.options.hideFunction && this.options.hideFunction(model)) {
        $tile.addClass('hidden');
      }
      return this.trigger('tileRendered', $tile, model);
    };

    Tilegrid.prototype._renderTileTemplate = function ($tile, model) {
      return $tile.html(this._getTileTemplate($tile, model));
    };

    Tilegrid.prototype._getTileTemplate = function ($tile, model) {
      return this.$tileTemplate.html();
    };

    Tilegrid.prototype.tileAt = function (index) {
      return this._$tilesByModelId[this.getItemData(index).id];
    };

    Tilegrid.prototype.findTileAt = function (index) {
      return this.$tilegrid.find("> .tile[data-index='" + index + "']");
    };

    Tilegrid.prototype.tileFor = function (model) {
      var key;
      key = model.id || model;
      return this._$tilesByModelId[key];
    };

    Tilegrid.prototype._endOfData = function (options) {
      if (options == null) {
        options = {};
      }
      return this.$loadingIndicator.hide();
    };

    Tilegrid.prototype._loadingInWindow = function () {
      var inWindow, loadingLeft, loadingTop, outerHeight, outerWidth, scrollBottom, scrollHeight, scrollLeft, scrollRight, scrollTop, scrollWidth;
      if (!(this.$element.is(':visible') && this.$loadingIndicator.is(':visible'))) {
        return false;
      }
      outerHeight = this.$element.outerHeight();
      outerWidth = this.$element.outerWidth();
      if (outerHeight > 5000) {
        console.error("dev error: the outer height of the .tilegrid element for " + this.selector + " is saying it's outer height " + "is greater that 5000.  You need to set the height to something other than auto. ");
        scrollHeight = 5000;
      } else {
        scrollHeight = outerHeight;
      }
      scrollWidth = outerWidth > 5000 ? 5000 : outerWidth;
      scrollTop = this.$element.scrollTop();
      scrollLeft = this.$element.scrollLeft();
      scrollBottom = scrollTop + scrollHeight;
      scrollRight = scrollLeft + scrollWidth;
      loadingTop = this.$loadingIndicator.position().top;
      loadingLeft = this.$loadingIndicator.position().left;
      inWindow = loadingTop < scrollBottom + this.options.preloadCushion && loadingLeft < scrollRight + this.options.preloadCushion;
      return inWindow;
    };

    Tilegrid.prototype._onCollectionReset = function () {
      this.reset();
      return this.render();
    };

    Tilegrid.prototype._onCollectionAdd = function () {
      return this.debouncedRender();
    };

    Tilegrid.prototype._onModelRemove = function (model) {
      var $tile;
      model.off("remove", this._onModelRemove);
      $tile = this._$tilesByModelId[model.id];
      return this._derenderTile($tile);
    };

    Tilegrid.prototype._onScroll = function () {
      return this._renderViewport();
    };

    Tilegrid.prototype._onResize = function () {
      return this._renderViewport();
    };

    Tilegrid.prototype._onTileGridClick = function (evt) {
      return evt.preventDefault();
    };

    Tilegrid.prototype._derenderOutsideTiles = function (topTileIndex, bottomTileIndex) {
      var $tile, bottomAcceptable, i, index, len, numInView, ref, results, tile, topAcceptable;
      numInView = bottomTileIndex - topTileIndex;
      ref = this.$element.find('.tile.rendered');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        tile = ref[i];
        $tile = $(tile);
        index = $tile.data('index');
        topAcceptable = topTileIndex;
        bottomAcceptable = bottomTileIndex;
        if (index >= topAcceptable && index <= bottomAcceptable) {
          continue;
        }
        results.push(this._derenderTile($tile));
      }
      return results;
    };

    Tilegrid.prototype._derenderTile = function ($tile) {
      var modelId, zform;
      if (!($tile && $tile.length > 0)) {
        return;
      }
      $tile.css({
        height: $tile.height(),
        width: $tile.width()
      });
      this._renderDerenderedPlaceholder($tile);
      $tile.removeClass("rendered");
      $tile.removeClass("selected");
      modelId = $tile.data('id');
      if (modelId == null) {
        return;
      }
      $tile.removeAttr('data-id', null);
      delete this._$tilesByModelId[modelId];
      zform = $tile.data('zform');
      if (zform != null) {
        return zform.destroy();
      }
    };

    Tilegrid.prototype._renderDerenderedPlaceholder = function ($tile) {
      return $tile.html("<div class='placeholder'>. . .</div>");
    };

    return Tilegrid;
  }();
}).call(undefined);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(4);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      SelectableCollection,
      SingleSelect,
      _,
      jQuery,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  _ = __webpack_require__(0);

  $ = jQuery = __webpack_require__(1);

  SelectableCollection = __webpack_require__(24);

  __webpack_require__(25);

  /*
    This class implements the methods necessary to connect selections in a Tilegrid widget to a Collection with the
    SelectableCollection mixin.
  
    This is the implementation of a single select strategy for Tilegrid.  Clicking a tile selects the
    corresponding model in the collection throuh selectableCollection#selectModel interfaces.
  
    See widgets.tilegrid.MultiSelect for a multiselect strategy that supports selecting multiple models
    and clicking and dragging to select multiple models.
  
    Usage:  simply construct an instance of this class any time after constructing a Tilegrid and pass the tilegrid
    instance to SingleSelect constructor:
  
      new SingleSelect(@tilegrid)
  
    **Note for React users**: this class is initialized by the selection='single' prop on <Rb.Tilegrid>
  
    Note that constructing this class on a Tilegrid with a collection will cause the selectableCollection
    mixin to be added to the collection.  See mixins/SelectableCollection
   */

  module.exports = SingleSelect = function () {
    function SingleSelect(tilegrid, options) {
      this.tilegrid = tilegrid;
      if (options == null) {
        options = {};
      }
      this._scrollIntoView = bind(this._scrollIntoView, this);
      this._getTileFromEvent = bind(this._getTileFromEvent, this);
      this._getIndexFromEvent = bind(this._getIndexFromEvent, this);
      this._getSameTileOnRelativeRow = bind(this._getSameTileOnRelativeRow, this);
      this._getSameIndexOnRelativeRow = bind(this._getSameIndexOnRelativeRow, this);
      this._onRightArrow = bind(this._onRightArrow, this);
      this._onLeftArrow = bind(this._onLeftArrow, this);
      this._onPageUp = bind(this._onPageUp, this);
      this._onPageDown = bind(this._onPageDown, this);
      this._onUpArrow = bind(this._onUpArrow, this);
      this._onDownArrow = bind(this._onDownArrow, this);
      this._onKeydown = bind(this._onKeydown, this);
      this._getKeymap = bind(this._getKeymap, this);
      this._onSelectAll = bind(this._onSelectAll, this);
      this._onSelectionsChanged = bind(this._onSelectionsChanged, this);
      this._onTileMouseUp = bind(this._onTileMouseUp, this);
      this._onTileMouseDown = bind(this._onTileMouseDown, this);
      this._onFocusSinkFocus = bind(this._onFocusSinkFocus, this);
      this._initializeKeyboard = bind(this._initializeKeyboard, this);
      this._initializeCollection = bind(this._initializeCollection, this);
      this._initializeTilegrid = bind(this._initializeTilegrid, this);
      this.focus = bind(this.focus, this);
      this.getNextTile = bind(this.getNextTile, this);
      this.getPreviousTile = bind(this.getPreviousTile, this);
      this.updateTileStates = bind(this.updateTileStates, this);
      this.setActiveTile = bind(this.setActiveTile, this);
      this.getActiveTile = bind(this.getActiveTile, this);
      this.resetActiveTile = bind(this.resetActiveTile, this);
      this.selectNone = bind(this.selectNone, this);
      this.selectToggle = bind(this.selectToggle, this);
      this.selectOnlyOne = bind(this.selectOnlyOne, this);
      this.selectOne = bind(this.selectOne, this);
      this.initialize = bind(this.initialize, this);
      this.options = _.defaults(options, {
        selectOneOnSelected: true,
        scrollElement: this.tilegrid.$element,
        scrollOptions: {
          duration: 0,
          cushion: {
            top: 40,
            bottom: 40
          }
        }
      });
      this.collection = this.tilegrid.collection;
      if (!this.collection.hasSelectableCollectionMixin) {
        SelectableCollection.applyTo(this.collection);
      }
      this.initialize();
    }

    SingleSelect.prototype.initialize = function () {
      this._initializeTilegrid();
      this._initializeCollection();
      this._initializeKeyboard();
      return this;
    };

    SingleSelect.prototype.selectOne = function (index, selected, options) {
      if (selected == null) {
        selected = true;
      }
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        silent: false,
        active: true
      });
      if (selected === true && options.active) {
        return this.setActiveTile(index);
      } else {
        return this.collection.selectModelByIndex(index, selected, options);
      }
    };

    SingleSelect.prototype.selectOnlyOne = function (index) {
      if (!(index != null && index >= 0)) {
        return;
      }
      this.selectNone();
      return this.selectOne(index);
    };

    SingleSelect.prototype.selectToggle = function (index) {
      return this.selectOne(index, 'toggle');
    };

    SingleSelect.prototype.selectNone = function () {
      this.collection.selectNone();
      return this.resetActiveTile();
    };

    SingleSelect.prototype.resetActiveTile = function () {
      return this.setActiveTile(null);
    };

    SingleSelect.prototype.getActiveTile = function () {
      return this.tilegrid.$element.find('.tile.active');
    };

    SingleSelect.prototype.setActiveTile = function (index) {
      var $newActive, $prevActive;
      $prevActive = this.getActiveTile();
      $newActive = null;
      if (index != null) {
        $newActive = this.tilegrid.findTileAt(index);
        if ($newActive && $newActive.length > 0 && !$newActive.is($prevActive)) {
          this._scrollIntoView($newActive, $newActive.closest(':hasScroll'), this.options.scrollOptions);
        }
      }
      if ($prevActive && !$newActive || !$prevActive && $newActive || !($newActive != null ? $newActive.is($prevActive) : void 0)) {
        this.collection.setActiveIndex(index);
        if (index != null) {
          this.collection.selectModelByIndex(index);
        }
        this.tilegrid.trigger('activeTileChanged', $newActive, $prevActive);
      }
      this.updateTileStates($prevActive);
      this.updateTileStates($newActive);
      return $newActive;
    };

    SingleSelect.prototype.updateTileStates = function ($tile) {
      var model;
      if ($tile == null) {
        return;
      }
      model = this.collection.get($tile.attr('data-id'));
      if (model == null) {
        return;
      }
      $tile.toggleClass('selected', model.selected);
      return $tile.toggleClass('active', model.active);
    };

    SingleSelect.prototype.getPreviousTile = function () {
      return this.getActiveTile().prevAll('.tile:visible').first();
    };

    SingleSelect.prototype.getNextTile = function () {
      return this.getActiveTile().nextAll('.tile:visible').first();
    };

    SingleSelect.prototype.focus = function () {
      return this.$focusSink.focus();
    };

    SingleSelect.prototype._initializeTilegrid = function () {
      this.tilegrid.$element.on("mousedown.SingleSelect", ".tile", this._onTileMouseDown);
      this.tilegrid.$element.on("mouseup.SingleSelect", ".tile", this._onTileMouseUp);
      return this.tilegrid.selections = this;
    };

    SingleSelect.prototype._initializeCollection = function () {
      this.collection.on('selectionsChanged', this._onSelectionsChanged);
      return this.collection.on('selectAll', this._onSelectAll);
    };

    SingleSelect.prototype._initializeKeyboard = function () {
      this.tilegrid.$element.on("click", this.focus);
      this.$focusSink = $("<input class=\"tilegrid-focus-sink\" type=\"text\">");
      this.tilegrid.$element.prepend(this.$focusSink);
      this.$focusSink.on('keydown', this._onKeydown);
      return this.$focusSink.on('focus', this._onFocusSinkFocus);
    };

    SingleSelect.prototype._onFocusSinkFocus = function () {};

    SingleSelect.prototype._onTileMouseDown = function (evt) {
      var index, ref;
      evt.preventDefault();
      if ($(evt.target).closest(".tile").hasClass('no-select')) {
        return;
      }
      index = this._getIndexFromEvent(evt);
      if (this.options.selectOneOnSelected) {
        if (!((ref = this.tilegrid.tileAt(index)) != null ? ref.hasClass('active') : void 0)) {
          return this.selectOnlyOne(index);
        }
      } else {
        this.setActiveTile(index);
        return this.collection.trigger('selectedClicked', index, evt);
      }
    };

    SingleSelect.prototype._onTileMouseUp = function (evt) {};

    SingleSelect.prototype._onSelectionsChanged = function () {
      var $tile, i, len, model, modelIndex, results, selectedModels;
      selectedModels = this.collection.getSelectedModels();
      this.tilegrid.$element.find('>.tilegrid>.tile.selected').removeClass('selected');
      if (selectedModels.length <= 0) {
        return this.resetActiveTile();
      } else {
        results = [];
        for (i = 0, len = selectedModels.length; i < len; i++) {
          model = selectedModels[i];
          modelIndex = model.index != null ? model.index : this.collection.indexOf(model);
          $tile = this.tilegrid.$element.find(">.tilegrid>.tile[data-index='" + modelIndex + "']");
          $tile.addClass('selected');
          results.push($tile.toggleClass('active', model.active));
        }
        return results;
      }
    };

    SingleSelect.prototype._onSelectAll = function () {
      return this.setActiveTile(0);
    };

    SingleSelect.prototype._getKeymap = function () {
      return {
        40: this._onDownArrow,
        38: this._onUpArrow,
        33: this._onPageUp,
        34: this._onPageDown,
        37: this._onLeftArrow,
        39: this._onRightArrow
      };
    };

    SingleSelect.prototype._onKeydown = function (evt) {
      var base, name;
      return typeof (base = this._getKeymap())[name = evt.keyCode] === "function" ? base[name](evt) : void 0;
    };

    SingleSelect.prototype._onDownArrow = function (evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(1));
    };

    SingleSelect.prototype._onUpArrow = function (evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-1));
    };

    SingleSelect.prototype._onPageDown = function (evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(5));
    };

    SingleSelect.prototype._onPageUp = function (evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-5));
    };

    SingleSelect.prototype._onLeftArrow = function (evt) {
      return this.selectOnlyOne(this.getPreviousTile().data('index'));
    };

    SingleSelect.prototype._onRightArrow = function (evt) {
      return this.selectOnlyOne(this.getNextTile().data('index'));
    };

    SingleSelect.prototype._getSameIndexOnRelativeRow = function (nRows) {
      var ref;
      return (ref = this._getSameTileOnRelativeRow(nRows)) != null ? ref.data('index') : void 0;
    };

    SingleSelect.prototype._getSameTileOnRelativeRow = function (nRows) {
      var $active, $n, $next, activeBottom, activeHeight, activeLeft, activeRight, activeTop, activeWidth, nBottom, nHeight, nLeft, nRight, nTop, nWidth, rowsToTraverse;
      $active = this.tilegrid.$element.find('.tile.active');
      if (nRows === 0) {
        return $active;
      }
      $next = $active;
      rowsToTraverse = Math.abs(nRows);
      while (true) {
        if (nRows > 0) {
          $n = $next.nextAll('.tile:visible').first();
        } else {
          $n = $next.prevAll('.tile:visible').first();
        }
        if ($n.length <= 0) {
          break;
        }
        nHeight = $n.height();
        nWidth = $n.width();
        nTop = $n.position().top;
        nBottom = nTop + nHeight;
        nLeft = $n.position().left;
        nRight = nLeft + nWidth;
        activeHeight = $active.height();
        activeWidth = $active.width();
        activeTop = $active.position().top;
        activeBottom = activeTop + activeHeight;
        activeLeft = $active.position().left;
        activeRight = activeLeft + activeWidth;
        if (nRows > 0 && nTop > activeBottom && (nLeft >= activeLeft || nRight >= activeRight) || nRows < 0 && nTop < activeTop && (nLeft <= activeLeft || nRight <= activeRight)) {
          $active = $n;
          rowsToTraverse -= 1;
        }
        $next = $n;
        if (rowsToTraverse <= 0) {
          break;
        }
      }
      return $next;
    };

    SingleSelect.prototype._getIndexFromEvent = function (evt) {
      var $tile, index;
      $tile = this._getTileFromEvent(evt);
      if (!$tile) {
        return -1;
      }
      index = $tile.data('index');
      if (index == null) {
        throw "dev: error: invalid tile found in tilegrid, no data-index attribute";
      }
      return index;
    };

    SingleSelect.prototype._getTileFromEvent = function (evt) {
      var $target, $tile;
      $target = $(evt.target);
      $tile = $target.closest('.tile');
      if ($tile.length <= 0) {
        console.warn("dev: error: _getIndexFromEvent unable to find .tile for " + $target.selector);
        return null;
      }
      return $tile;
    };

    SingleSelect.prototype._scrollIntoView = function ($tile, $parent, options) {
      var $tileHeight, $tileLeft, $tileTop, $tileWidth, attrs, isAbove, isBelow, isLeft, isRight, parentHeight, parentLeft, parentScrollTop, parentTop, parentWidth;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        cushion: {},
        duration: 100,
        alwaysAtTop: false,
        top: null,
        left: null,
        height: null,
        width: null
      });
      if (!(($parent != null ? $parent.length : void 0) > 0 && !$parent.is($(document)))) {
        return;
      }
      options.cushion = _.defaults(options.cushion, {
        left: 10,
        right: 10,
        top: 10,
        bottom: 15
      });
      $tileTop = options.top || $tile.position().top;
      $tileLeft = options.left || $tile.position().left;
      $tileHeight = options.height || $tile.outerHeight();
      $tileWidth = options.width || $tile.outerWidth();
      parentScrollTop = $parent.scrollTop();
      parentTop = options.parentTop || parentScrollTop;
      parentLeft = $parent.scrollLeft();
      parentHeight = $parent.outerHeight();
      parentWidth = $parent.outerWidth();
      isAbove = $tileTop - options.cushion.top < 0;
      isBelow = $tileTop + $tileHeight + options.cushion.bottom > parentHeight;
      isLeft = $tileLeft - options.cushion.left < 0;
      isRight = $tileLeft + $tileWidth + options.cushion.right > parentWidth;
      attrs = {};
      if (isAbove || options.alwaysAtTop) {
        attrs.scrollTop = Math.max(parentTop + $tileTop - options.cushion.top, 0);
      } else if (isBelow) {
        attrs.scrollTop = parentScrollTop + $tileTop + $tileHeight + options.cushion.bottom - parentHeight;
      }
      if (isLeft) {
        attrs.scrollLeft = parentLeft + $tileLeft - options.cushion.left;
      } else if (isRight) {
        attrs.scrollLeft = $tileLeft + $tileWidth + options.cushion.right - parentWidth;
      }
      if (_.keys(attrs).length <= 0) {
        return;
      }
      if (options.duration > 0) {
        $parent.animate(attrs, options.duration, "linear");
      } else {
        if (attrs.scrollTop != null) {
          $parent.scrollTop(attrs.scrollTop);
        }
        if (attrs.scrollLeft != null) {
          $parent.scrollLeft(attrs.scrollLeft);
        }
      }
      return $tile;
    };

    return SingleSelect;
  }();
}).call(undefined);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      MultiSelect,
      SingleSelect,
      _,
      jQuery,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  $ = jQuery = __webpack_require__(1);

  _ = __webpack_require__(0);

  SingleSelect = __webpack_require__(10);

  /*
    This class implements the methods necessary to connect a Tilegrid widget to a Collection with the
    SelectableCollection mixin and provides a multi select strategy for Tilegrid.
  
    Clicking a tile selects the corresponding model in the collection throuh selectableCollection#selectModel...
    interfaces.  Clicking and draging selects all models between the drag start and drag end tile.
  
    - Holding down the command toggles rows to the selected.
    - Holding down the shift key extends the selection from the active cell to the clicked cell
    - Dragging always extends away and back to the first row selected in the drag operation
  
    Usage:  simply construct an instance of this class any time after constructing a Tilegrid and pass the tilegrid
    instance to MultiSelect constructor:
  
      new MultiSelect(@tilegrid)
   */

  module.exports = MultiSelect = function (superClass) {
    extend(MultiSelect, superClass);

    function MultiSelect() {
      this._whichMethod = bind(this._whichMethod, this);
      this._onRightArrow = bind(this._onRightArrow, this);
      this._onLeftArrow = bind(this._onLeftArrow, this);
      this._onPageUp = bind(this._onPageUp, this);
      this._onPageDown = bind(this._onPageDown, this);
      this._onUpArrow = bind(this._onUpArrow, this);
      this._onDownArrow = bind(this._onDownArrow, this);
      this._onTileMouseMove = bind(this._onTileMouseMove, this);
      this._onTileMouseDown = bind(this._onTileMouseDown, this);
      this.selectExtend = bind(this.selectExtend, this);
      this._initializeDragSelect = bind(this._initializeDragSelect, this);
      this.initialize = bind(this.initialize, this);
      MultiSelect.__super__.constructor.apply(this, arguments);
    }

    MultiSelect.prototype.initialize = function () {
      MultiSelect.__super__.initialize.apply(this, arguments);
      return this._initializeDragSelect();
    };

    MultiSelect.prototype._initializeDragSelect = function () {
      this.mouseDown = false;
      $(document).on('mousedown', function (_this) {
        return function () {
          return _this.mouseDown = true;
        };
      }(this));
      $(document).on('mouseup', function (_this) {
        return function () {
          return _this.mouseDown = false;
        };
      }(this));
      return this.tilegrid.$element.on("mousemove.multiSelect", ".tile", this._onTileMouseMove);
    };

    MultiSelect.prototype.selectExtend = function (index) {
      var $activeTile, $tile, activeIndex, firstTileIndex, lastTileIndex, onEnsureComplete, viewStats;
      $activeTile = this.getActiveTile();
      activeIndex = $activeTile.data('index');
      $tile = $activeTile;
      onEnsureComplete = function (_this) {
        return function () {
          var lastIndex, nextIndex;
          while (true) {
            lastIndex = null;
            $tile = index < activeIndex ? $tile = $tile.prev() : $tile = $tile.next();
            nextIndex = $tile.data('index');
            if (nextIndex == null) {
              break;
            }
            lastIndex = nextIndex;
            _this.selectOne(nextIndex, true, {
              silent: true,
              active: false
            });
            if (nextIndex === index) {
              break;
            }
          }
          _this.collection.trigger('selectionsChanged');
          return _this.setActiveTile(lastIndex);
        };
      }(this);
      viewStats = this.tilegrid.getViewingStats();
      firstTileIndex = activeIndex > index ? viewStats.topDisplayIndex : activeIndex;
      lastTileIndex = activeIndex < index ? viewStats.bottomDisplayIndex : index;
      if (_.isFunction(this.collection.ensureRows)) {
        this.collection.ensureRows(firstTileIndex, lastTileIndex, {
          complete: onEnsureComplete
        });
      } else {
        onEnsureComplete();
      }
      return this.collection.trigger('selectionsChanged');
    };

    MultiSelect.prototype._onTileMouseDown = function (evt) {
      var $tile, index, method;
      evt.preventDefault();
      if ($(evt.target).closest(".tile").hasClass('no-select')) {
        return;
      }
      method = this._whichMethod(evt);
      $tile = $(evt.target).closest('.tile');
      index = this._getIndexFromEvent(evt);
      this.lastMouseDownIndex = index;
      this.lastToggleIndex = null;
      if (!(($tile != null ? $tile.length : void 0) > 0)) {
        return;
      }
      if (method === this.selectOnlyOne && !this.options.selectOneOnSelected && $tile.hasClass('selected')) {
        return MultiSelect.__super__._onTileMouseDown.apply(this, arguments);
      } else if (method === this.selectOne && $tile.hasClass('selected')) {
        this.selectOne(index, false, {
          active: false
        });
        if ($tile.hasClass('active')) {
          return this.setActiveTile(null);
        }
      } else {
        return method(index);
      }
    };

    MultiSelect.prototype._onTileMouseMove = function (evt) {
      var $target, index;
      evt.preventDefault();
      $target = $(evt.target);
      if (this.mouseDown && !($target.hasClass('active') || $target.parents('.tile.active').length > 0)) {
        index = this._getIndexFromEvent(evt);
        if (evt.metaKey || evt.ctrlKey) {
          if (!(index === this.lastToggleIndex || index === this.lastMouseDownIndex)) {
            this.lastToggleIndex = index;
            return this.selectToggle(index);
          }
        } else {
          if (!(index < 0)) {
            return this.selectExtend(index);
          }
        }
      }
    };

    MultiSelect.prototype._onDownArrow = function (evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(1));
    };

    MultiSelect.prototype._onUpArrow = function (evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-1));
    };

    MultiSelect.prototype._onPageDown = function (evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(5));
    };

    MultiSelect.prototype._onPageUp = function (evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-5));
    };

    MultiSelect.prototype._onLeftArrow = function (evt) {
      return this._whichMethod(evt)(this.getPreviousTile().data('index'));
    };

    MultiSelect.prototype._onRightArrow = function (evt) {
      return this._whichMethod(evt)(this.getNextTile().data('index'));
    };

    MultiSelect.prototype._whichMethod = function (evt) {
      if (evt.shiftKey) {
        return this.selectExtend;
      } else if (evt.ctrlKey || evt.metaKey) {
        return this.selectOne;
      } else {
        return this.selectOnlyOne;
      }
    };

    return MultiSelect;
  }(SingleSelect);
}).call(undefined);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jQueryTilegrid = __webpack_require__(7);
var ReactTilegrid = __webpack_require__(15);
var MultiSelect = __webpack_require__(11);

if (!(window == null)) {
  window.jQueryTilegrid = jQueryTilegrid;
  window.ReactTilegrid = ReactTilegrid;
  window.MultiSelect = MultiSelect;
}

module.exports = {
  jQueryTilegrid: jQueryTilegrid,
  ReactTilegrid: ReactTilegrid,
  MultiSelect: MultiSelect
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var MultiSelect,
      React,
      ReactDom,
      SingleSelect,
      TilegridComponent,
      TilegridReactTiles,
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  ReactDom = __webpack_require__(9);

  TilegridReactTiles = __webpack_require__(22);

  SingleSelect = __webpack_require__(10);

  MultiSelect = __webpack_require__(11);

  module.exports = TilegridComponent = function (superClass) {
    extend(TilegridComponent, superClass);

    function TilegridComponent() {
      return TilegridComponent.__super__.constructor.apply(this, arguments);
    }

    TilegridComponent.displayName = "Tilegrid";

    TilegridComponent.propTypes = {
      collection: React.PropTypes.any,
      tileTemplate: React.PropTypes.node,
      tilegridClass: React.PropTypes.func,
      tilegridOptions: React.PropTypes.object,
      tilegridSelectionClass: React.PropTypes.func,
      tilegridSelectOptions: React.PropTypes.object,
      children: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.node), React.PropTypes.node, React.PropTypes.func])
    };

    TilegridComponent.defaultProps = {
      tilegridClass: TilegridReactTiles,
      tileTemplate: null,
      tilegridOptions: {},
      tilegridSelectionClass: SingleSelect
    };

    TilegridComponent.contextTypes = {
      collection: React.PropTypes.any
    };

    TilegridComponent.prototype.render = function () {
      return React.createElement("div", {
        "className": 'tilegrid-react'
      });
    };

    TilegridComponent.prototype.componentDidMount = function () {
      this.node = ReactDom.findDOMNode(this);
      this.collection = this.props.collection || this.context.collection;
      this.tileTemplate = this._getTileTemplate();
      this.tilegrid = new this.props.tilegridClass(this.node, this.collection, this.tileTemplate, this.props.tilegridOptions);
      if (this.props.tilegridSelectionClass != null) {
        return new this.props.tilegridSelectionClass(this.tilegrid, this.props.tilegridSelectOptions);
      }
    };

    TilegridComponent.prototype.componentWillUnmount = function () {
      React.unmountComponentAtNode(this.node);
      return this.tilegrid.destroy();
    };

    TilegridComponent.prototype.componentWillReceiveProps = function () {};

    TilegridComponent.prototype._getTileTemplate = function () {
      return this.props.tileTemplate || this._findTileChild();
    };

    TilegridComponent.prototype._findTileChild = function () {
      return this.props.children;
    };

    return TilegridComponent;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(18)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(21)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(5);
var warning = __webpack_require__(8);
var assign = __webpack_require__(19);

var ReactPropTypesSecret = __webpack_require__(6);
var checkPropTypes = __webpack_require__(20);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(5);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(6);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(4);
var invariant = __webpack_require__(5);
var ReactPropTypesSecret = __webpack_require__(6);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $,
      ModelWatcher,
      React,
      ReactDom,
      Tilegrid,
      TilegridReactTiles,
      jQuery,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  ReactDom = __webpack_require__(9);

  $ = jQuery = __webpack_require__(1);

  Tilegrid = __webpack_require__(7);

  ModelWatcher = __webpack_require__(23);

  /*
    this extension of the jquery tilegrid allows the use of ReactComponents as the tile template.
  
    See src/tilegrid for tile grid that can be used as a React component
    from JSX. 
  
    This class is not exported from index.js for simplicity.  If the user is using react components
    as tiles, why wouldn't they be be using the tilegrid as a React component? maybe wrong about that
   */

  module.exports = TilegridReactTiles = function (superClass) {
    extend(TilegridReactTiles, superClass);

    function TilegridReactTiles() {
      this._cloneTileTemplate = bind(this._cloneTileTemplate, this);
      this._getTileTemplate = bind(this._getTileTemplate, this);
      this._renderDerenderedPlaceholder = bind(this._renderDerenderedPlaceholder, this);
      this._renderTileTemplate = bind(this._renderTileTemplate, this);
      this.isReactTemplate = bind(this.isReactTemplate, this);
      this.setTileTemplate = bind(this.setTileTemplate, this);
      return TilegridReactTiles.__super__.constructor.apply(this, arguments);
    }

    TilegridReactTiles.prototype.setTileTemplate = function (tileTemplate) {
      if (this.isReactTemplate(tileTemplate)) {
        return this.tileTemplate = tileTemplate;
      } else {
        return TilegridReactTiles.__super__.setTileTemplate.apply(this, arguments);
      }
    };

    TilegridReactTiles.prototype.isReactTemplate = function (template) {
      if (template == null) {
        template = this._getTileTemplate();
      }
      if (_.isArray(template)) {
        template = template[0];
      }
      return _.intersection(['props', 'type', 'key'], _.keys(template)).length === 3 || template.prototype instanceof React.Component;
    };

    TilegridReactTiles.prototype._renderTileTemplate = function ($tile, model) {
      var element, index, template;
      index = parseInt($tile.attr('data-index'));
      if (_.isNaN(index)) {
        index = 0;
      }
      template = this._getTileTemplate($tile, model);
      if (_.isFunction(template)) {
        template = template(model, index);
      }
      if (this.isReactTemplate(template)) {
        element = React.createElement(ModelWatcher, {
          'model': model
        }, template);
        return ReactDom.render(element, $tile[0]);
      } else {
        return TilegridReactTiles.__super__._renderTileTemplate.apply(this, arguments);
      }
    };

    TilegridReactTiles.prototype._renderDerenderedPlaceholder = function ($tile) {
      var template;
      template = this._getTileTemplate();
      if (this.isReactTemplate(template) || _.isFunction(template)) {
        ReactDom.unmountComponentAtNode($tile[0]);
      }
      return TilegridReactTiles.__super__._renderDerenderedPlaceholder.apply(this, arguments);
    };

    TilegridReactTiles.prototype._getTileTemplate = function ($tile, model) {
      return this.tileTemplate;
    };

    TilegridReactTiles.prototype._cloneTileTemplate = function (model, options) {
      var classNames, template;
      if (options == null) {
        options = {};
      }
      template = this._getTileTemplate();
      if (this.isReactTemplate(template) || _.isFunction(template)) {
        classNames = options.tileWrapperClassNames != null && typeof options.tileWrapperClassNames === "function" ? options.tileWrapperClassNames(model) : "";
        return $("<div class='tile " + classNames + "'></div>");
      } else {
        return TilegridReactTiles.__super__._cloneTileTemplate.apply(this, arguments);
      }
    };

    return TilegridReactTiles;
  }(Tilegrid);
}).call(undefined);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var ModelWatcher,
      React,
      _,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      extend = function extend(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key)) child[key] = parent[key];
    }function ctor() {
      this.constructor = child;
    }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
  },
      hasProp = {}.hasOwnProperty;

  React = __webpack_require__(3);

  _ = __webpack_require__(0);

  /*
    This was stolen from react-datum  ContextualData component
   */

  module.exports = ModelWatcher = function (superClass) {
    extend(ModelWatcher, superClass);

    ModelWatcher.displayName = "ModelWatcher";

    ModelWatcher.prototype.contextKey = 'model';

    ModelWatcher.propTypes = {
      model: React.PropTypes.object,
      placeholder: React.PropTypes.node,
      className: React.PropTypes.string,
      debouncedUpdate: React.PropTypes.bool,
      debounceMs: React.PropTypes.number,
      debug: React.PropTypes.bool,
      style: React.PropTypes.object
    };

    ModelWatcher.childContextTypes = {
      model: React.PropTypes.object
    };

    ModelWatcher.contextTypes = {
      model: React.PropTypes.object
    };

    ModelWatcher.defaultProps = {
      placeholder: void 0,
      style: {},
      debouncedUpdate: true,
      debounceMs: 0
    };

    function ModelWatcher(props) {
      this.update = bind(this.update, this);
      this.onDataChanged = bind(this.onDataChanged, this);
      ModelWatcher.__super__.constructor.call(this, props);
      this.state = {
        lastUpdated: null,
        model: null
      };
      this.debouncedUpdate = this.props.debouncedUpdate ? _.debounce(this.update, this.props.debounceMs) : this.update;
    }

    ModelWatcher.prototype.getChildContext = function () {
      var c;
      c = {};
      c[this.contextKey] = this.state.model;
      return c;
    };

    ModelWatcher.prototype.render = function () {
      var className;
      className = "contextual-data " + this.contextKey;
      if (this.props.className != null) {
        className += " " + this.props.className;
      }
      return React.createElement("span", {
        "style": _.extend({}, this.props.style),
        "className": className
      }, this.renderContent());
    };

    ModelWatcher.prototype.renderContent = function () {
      if (this.state.model != null || this.props.placeholder === void 0) {
        return this.props.children;
      }
      return this.props.placeholder;
    };

    /* !pragma coverage-skip-next */

    ModelWatcher.prototype.componentWillUnmount = function () {
      return this.unbindEvents();
    };

    ModelWatcher.prototype.componentWillMount = function () {
      return this.initializeModel();
    };

    /* !pragma coverage-skip-next */

    ModelWatcher.prototype.componentWillReceiveProps = function (newProps) {
      this.props = newProps;
      return this.initializeModel();
    };

    /*
      extend this method to provide additional initialization on the 
      thing you provide.  You should probably call super
     */

    ModelWatcher.prototype.initializeModel = function () {
      if (!this.needsReinitializing()) {
        return;
      }
      this.unbindEvents();
      this.setmodel();
      return this.bindEvents();
    };

    /*
      override this method to input from somewhere other than the context or props being passed in
     */

    ModelWatcher.prototype.getInputmodel = function () {
      return this.props[this.contextKey] || this.context[this.contextKey];
    };

    /*
      override or extend this method to provide something other than what we recieve
     */

    ModelWatcher.prototype.getModelToProvide = function () {
      return this.getInputmodel();
    };

    /*
      extend this method to provide additional tests to determine if initialization is 
      needed.  You should probably extend this method like so:
      ```
        return super() || this._someOtherTest()
      ```
     */

    ModelWatcher.prototype.needsReinitializing = function () {
      var model, truth;
      model = this.getModelToProvide();
      truth = this.state.model == null || model !== this._lastPropsModel;
      this._lastPropsModel = model;
      return truth;
    };

    ModelWatcher.prototype.setmodel = function () {
      var model;
      model = this.getModelToProvide();
      this.setState({
        model: model
      });
      return this.state.model = model;
    };

    ModelWatcher.prototype.bindEvents = function () {
      var ref;
      return (ref = this.state.model) != null ? typeof ref.on === "function" ? ref.on('all', this.onDataChanged, this) : void 0 : void 0;
    };

    ModelWatcher.prototype.unbindEvents = function () {
      var ref;
      return (ref = this.state.model) != null ? typeof ref.off === "function" ? ref.off('all', this.onDataChanged) : void 0 : void 0;
    };

    ModelWatcher.prototype.onDataChanged = function () {
      return this.debouncedUpdate();
    };

    ModelWatcher.prototype.update = function () {
      if (this.props.debug) {
        console.log("ContextualData: update on model", this.state.model);
      }
      this.setState({
        lastUpdated: Date.now(),
        model: this.getModelToProvide()
      });
      if (this.props.forceUpdate) {
        return this.forceUpdate();
      }
    };

    return ModelWatcher;
  }(React.Component);
}).call(undefined);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var SelectableCollection, _,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = __webpack_require__(0);

module.exports = SelectableCollection = (function() {
  function SelectableCollection() {
    this.setActiveModelById = bind(this.setActiveModelById, this);
    this.setActiveIndex = bind(this.setActiveIndex, this);
    this.getActiveModel = bind(this.getActiveModel, this);
    this.setActiveModel = bind(this.setActiveModel, this);
    this.selectNone = bind(this.selectNone, this);
    this.selectAll = bind(this.selectAll, this);
    this.selectModelByIndex = bind(this.selectModelByIndex, this);
    this.selectModelById = bind(this.selectModelById, this);
    this.selectModel = bind(this.selectModel, this);
  }


  /*
    This method is used to mix SelectableCollection features into a Backbone Collection.
    
    example:
    ```javascript
      kittensCollection = new Backbone.Collection()
      SelectableCollection.applyTo(kittensCollection)
    ```
   */

  SelectableCollection.applyTo = function(collection) {
    if (collection.hasSelectableCollectionMixin) {
      return;
    }
    collection.hasSelectableCollection = true;
    this.warnIfReplacingMethods(collection);
    return _.extend(collection, this.prototype);
  };

  SelectableCollection.warnIfReplacingMethods = function(collection) {
    var intersect;
    intersect = _.intersection(_.keys(collection), _.keys(this.prototype));
    if (!(intersect.length > 0)) {
      return;
    }
    return console.error("Warning: using SelectableCollection mixin will replace the following methods: " + intersect.join(', '));
  };

  SelectableCollection.prototype.hasSelectableCollectionMixin = true;


  /*
    Collection instance method that returns an array of selected models
   */

  SelectableCollection.prototype.getSelectedModels = function() {
    return _.filter(this.models, function(m) {
      return m.selected;
    });
  };


  /*
    Collection instance method that selects a single model.
   
    The model will be given a `selected` property of true.
   
    The `selected` argument can be one of:
    `true`    - model argument will be selected
    `false`   - unselect model
    "toggle"` - invert current selected state
    
    Example: 
    ```javascript
      myCollection.selectModel(myModel)
      console.log(myModel.selected)
       * => true
    ```
   */

  SelectableCollection.prototype.selectModel = function(model, selected, options) {
    if (selected == null) {
      selected = true;
    }
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      silent: false
    });
    if (model == null) {
      console.warn("SelectableCollection: selectModel called on null model");
      return false;
    }
    if (selected === "toggle") {
      model.selected = (model.selected == null) || model.selected === false;
    } else {
      model.selected = selected;
    }
    if (!options.silent) {
      this.trigger('selectionsChanged');
    }
    return model.selected;
  };


  /*
    Collection instance method that selects a single model by ID.
    
    collection.get(id) is used to get the model passed to selectModel method.
    
    See also [selectModel method](#selectModel) for options
   */

  SelectableCollection.prototype.selectModelById = function(id, selected, options) {
    if (selected == null) {
      selected = true;
    }
    if (options == null) {
      options = {};
    }
    return this.selectModel(this.get(id), selected, options);
  };


  /*
    Collection instance method that selects a single model by it's zero based index
    in the collection.
  
    See also [selectModel method](#selectModel) for options
   */

  SelectableCollection.prototype.selectModelByIndex = function(index, selected, options) {
    if (selected == null) {
      selected = true;
    }
    if (options == null) {
      options = {};
    }
    return this.selectModel(this.models[index], selected, options);
  };


  /*
    Collection instance method that selects all models in the collection.
  
    A single *selectionsChanged* event is triggered unless options.silent==true
   */

  SelectableCollection.prototype.selectAll = function(options) {
    var i, len, model, ref;
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      silent: false
    });
    ref = this.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      if (model == null) {
        continue;
      }
      this.selectModel(model, true, {
        silent: true
      });
    }
    if (!options.silent) {
      return this.trigger('selectionsChanged');
    }
  };


  /*
    Collection instance method that unselects all models.  Also sets activeModel to null.
  
    A *selectionsChanged* event is triggered unless options.silent==true. 
    A *activeModelChanged* event is also fired
   */

  SelectableCollection.prototype.selectNone = function(options) {
    var i, len, model, ref;
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      silent: false
    });
    ref = this.getSelectedModels();
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      if (model == null) {
        continue;
      }
      this.selectModel(model, false, {
        silent: true
      });
    }
    if (!options.silent) {
      this.trigger('selectionsChanged');
    }
    return this.setActiveModel(null);
  };


  /*
    Collection instance method that sets the current 'active' Model.  Multiple models may be 
    selected in the collection, only one model can be 'active'.   The active model is also
    selected in the collection if not already selected.  
    
    SetActiveModel() is an optional feature. Active model can be used, as it is by 
    [tilegrid](https://github.com/zulily/tilegrid), to provide both multiple selections and
    a single selection within that set (the last tile added to the selections)
      
    pass in null for model argument to unset active model
   */

  SelectableCollection.prototype.setActiveModel = function(model, options) {
    var currentActive;
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      active: true,
      silent: false
    });
    currentActive = this.getActiveModel();
    if (currentActive != null) {
      currentActive.active = false;
    }
    this.selectModel(model, options);
    if (model != null) {
      model.active = options.active;
    }
    this.activeModel = model;
    if (!options.silent) {
      return this.trigger('activeModelChanged', model);
    }
  };


  /*
    Collection instance method that returns the current active model.
   */

  SelectableCollection.prototype.getActiveModel = function() {
    return this.activeModel;
  };


  /*
    Collection instance method that sets the active model by index in collection.
    
    see [setActiveModel](#setActiveModel) for options
   */

  SelectableCollection.prototype.setActiveIndex = function(index, options) {
    if (options == null) {
      options = {};
    }
    return this.setActiveModel(this.models[index]);
  };


  /*
    Collection instance method that sets the active model by id in collection.
    
    see [setActiveModel](#setActiveModel) for options
   */

  SelectableCollection.prototype.setActiveModelById = function(modelId, options) {
    if (options == null) {
      options = {};
    }
    return this.setActiveModel(this.get(modelId), options);
  };

  return SelectableCollection;

})();


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var $, hasScroll;

  $ = __webpack_require__(1);

  /*
    Thanks stackoverflow!   This allows the tilegrid to determine the scroll parent of the tiles
    http://codereview.stackexchange.com/questions/13338/hasscroll-function-checking-if-a-scrollbar-is-visible-in-an-element
  
    You can then use this in any jQuery selector, such as:
    ```
      $('div:hasScroll') //all divs that have scrollbars
      $('div').filter(':hasScroll') //same but better
      $(this).closest(':hasScroll(y)') //find the parent with the vert scrollbar
      $list.is(':hasScroll(x)') //are there any horizontal scrollbars in the list?
    ```
   */

  hasScroll = function hasScroll(el, index, match) {
    var $el, axis, hidden, sX, sY, scroll, visible;
    $el = $(el);
    sX = $el.css('overflow-x');
    sY = $el.css('overflow-y');
    hidden = 'hidden';
    visible = 'visible';
    scroll = 'scroll';
    axis = match[3];
    if (!axis) {
      if (sX === sY && (sY === hidden || sY === visible)) {
        return false;
      }
      if (sX === scroll || sY === scroll) {
        return true;
      }
    } else if (axis === 'x') {
      if (sX === hidden || sX === visible) {
        return false;
      }
      if (sX === scroll) {
        return true;
      }
    } else if (axis === 'y') {
      if (sY === hidden || sY === visible) {
        return false;
      }
      if (sY === scroll) {
        return true;
      }
    }
    return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
  };

  $.expr[':'].hasScroll = hasScroll;
}).call(undefined);

/***/ })
/******/ ]);
});