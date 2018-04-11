(function() {
  var $, MultiSelect, SingleSelect, _, jQuery,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  $ = jQuery = require('jquery');

  _ = require('underscore');

  SingleSelect = require('./singleSelect');


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

  module.exports = MultiSelect = (function(superClass) {
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

    MultiSelect.prototype.initialize = function() {
      MultiSelect.__super__.initialize.apply(this, arguments);
      return this._initializeDragSelect();
    };

    MultiSelect.prototype._initializeDragSelect = function() {
      this.mouseDown = false;
      $(document).on('mousedown', (function(_this) {
        return function() {
          return _this.mouseDown = true;
        };
      })(this));
      $(document).on('mouseup', (function(_this) {
        return function() {
          return _this.mouseDown = false;
        };
      })(this));
      return this.tilegrid.$element.on("mousemove.multiSelect", ".tile", this._onTileMouseMove);
    };

    MultiSelect.prototype.selectExtend = function(index) {
      var $activeTile, $tile, activeIndex, firstTileIndex, lastTileIndex, onEnsureComplete, viewStats;
      $activeTile = this.getActiveTile();
      activeIndex = $activeTile.data('index');
      $tile = $activeTile;
      onEnsureComplete = (function(_this) {
        return function() {
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
      })(this);
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

    MultiSelect.prototype._onTileMouseDown = function(evt) {
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

    MultiSelect.prototype._onTileMouseMove = function(evt) {
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

    MultiSelect.prototype._onDownArrow = function(evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(1));
    };

    MultiSelect.prototype._onUpArrow = function(evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-1));
    };

    MultiSelect.prototype._onPageDown = function(evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(5));
    };

    MultiSelect.prototype._onPageUp = function(evt) {
      return this._whichMethod(evt)(this._getSameIndexOnRelativeRow(-5));
    };

    MultiSelect.prototype._onLeftArrow = function(evt) {
      return this._whichMethod(evt)(this.getPreviousTile().data('index'));
    };

    MultiSelect.prototype._onRightArrow = function(evt) {
      return this._whichMethod(evt)(this.getNextTile().data('index'));
    };

    MultiSelect.prototype._whichMethod = function(evt) {
      if (evt.shiftKey) {
        return this.selectExtend;
      } else if (evt.ctrlKey || evt.metaKey) {
        return this.selectOne;
      } else {
        return this.selectOnlyOne;
      }
    };

    return MultiSelect;

  })(SingleSelect);

}).call(this);
