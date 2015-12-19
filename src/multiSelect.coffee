
$ = jQuery = require('jquery')
_ = require('underscore')

SingleSelect = require('./singleSelect')

###
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

###
module.exports = class MultiSelect extends SingleSelect

  constructor: () ->
    super


  initialize: () =>
    super

    @_initializeDragSelect()


  _initializeDragSelect: () =>
    @mouseDown = false
    $(document).on 'mousedown', () => @mouseDown = true
    $(document).on 'mouseup', () => @mouseDown = false

    @tilegrid.$element.on "mousemove.multiSelect", ".tile", @_onTileMouseMove




  # extends the selection set by selecting everything between active tile and index and makes index the active tile
  selectExtend: (index) =>
    $activeTile = @getActiveTile()
    activeIndex = $activeTile.data('index')
    $tile = $activeTile
    onEnsureComplete = () =>
      loop
        lastIndex = null
        $tile = if index < activeIndex then $tile = $tile.prev() else $tile = $tile.next()
        nextIndex = $tile.data('index')
        #if $tile.hasClass('selected') && (nextIndex == activeIndex + 1 || nextIndex == activeIndex - 1)
        #  @selectOne(activeIndex, false)

        break unless nextIndex?
        lastIndex = nextIndex
        @selectOne(nextIndex, true, silent: true, active: false)
        break if nextIndex == index
      @collection.trigger('selectionsChanged')
      @setActiveTile(lastIndex)


    # stretch the rows we are ensuring to cover the viewport
    viewStats = @tilegrid.getViewingStats()
    firstTileIndex = if activeIndex > index then viewStats.topDisplayIndex else activeIndex
    lastTileIndex = if activeIndex < index then viewStats.bottomDisplayIndex else index
    if _.isFunction(@collection.ensureRows)
      @collection.ensureRows firstTileIndex, lastTileIndex,
        complete: onEnsureComplete
    else
      onEnsureComplete()

    @collection.trigger('selectionsChanged')


  # override
  _onTileMouseDown: (evt) =>
    evt.preventDefault()
    return if $(evt.target).hasClass('no-select')

    method = @_whichMethod(evt)
    $tile = $(evt.target).closest('.tile')
    index = @_getIndexFromEvent(evt)
    @lastMouseDownIndex = index
    @lastToggleIndex = null

    return unless $tile?.length > 0
    if method == @selectOnlyOne && !@options.selectOneOnSelected && $tile.hasClass('selected')
      super
    else if method == @selectOne && $tile.hasClass('selected')
      @selectOne(index, false, active: false)
      @setActiveTile(null) if $tile.hasClass('active')
    else
      method(index)


  _onTileMouseMove: (evt) =>
    evt.preventDefault()
    $target = $(evt.target)
    if @mouseDown && !($target.hasClass('active') || $target.parents('.tile.active').length > 0)
      index = @_getIndexFromEvent(evt)
      if evt.metaKey || evt.ctrlKey
        unless index == @lastToggleIndex || index == @lastMouseDownIndex
          @lastToggleIndex = index
          @selectToggle(index)
      else
        @selectExtend(index) unless index < 0


  _onDownArrow: (evt) =>
    @_whichMethod(evt)(@_getSameIndexOnRelativeRow(1))


  _onUpArrow: (evt) =>
    @_whichMethod(evt)(@_getSameIndexOnRelativeRow(-1))


  _onPageDown: (evt) =>
    @_whichMethod(evt)(@_getSameIndexOnRelativeRow(5))


  _onPageUp: (evt) =>
    @_whichMethod(evt)(@_getSameIndexOnRelativeRow(-5))


  _onLeftArrow: (evt) =>
    @_whichMethod(evt)((@getPreviousTile().data('index')))


  _onRightArrow: (evt) =>
    @_whichMethod(evt)(@getNextTile().data('index'))


  _whichMethod: (evt) =>
    if evt.shiftKey
      @selectExtend
    else if evt.ctrlKey || evt.metaKey
      @selectOne
    else
      @selectOnlyOne
