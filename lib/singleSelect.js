(function() {
  var $, SelectableCollection, SingleSelect, _, jQuery,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ = require('underscore');

  $ = jQuery = require('jquery');

  SelectableCollection = require('selectable-collection/src/selectableCollection.coffee');

  require('./lib/jqueryHelpers');


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

  module.exports = SingleSelect = (function() {
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

    SingleSelect.prototype.initialize = function() {
      this._initializeTilegrid();
      this._initializeCollection();
      this._initializeKeyboard();
      return this;
    };

    SingleSelect.prototype.selectOne = function(index, selected, options) {
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

    SingleSelect.prototype.selectOnlyOne = function(index) {
      if (!((index != null) && index >= 0)) {
        return;
      }
      this.selectNone();
      return this.selectOne(index);
    };

    SingleSelect.prototype.selectToggle = function(index) {
      return this.selectOne(index, 'toggle');
    };

    SingleSelect.prototype.selectNone = function() {
      this.collection.selectNone();
      return this.resetActiveTile();
    };

    SingleSelect.prototype.resetActiveTile = function() {
      return this.setActiveTile(null);
    };

    SingleSelect.prototype.getActiveTile = function() {
      return this.tilegrid.$element.find('.tile.active');
    };

    SingleSelect.prototype.setActiveTile = function(index) {
      var $newActive, $prevActive;
      $prevActive = this.getActiveTile();
      $newActive = null;
      if (index != null) {
        $newActive = this.tilegrid.findTileAt(index);
        if ($newActive && $newActive.length > 0 && !$newActive.is($prevActive)) {
          this._scrollIntoView($newActive, $newActive.closest(':hasScroll'), this.options.scrollOptions);
        }
      }
      if (($prevActive && !$newActive) || (!$prevActive && $newActive) || !($newActive != null ? $newActive.is($prevActive) : void 0)) {
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

    SingleSelect.prototype.updateTileStates = function($tile) {
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

    SingleSelect.prototype.getPreviousTile = function() {
      return this.getActiveTile().prevAll('.tile:visible').first();
    };

    SingleSelect.prototype.getNextTile = function() {
      return this.getActiveTile().nextAll('.tile:visible').first();
    };

    SingleSelect.prototype.focus = function() {
      return this.$focusSink.focus();
    };

    SingleSelect.prototype._initializeTilegrid = function() {
      this.tilegrid.$element.on("mousedown.SingleSelect", ".tile", this._onTileMouseDown);
      this.tilegrid.$element.on("mouseup.SingleSelect", ".tile", this._onTileMouseUp);
      return this.tilegrid.selections = this;
    };

    SingleSelect.prototype._initializeCollection = function() {
      this.collection.on('selectionsChanged', this._onSelectionsChanged);
      return this.collection.on('selectAll', this._onSelectAll);
    };

    SingleSelect.prototype._initializeKeyboard = function() {
      this.tilegrid.$element.on("click", this.focus);
      this.$focusSink = $("<input class=\"tilegrid-focus-sink\" type=\"text\">");
      this.tilegrid.$element.prepend(this.$focusSink);
      this.$focusSink.on('keydown', this._onKeydown);
      return this.$focusSink.on('focus', this._onFocusSinkFocus);
    };

    SingleSelect.prototype._onFocusSinkFocus = function() {};

    SingleSelect.prototype._onTileMouseDown = function(evt) {
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

    SingleSelect.prototype._onTileMouseUp = function(evt) {};

    SingleSelect.prototype._onSelectionsChanged = function() {
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

    SingleSelect.prototype._onSelectAll = function() {
      return this.setActiveTile(0);
    };

    SingleSelect.prototype._getKeymap = function() {
      return {
        40: this._onDownArrow,
        38: this._onUpArrow,
        33: this._onPageUp,
        34: this._onPageDown,
        37: this._onLeftArrow,
        39: this._onRightArrow
      };
    };

    SingleSelect.prototype._onKeydown = function(evt) {
      var base, name;
      return typeof (base = this._getKeymap())[name = evt.keyCode] === "function" ? base[name](evt) : void 0;
    };

    SingleSelect.prototype._onDownArrow = function(evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(1));
    };

    SingleSelect.prototype._onUpArrow = function(evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-1));
    };

    SingleSelect.prototype._onPageDown = function(evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(5));
    };

    SingleSelect.prototype._onPageUp = function(evt) {
      return this.selectOnlyOne(this._getSameIndexOnRelativeRow(-5));
    };

    SingleSelect.prototype._onLeftArrow = function(evt) {
      return this.selectOnlyOne(this.getPreviousTile().data('index'));
    };

    SingleSelect.prototype._onRightArrow = function(evt) {
      return this.selectOnlyOne(this.getNextTile().data('index'));
    };

    SingleSelect.prototype._getSameIndexOnRelativeRow = function(nRows) {
      var ref;
      return (ref = this._getSameTileOnRelativeRow(nRows)) != null ? ref.data('index') : void 0;
    };

    SingleSelect.prototype._getSameTileOnRelativeRow = function(nRows) {
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
        if ((nRows > 0 && nTop > activeBottom && (nLeft >= activeLeft || nRight >= activeRight)) || (nRows < 0 && nTop < activeTop && (nLeft <= activeLeft || nRight <= activeRight))) {
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

    SingleSelect.prototype._getIndexFromEvent = function(evt) {
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

    SingleSelect.prototype._getTileFromEvent = function(evt) {
      var $target, $tile;
      $target = $(evt.target);
      $tile = $target.closest('.tile');
      if ($tile.length <= 0) {
        console.warn("dev: error: _getIndexFromEvent unable to find .tile for " + $target.selector);
        return null;
      }
      return $tile;
    };

    SingleSelect.prototype._scrollIntoView = function($tile, $parent, options) {
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

  })();

}).call(this);
