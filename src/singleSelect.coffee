
_ = require('underscore')
$ = jQuery = require('jquery')
SelectableCollection = require('selectable-collection/src/selectableCollection')

require('./lib/jqueryHelpers')


###
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

###
module.exports = class SingleSelect

  constructor: (@tilegrid, options={}) ->
    @options = _.defaults options,
      # when set to false, will just change active cell if the user clicks on an already selected cell
      selectOneOnSelected: true
      scrollElement: @tilegrid.$element
      scrollOptions:
        duration: 0,
        cushion: {top: 40, bottom: 40}

    @collection = @tilegrid.collection
    unless @collection.hasSelectableCollectionMixin
      SelectableCollection.applyTo @collection

    @initialize()


  initialize: () =>
    @_initializeTilegrid()
    @_initializeCollection()
    @_initializeKeyboard()
    @


  selectOne: (index, selected=true, options={}) =>
    options = _.defaults options,
      silent: false                 # passed to @collection.selectModel true = don't trigger selectionsChanged
      active: true                  # set newly selected tile active
    if selected == true && options.active
      @setActiveTile(index)
    else
      @collection.selectModelByIndex(index, selected, options)
      
    



  selectOnlyOne: (index) =>
    return unless index? && index >= 0
    @selectNone()
    @selectOne(index)


  selectToggle: (index) =>
    @selectOne(index, 'toggle')


  selectNone: () =>
    @collection.selectNone()
    @resetActiveTile()


  resetActiveTile: () =>
    @setActiveTile(null)


  getActiveTile: () =>
    @tilegrid.$element.find('.tile.active')


   # call with null to set active tile to nothing
  setActiveTile: (index) =>
    # console.log "setActiveTile", index
    $prevActive = @getActiveTile()
    $newActive = null
    if index?                
      $newActive = @tilegrid.findTileAt(index)
      if $newActive && $newActive.length > 0 && !$newActive.is($prevActive)
        @_scrollIntoView $newActive, $newActive.closest(':hasScroll'), @options.scrollOptions

    # only trigger changed event if something changed
    if ($prevActive && !$newActive) || (!$prevActive && $newActive) || !$newActive?.is($prevActive)
      @collection.setActiveIndex(index)
      @collection.selectModelByIndex(index) if index?
      @tilegrid.trigger 'activeTileChanged', $newActive, $prevActive
      
    @updateTileStates($prevActive)
    @updateTileStates($newActive)

    return $newActive
    
  
  updateTileStates: ($tile) =>
    return unless $tile?
    model = @collection.get($tile.attr('data-id'))
    return unless model? 
    $tile.toggleClass('selected', model.selected)
    $tile.toggleClass('active', model.active)


  getPreviousTile: () =>   # from active tile
    @getActiveTile().prevAll('.tile:visible').first()


  getNextTile: () =>
    @getActiveTile().nextAll('.tile:visible').first()


  focus: () =>
    @$focusSink.focus()


  _initializeTilegrid: () =>
    @tilegrid.$element.on "mousedown.SingleSelect", ".tile", @_onTileMouseDown
    @tilegrid.$element.on "mouseup.SingleSelect", ".tile", @_onTileMouseUp

    @tilegrid.selections = @


  _initializeCollection: () =>
    @collection.on 'selectionsChanged', @_onSelectionsChanged
    @collection.on 'selectAll', @_onSelectAll


  _initializeKeyboard: () =>
    @tilegrid.$element.on "click", @focus

    @$focusSink = $("""<input class="tilegrid-focus-sink" type="text">""")
    @tilegrid.$element.prepend @$focusSink
    @$focusSink.on 'keydown', @_onKeydown
    @$focusSink.on 'focus', @_onFocusSinkFocus


  _onFocusSinkFocus: () =>
    # bad idea: user may have selected items and this will blow those selections away if the tab out and back or
    #     open a dialog, or ... , if you need to force an active tile
    #     smarter idea would be to set the first visible selected active
    # unless @getActiveTile().length > 0
    #  @selectOnlyOne(0)


  _onTileMouseDown: (evt) =>
    evt.preventDefault()

    return if $(evt.target).hasClass('no-select')

    index = @_getIndexFromEvent(evt)
    if @options.selectOneOnSelected
      @selectOnlyOne(index) unless @tilegrid.tileAt(index)?.hasClass('active')
    else
      @setActiveTile(index)
      @collection.trigger 'selectedClicked', index, evt


  _onTileMouseUp: (evt) =>
    # nothing to do


  _onSelectionsChanged: () =>
    selectedModels = @collection.getSelectedModels()
    @tilegrid.$element.find('>.tilegrid>.tile.selected').removeClass('selected')
    if selectedModels.length <= 0
      @resetActiveTile()
    else
      for model in selectedModels
        modelIndex = if model.index? then model.index else this.collection.indexOf(model)
        $tile = @tilegrid.$element.find(">.tilegrid>.tile[data-index='#{modelIndex}']")
        $tile.addClass 'selected'
        $tile.toggleClass 'active', model.active


  _onSelectAll: () =>
    # select all operation would trigger a reset and cause the results to reset (scroll to top of results)
    # always make the first tile active on select all so the user can get to has an action target for
    # tilegrids that display more infor and bulk controls in the active tile
    @setActiveTile(0)



  _getKeymap: () =>
    return {
      40: @_onDownArrow
      38: @_onUpArrow
      33: @_onPageUp
      34: @_onPageDown
      37: @_onLeftArrow
      39: @_onRightArrow

    }


  _onKeydown: (evt) =>
    @_getKeymap()[evt.keyCode]?(evt)



  _onDownArrow: (evt) =>
    @selectOnlyOne @_getSameIndexOnRelativeRow(1)


  _onUpArrow: (evt) =>
    @selectOnlyOne @_getSameIndexOnRelativeRow(-1)


  _onPageDown: (evt) =>
    @selectOnlyOne @_getSameIndexOnRelativeRow(5)


  _onPageUp: (evt) =>
    @selectOnlyOne @_getSameIndexOnRelativeRow(-5)


  _onLeftArrow: (evt) =>
    @selectOnlyOne(@getPreviousTile().data('index'))


  _onRightArrow: (evt) =>
    @selectOnlyOne(@getNextTile().data('index'))


  _getSameIndexOnRelativeRow: (nRows) =>
    @_getSameTileOnRelativeRow(nRows)?.data('index')



  # figure out where the same cell in the next / prev nth row is.  becuase this is a responsive layout, we don't know
  # how many tiles are in a "row".  Brute force - count how many previous tiles at the same top position
  # as the active tile, then iterate over tiles after the active tile until the top position changes and
  # then iterate for previous tiles count
  _getSameTileOnRelativeRow: (nRows) =>
    $active = @tilegrid.$element.find('.tile.active')
    return $active if nRows == 0

    # go until $next.top > #active.bottom and $next.left >= $activeLeft
    $next = $active
    rowsToTraverse = Math.abs(nRows)
    loop
      if nRows > 0
        $n = $next.nextAll('.tile:visible').first()
      else
        $n = $next.prevAll('.tile:visible').first()

      break if $n.length <= 0

      nHeight = $n.height();      nWidth = $n.width()
      nTop = $n.position().top;   nBottom = nTop + nHeight
      nLeft = $n.position().left; nRight = nLeft + nWidth

      activeHeight = $active.height();       activeWidth = $active.width()
      activeTop = $active.position().top;    activeBottom = activeTop + activeHeight
      activeLeft = $active.position().left;  activeRight = activeLeft + activeWidth


      if( (nRows > 0 && nTop > activeBottom && (nLeft >= activeLeft || nRight >= activeRight)) ||
          (nRows < 0 && nTop < activeTop && (nLeft <= activeLeft || nRight <= activeRight))
      )
        $active = $n
        rowsToTraverse -= 1

      $next = $n
      break if rowsToTraverse <= 0

    return $next


  _getIndexFromEvent: (evt) =>
    $tile = @_getTileFromEvent(evt)
    return -1 unless $tile
    index = $tile.data('index')
    throw "dev: error: invalid tile found in tilegrid, no data-index attribute" unless index?
    index


  _getTileFromEvent:(evt) =>
    $target = $(evt.target)
    $tile = $target.closest('.tile')
    if $tile.length <= 0
      # probably someting in the call stack is calling this on non .tile clicks or other event
      console.warn "dev: error: _getIndexFromEvent unable to find .tile for #{$target.selector}"
      return null

    return $tile


  _scrollIntoView: ($tile, $parent, options={}) =>
    options = _.defaults options,
      cushion: {}
      duration: 100
    # when false, the parent is scrolled until the botton of the element is in view of the bottom of the viewport
      alwaysAtTop: false
    # datatable overrides $tile to account for the fact that a tr is actually at
    # it's .position().top + .parent('table').position().top
      top: null
      left: null
      height: null
      width: null

    return unless $parent?.length > 0 && !$parent.is($(document))

    options.cushion = _.defaults options.cushion,
      left: 10, right: 10, top: 10, bottom: 15

    $tileTop = options.top || $tile.position().top
    $tileLeft = options.left || $tile.position().left
    $tileHeight = options.height || $tile.outerHeight()
    $tileWidth = options.width || $tile.outerWidth()
    parentScrollTop = $parent.scrollTop()
    parentTop = options.parentTop || parentScrollTop
    parentLeft = $parent.scrollLeft()
    parentHeight = $parent.outerHeight()
    parentWidth = $parent.outerWidth()
    isAbove = $tileTop - options.cushion.top < 0
    isBelow = $tileTop + $tileHeight + options.cushion.bottom > parentHeight
    isLeft = $tileLeft - options.cushion.left < 0
    isRight = $tileLeft + $tileWidth + options.cushion.right > parentWidth
    attrs = {}
    if( isAbove || options.alwaysAtTop )
      attrs.scrollTop = Math.max(parentTop + $tileTop - options.cushion.top, 0)
    else if( isBelow )
      attrs.scrollTop = parentScrollTop + $tileTop + $tileHeight + options.cushion.bottom - parentHeight
    if( isLeft )
      attrs.scrollLeft = parentLeft + $tileLeft - options.cushion.left
    else if( isRight )
      attrs.scrollLeft = $tileLeft + $tileWidth + options.cushion.right - parentWidth

    #already in position
    return if _.keys(attrs).length <= 0

    if options.duration > 0
      $parent.animate attrs, options.duration, "linear"
    else
      $parent.scrollTop(attrs.scrollTop) if attrs.scrollTop?
      $parent.scrollLeft(attrs.scrollLeft) if attrs.scrollLeft?

    return $tile
