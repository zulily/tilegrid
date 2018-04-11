(function() {
  var $, Backbone, Tilegrid, _, jQuery,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore');

  $ = jQuery = require('jquery');

  Backbone = require('backbone');

  module.exports = Tilegrid = (function() {
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

    Tilegrid.prototype.initialize = function() {
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

    Tilegrid.prototype.destroy = function() {
      var ref;
      return (ref = this.$tilegrid) != null ? ref.data('tilegrid', null) : void 0;
    };

    Tilegrid.prototype.reset = function(options) {
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

    Tilegrid.prototype.refresh = function() {
      this.reset({
        soft: true
      });
      return this._ensureViewport();
    };

    Tilegrid.prototype.render = function() {
      this._renderViewport();
      return this;
    };

    Tilegrid.prototype.focus = function() {
      var base;
      if (this.selections != null) {
        return typeof (base = this.selections).focus === "function" ? base.focus() : void 0;
      } else {
        return _.delay(((function(_this) {
          return function() {
            return _this.$tilegrid.focus();
          };
        })(this)), 100);
      }
    };

    Tilegrid.prototype.setTileTemplate = function(tileTemplate1) {
      this.tileTemplate = tileTemplate1;
      this.$tileTemplate = $(this.tileTemplate);
      if (this.$tileTemplate.length <= 0) {
        throw "dev error: Invalid template in TileGrid construction:<br>" + tileTemplate;
      }
    };

    Tilegrid.prototype.getActiveTile = function() {
      var ref;
      return (ref = this.selections) != null ? typeof ref.getActiveTile === "function" ? ref.getActiveTile() : void 0 : void 0;
    };

    Tilegrid.prototype.setActiveTile = function(index) {
      var ref;
      return (ref = this.selections) != null ? typeof ref.setActiveTile === "function" ? ref.setActiveTile(index) : void 0 : void 0;
    };

    Tilegrid.prototype.setActiveTileFor = function(model) {
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

    Tilegrid.prototype.getRenderedTiles = function() {
      return _.values(this._$tilesByModelId);
    };

    Tilegrid.prototype.updateCollectionViewStats = function(stats) {
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

    Tilegrid.prototype._initializeCollection = function() {
      if (this.data instanceof Backbone.Collection) {
        this.collection || (this.collection = this.data);
      }
      if (this.collection != null) {
        this.collection.on('reset', this._onCollectionReset);
        return this.collection.on('add', this._onCollectionAdd);
      }
    };

    Tilegrid.prototype._renderGrid = function() {
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

    Tilegrid.prototype._renderViewport = function() {
      if (this.collection == null) {
        this._endOfData();
        return;
      }
      if (this._loadingInWindow()) {
        return this._renderNextPage({
          success: (function(_this) {
            return function() {
              return _.defer(_this._renderViewport);
            };
          })(this)
        });
      } else {
        return this._ensureViewport();
      }
    };

    Tilegrid.prototype._ensureViewport = function() {
      var bottomIndex, topIndex, viewStats;
      if (this.options.ignoreViewport) {
        return;
      }
      viewStats = this.getViewingStats();
      topIndex = viewStats.topDisplayIndex;
      bottomIndex = viewStats.bottomDisplayIndex;
      if (!((topIndex != null) && (bottomIndex != null))) {
        return;
      }
      this.updateCollectionViewStats({
        topDisplayIndex: topIndex + 1,
        bottomDisplayIndex: bottomIndex + 1
      });
      this.topRenderIndex = Math.max(topIndex - this.options.pageSize, 0);
      this.bottomRenderIndex = (bottomIndex || 0) + this.options.pageSize;
      if ((this.collection != null) && _.isFunction(this.collection.ensureRows)) {
        return this.collection.ensureRows(this.topRenderIndex, this.bottomRenderIndex, {
          complete: this._onEnsureRowsComplete
        });
      } else {
        return this._onEnsureRowsComplete();
      }
    };

    Tilegrid.prototype._onEnsureRowsComplete = function() {
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

    Tilegrid.prototype.getItemData = function(index) {
      var ref, ref1;
      return ((ref = this.collection) != null ? typeof ref.getItem === "function" ? ref.getItem(index, {
        warn: true
      }) : void 0 : void 0) || ((ref1 = this.collection) != null ? ref1.models[index] : void 0) || this.data[index];
    };

    Tilegrid.prototype.getViewingStats = function() {
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

    Tilegrid.prototype._getGridScrollDims = function() {
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

    Tilegrid.prototype._getTileDims = function($tile) {
      var tilePosition;
      tilePosition = $tile.offset();
      _.extend(tilePosition, {
        bottom: tilePosition.top + $tile.height(),
        right: tilePosition.left + $tile.width()
      });
      return tilePosition;
    };

    Tilegrid.prototype._findTileInViewport = function(gridScrollDims) {
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
        if (tileDims.left > (gridScrollDims.gridOffsetLeft + gridScrollDims.width) || tileDims.top > (gridScrollDims.gridOffsetTop + gridScrollDims.height)) {
          half *= -1;
        }
        lastOffset = offset;
      }
      return $tile;
    };

    Tilegrid.prototype._isInViewPort = function(tileDims, gridScrollDims) {
      var horzVisible, vertVisible;
      if (gridScrollDims == null) {
        gridScrollDims = this._getGridScrollDims();
      }
      horzVisible = tileDims.right > gridScrollDims.gridOffsetLeft && tileDims.left < (gridScrollDims.gridOffsetLeft + gridScrollDims.width);
      vertVisible = tileDims.bottom > gridScrollDims.gridOffsetTop && tileDims.top < (gridScrollDims.gridOffsetTop + gridScrollDims.height);
      return horzVisible && vertVisible;
    };

    Tilegrid.prototype.renderAllTiles = function(options) {
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

    Tilegrid.prototype._renderNextPage = function(options) {
      var first, last;
      if (options == null) {
        options = {};
      }
      first = this.lastAppendedIndex + 1;
      last = first + this.options.pageSize;
      this.lastFirst = first;
      if ((this.collection != null) && _.isFunction(this.collection.ensureRows)) {
        return this.collection.ensureRows(first, last, {
          complete: this._onEnsureComplete
        });
      } else {
        return this._onEnsureComplete(first, last);
      }
    };

    Tilegrid.prototype._onEnsureComplete = function(first, last, options) {
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

    Tilegrid.prototype.getTotalItems = function() {
      var ref, ref1;
      if (this.collection == null) {
        return 0;
      }
      return ((ref = this.collection) != null ? typeof ref.getLength === "function" ? ref.getLength() : void 0 : void 0) || ((ref1 = this.collection) != null ? ref1.length : void 0) || this.data.length;
    };

    Tilegrid.prototype.appendTile = function() {
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

    Tilegrid.prototype._cloneTileTemplate = function(model, options) {
      if (options == null) {
        options = {};
      }
      return this.$tileTemplate.clone();
    };

    Tilegrid.prototype.renderTileAt = function(index) {
      var $tile, model;
      $tile = this.tileAt(index);
      model = this.getItemData(index);
      if ($tile && model) {
        return this.renderTile($tile, model);
      }
    };

    Tilegrid.prototype.renderTile = function($tile, model) {
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

    Tilegrid.prototype._renderTileTemplate = function($tile, model) {
      return $tile.html(this._getTileTemplate($tile, model));
    };

    Tilegrid.prototype._getTileTemplate = function($tile, model) {
      return this.$tileTemplate.html();
    };

    Tilegrid.prototype.tileAt = function(index) {
      return this._$tilesByModelId[this.getItemData(index).id];
    };

    Tilegrid.prototype.findTileAt = function(index) {
      return this.$tilegrid.find("> .tile[data-index='" + index + "']");
    };

    Tilegrid.prototype.tileFor = function(model) {
      var key;
      key = model.id || model;
      return this._$tilesByModelId[key];
    };

    Tilegrid.prototype._endOfData = function(options) {
      if (options == null) {
        options = {};
      }
      return this.$loadingIndicator.hide();
    };

    Tilegrid.prototype._loadingInWindow = function() {
      var inWindow, loadingLeft, loadingTop, outerHeight, outerWidth, scrollBottom, scrollHeight, scrollLeft, scrollRight, scrollTop, scrollWidth;
      if (!(this.$element.is(':visible') && this.$loadingIndicator.is(':visible'))) {
        return false;
      }
      outerHeight = this.$element.outerHeight();
      outerWidth = this.$element.outerWidth();
      if (outerHeight > 5000) {
        console.error(("dev error: the outer height of the .tilegrid element for " + this.selector + " is saying it's outer height ") + "is greater that 5000.  You need to set the height to something other than auto. ");
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

    Tilegrid.prototype._onCollectionReset = function() {
      this.reset();
      return this.render();
    };

    Tilegrid.prototype._onCollectionAdd = function() {
      return this.debouncedRender();
    };

    Tilegrid.prototype._onModelRemove = function(model) {
      var $tile;
      model.off("remove", this._onModelRemove);
      $tile = this._$tilesByModelId[model.id];
      return this._derenderTile($tile);
    };

    Tilegrid.prototype._onScroll = function() {
      return this._renderViewport();
    };

    Tilegrid.prototype._onResize = function() {
      return this._renderViewport();
    };

    Tilegrid.prototype._onTileGridClick = function(evt) {
      return evt.preventDefault();
    };

    Tilegrid.prototype._derenderOutsideTiles = function(topTileIndex, bottomTileIndex) {
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

    Tilegrid.prototype._derenderTile = function($tile) {
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

    Tilegrid.prototype._renderDerenderedPlaceholder = function($tile) {
      return $tile.html("<div class='placeholder'>. . .</div>");
    };

    return Tilegrid;

  })();

}).call(this);
