
_ = require('underscore')
$ = jQuery = require('jquery')
Backbone = require('backbone')

# see ../tilegrid.md
module.exports = class Tilegrid
  $tilegridTemplate: $("""
    <div class="tilegrid">
        <div class="tilegrid-loading">
            <div class="placeholder fade in">
                ... more to come ...
                &nbsp;
            </div>
        </div>
    </div>
  """)

  ### 
    constructs a Tilegrid instance
    
    selector        - jquery compatible selector
    data            - can be an array or a Collection child
    tileTemplate    - can be a selector, jquery obj or html
  ###
  constructor: (@selector, @data, @tileTemplate, options={}) ->
    
    @options = _.defaults options,
      # you can specify an alternate page size, this will control how many tiles are rendered per
      # call to @collection.ensureRows.  Defaulted to a fraction the collections pageable page size so that
      # we should only ask for one page at a time.  Setting this above the collection's page size
      # causes the collection to fetch more pages but we don't render any until they become available
      pageSize:  50
      # in pixels.  start loading next page when loading indicator is within this number of pixels
      # from the bottom of the scrolling div
      preloadCushion:  400
      # to ignore resize and scrolling changes. only useful in combo with renderAll()
      ignoreViewport: false
      # fn to call to allow hiding of tiles with models that don't pass a particular test
      hideFunction: null
      # This can be a function or a class name
      tileWrapperClassNames: ""

    @setTileTemplate(@tileTemplate)

    # you can pass in an array of objects or models instead of a collection
    unless _.isArray(@data) || @data instanceof Backbone.Collection
      throw "Tilegrid expects @data constructor arg to be either and array or a Collection"

    @debouncedRefresh = _.debounce(@refresh, 200)
    @debouncedRender = _.debounce(@render, 200)

    @initialize()


  initialize: () =>
    @$element = $(@selector)

    _.extend(this, Backbone.Events)

    unless @$element?.length > 0
      throw "Dev: error: #{@$element.selector} not found in DOM"

    @_initializeCollection()
    @_renderGrid()
    @reset()
    @render()

    @$tilegrid?.data('tilegrid', @)


  destroy: () =>
    @$tilegrid?.data('tilegrid', null)


  reset: (options={}) =>
    options = _.defaults options,
      # set soft true to derender tiles instead of removing.  A hard reset will force the scroll to the top
      #   because all of the tiles are completely removed from the DOM
      soft: false

    @_$tilesByModelId = {}
    if options.soft
      @_derenderTile($(tileEl)) for tileEl in @$element.find('.tile')
    else
      @lastRenderedIndex = -1
      @$element.find('.tile').remove()

    if @getTotalItems() > 0
      @$loadingIndicator.show()
    
    # don't do initial render yet, wait for someone to do initial fetch on collection
    return @


  refresh: () =>
    @reset(soft: true)
    @_ensureViewport()


  render: () =>
    @_renderViewport()
    return @


  focus: () =>
    # @selections is added by views.widgets.tilegrid.SingleSelect and friends
    if @selections?
      @selections.focus?()     # selections manager may have a sink so let it have first crack
    else
      _.delay( (=> @$tilegrid.focus()), 100)  # so you can scroll with the keyboard when it gets' focus


  setTileTemplate: (tileTemplate) =>
    @$tileTemplate = $(tileTemplate)
    if @$tileTemplate.length <= 0
      throw "dev error: Invalid template in TileGrid construction:<br>#{tileTemplate}"


  # selections is one of tilegrid/SingleSelect tilegrid/multiSelect
  getActiveTile: () =>
    @selections?.getActiveTile?()


  # normally you should go through the collection to set the active model,  the only advantage of doing
  # it through this method is that the newly active tile will also scroll into view
  setActiveTile: (index) =>
    @selections?.setActiveTile?(index)


  setActiveTileFor: (model) =>
    return null unless model?
    $tile = @tileFor(model)
    return null unless $tile?.length > 0
    index = $tile.data('index')
    throw "dev: unexpected: tile for model #{model.id} has no index attribute" unless index?
    @selections?.setActiveTile(index)
    $tile

  getRenderedTiles: () =>
    _.values @_$tilesByModelId


  updateCollectionViewStats:  (stats) =>
    return unless @collection?
    totalRows = @getTotalItems()  # returns totalRows (number of search results)
    if totalRows <= 0
      _.extend stats, 
        topDisplayIndex: 0
        bottomDisplayIndex: 0

    # has collection stats mixin
    if @collection.hasStats
        @collection.updateStats stats
    else
      @collection.topDisplayIndex = stats.topDisplayIndex
      @collection.bottomDisplayIndex = stats.bottomDisplayIndex
      @collection.trigger?('viewStatsChanged')


  _initializeCollection: () =>
    @collection ||= @data if @data instanceof Backbone.Collection
    if @collection?
      @collection.on 'reset', @_onCollectionReset
      @collection.on 'sync', @_onCollectionSync
      @collection.on 'add', @_onCollectionAdd


  _renderGrid: () =>
    # don't ever wipe and rerender the entire element, selection handlers etc are probably mapped
    return @$tilegrid if @$tilegrid && @$tilegrid.length > 0

    @$tilegrid = @$tilegridTemplate.clone()
    @$element.html @$tilegrid
    @$loadingIndicator = @$element.find('.tilegrid-loading')

    unless @options.ignoreViewport
      @_debouncedOnScroll = _.debounce @_onScroll, 100
      @_debouncedOnResize = _.debounce @_onResize, 100
      @$tilegrid.on 'scroll', @_debouncedOnScroll
      @$tilegrid.on 'resize', @_debouncedOnResize

    @$tilegrid.on 'click', @_onTilegridClick
    @$tilegrid


  _renderViewport: () =>
    if !@collection? 
      @_endOfData();
      return
      
    if @_loadingInWindow()
      # recurse until the loading indicator is out of view. this causes us to pull and render one page size
      # at a time and fill in the very large displays without setting off a stampede
      @_renderNextPage success: => _.defer(@_renderViewport)
    else
      @_ensureViewport()


  _ensureViewport: () =>
    return if @options.ignoreViewport

    viewStats = @getViewingStats()
    topIndex = viewStats.topDisplayIndex
    bottomIndex = viewStats.bottomDisplayIndex

    return unless topIndex? && bottomIndex?
    @updateCollectionViewStats topDisplayIndex: topIndex + 1, bottomDisplayIndex: bottomIndex + 1

    @topRenderIndex = Math.max(topIndex - @options.pageSize, 0)
    @bottomRenderIndex = (bottomIndex || 0) + @options.pageSize

    # console.log "TileGrid: ensuring viewport rows #{@topRenderIndex}-#{@bottomRenderIndex}"
    if @collection? && _.isFunction @collection.ensureRows
      @collection.ensureRows @topRenderIndex, @bottomRenderIndex, complete: @_onEnsureRowsComplete
    else
      # just assume this is a fully fetched collection if collection doesn't have pageableCollection mixin
      @_onEnsureRowsComplete()


  _onEnsureRowsComplete: () =>
    $tile = @findTileAt(@topRenderIndex)
    index = @topRenderIndex
    loop
      break unless $tile && $tile.length > 0
        
      model = @getItemData(index) if index?
      $nextTile = $tile.next('.tile')  # this is way faster than .find(".tile[data-index=...]") for each
      if model?
        @renderTile($tile, model)
      else
        $tile.remove()

      $tile = $nextTile
      break if (index += 1) > @bottomRenderIndex


    @_derenderOutsideTiles(@topRenderIndex, @bottomRenderIndex)


  getItemData: (index) =>
    @collection?.getItem?(index, warn: true) || @collection?.models[index] || @data[index]

  
  # returns {topDisplayIndex: int, bottomDisplayIndex: int}
  getViewingStats: () =>
    gridScrollDims = @_getGridScrollDims()
    $visibleTile = @_findTileInViewport(gridScrollDims)
    $topTile = $bottomTile = $visibleTile
    unless $visibleTile?.length > 0 
      return {topDisplayIndex: 0, bottomDisplayIndex: 0} 

    loop
      $prev = $topTile.prev('.tile')
      break if $prev.length <= 0 || !@_isInViewPort(@_getTileDims($prev), gridScrollDims)
      $topTile = $prev
    loop
      $next = $bottomTile.next('.tile')
      break if $next.length <= 0 || !@_isInViewPort(@_getTileDims($next), gridScrollDims)
      $bottomTile = $next
    return {
      topDisplayIndex: $topTile.data('index'), 
      bottomDisplayIndex: $bottomTile.data('index')
    }
      


  _getGridScrollDims: =>
    gridOffset = @$tilegrid.offset()
    gridTop = @$tilegrid.scrollTop()
    gridLeft = @$tilegrid.scrollLeft()
    h = @$tilegrid.height()
    w = @$tilegrid.width()
    return {
      top: gridTop + gridOffset.top
      left: gridLeft + gridOffset.left
      bottom: gridTop + gridOffset.top + h
      right: gridLeft + gridOffset.left + w
      height: h
      width: w
      gridOffsetTop: gridOffset.top
      gridOffsetLeft: gridOffset.left
    }

    
  _getTileDims: ($tile)=>
    tilePosition = $tile.offset()
    _.extend tilePosition,
      bottom: tilePosition.top + $tile.height()
      right: tilePosition.left + $tile.width()
    return tilePosition


  # uses a binary search to find a tile partially visible in the view port. 
  # returns the first found (probably not top left or bottom right visible. see getViewStats)
  _findTileInViewport: (gridScrollDims=@_getGridScrollDims()) =>
    $tiles = @$tilegrid.find('.tile')
    
    $tile = null
    half = Math.floor($tiles.length / 2)
    lastOffset = 0
    while (absHalf = Math.abs(half)) >= 2
      offset = Math.min(Math.max(0, lastOffset + half), $tiles.length - 1)
      $tile = $($tiles[offset])
      break if $tile.length <= 0 
      tileDims = @_getTileDims($tile)
      break if @_isInViewPort(tileDims, gridScrollDims)
      half = Math.floor(absHalf / 2)
      half *= -1 if tileDims.left > (gridScrollDims.gridOffsetLeft + gridScrollDims.width) || tileDims.top > (gridScrollDims.gridOffsetTop + gridScrollDims.height)
      lastOffset = offset
            
    return $tile
    
  
  _isInViewPort: (tileDims, gridScrollDims=@_getGridScrollDims()) =>
    horzVisible =    tileDims.right > gridScrollDims.gridOffsetLeft && tileDims.left < (gridScrollDims.gridOffsetLeft + gridScrollDims.width)
    vertVisible =    tileDims.bottom > gridScrollDims.gridOffsetTop && tileDims.top < (gridScrollDims.gridOffsetTop + gridScrollDims.height)
    
    return horzVisible && vertVisible
    
     
  # - only use this method if you are sure all of the models are in the collection or array and you don't need it
  # to paginate.
  # - only use this method for very light weight stuff
  renderAllTiles: (options={}) =>
    @lastRenderedIndex = -1
    @appendTile() for model in @collection?.models || @data


  _renderNextPage: (options={}) =>
    first = @lastRenderedIndex + 1
    last = first + @options.pageSize
    @lastFirst = first

    if @collection? && _.isFunction @collection.ensureRows
      @collection.ensureRows first, last, complete: @_onEnsureComplete
    else
      @_onEnsureComplete(first, last)

  
  _onEnsureComplete: (first, last, options={}) =>
    for index in [first...last]
      appendTileDidFail = !@appendTile(index)
      if index >= @getTotalItems() || appendTileDidFail
        break;
    
    @_endOfData() if index >= @getTotalItems() 
          
    options.success?()


  getTotalItems: () =>
    return 0 unless @collection?
    @collection?.getLength?() || @collection?.length || @data.length


  appendTile: (index = @lastRenderedIndex + 1) =>
    model = @getItemData(index)
    return false unless model?
    @lastRenderedIndex = index
    $tile = @_cloneTileTemplate(model, @options)
    $tile.attr('data-index', index)
    @$loadingIndicator.before $tile
    @renderTile($tile, model)
    return true


  _cloneTileTemplate: (model, options = {}) =>
    @$tileTemplate.clone()


  renderTileAt: (index) =>
    $tile = @tileAt(index)
    model = @getItemData(index)
    @renderTile($tile, model) if $tile and model


  renderTile: ($tile, model) =>
    return if $tile.hasClass('rendered')

    @_$tilesByModelId[model.id] = $tile
    model.on "remove", @_onModelRemove
    @_renderTileTemplate($tile, model)

    # we added height and width to this tile when it was derendered, remove them to let tile
    # size naturally to it's potentially new data
    $tile.removeAttr('style');
    
    $tile.toggleClass("selected", model.selected==true)
    $tile.addClass("rendered")
    $tile.attr('data-id', model.id)

    #Use underscore features in template
    if $tile.hasClass('underscore-tile')
      @underscroreTemplate ||= _.template(@tileTemplate)
      $tile.html(@underscroreTemplate(model.attributes))

    if @options.hideFunction && @options.hideFunction(model)
      $tile.addClass('hidden')

    @trigger 'tileRendered', $tile, model
    # give triggered code a chance to update the tile's dom before capturing position info


  _renderTileTemplate: ($tile, model) =>
    $tile.html(@_getTileTemplate($tile, model))   # children are all removed on destoy


  _getTileTemplate: ($tile, model) =>
    return @$tileTemplate.html()


  # this method doesn't return derendered tiles
  tileAt: (index) =>
    @_$tilesByModelId[@getItemData(index).id]


  # this method returns rendered and derendered tiles but is slower
  findTileAt: (index) =>
    @$tilegrid.find("> .tile[data-index='#{index}']")


  tileFor: (model) =>
    key = model.id || model
    @_$tilesByModelId[key]


  _endOfData: (options={}) =>
    @$loadingIndicator.hide()
    @debouncedRefresh()


  # returns true if loading indicator is visible or nearly
  _loadingInWindow: () =>
    # the effect of this is to hide the loading indicator until we actually start displaying data
    # this will not work (always return true) unless the @$element is visible on the page
    return false unless @$element.is(':visible') && @$loadingIndicator.is(':visible')
    
    outerHeight = @$element.outerHeight()
    outerWidth = @$element.outerWidth()

    if outerHeight> 5000
      console.error "dev error: the outer height of the .tilegrid element for #{@selector} is saying it's outer height " +
          "is greater that 5000.  You need to set the height to something other than auto. "
      scrollHeight = 5000
    else
      scrollHeight = outerHeight
      
    scrollWidth = if outerWidth > 5000 then 5000 else outerWidth
      
    scrollTop = @$element.scrollTop()
    scrollLeft = @$element.scrollLeft()
    scrollBottom = scrollTop + scrollHeight
    scrollRight = scrollLeft + scrollWidth
    loadingTop = @$loadingIndicator.position().top
    loadingLeft = @$loadingIndicator.position().left

    inWindow = loadingTop <  scrollBottom + @options.preloadCushion && 
      loadingLeft < scrollRight + @options.preloadCushion
    # console.log @selector, inWindow
    return inWindow


  _onCollectionReset: () =>
    @reset()
    @render()


  _onCollectionSync: () =>
    @debouncedRefresh()


  _onCollectionAdd: () =>
    @debouncedRender()


  _onModelRemove: (model) =>
    model.off "remove", @_onModelRemove
    $tile = @_$tilesByModelId[model.id]
    @_derenderTile($tile)
    # @debouncedRefresh()    # don't refresh, the collection will sync


  _onScroll: () =>
    @_renderViewport()


  _onResize: () =>
    @_renderViewport()


  _onTileGridClick: (evt) =>
    evt.preventDefault()        # prevent default if the user clicks outside of a tile but in the grid


  _derenderOutsideTiles: (topTileIndex, bottomTileIndex) =>
    numInView = bottomTileIndex - topTileIndex
    for tile in @$element.find('.tile.rendered')
      $tile = $(tile)
      index = $tile.data('index')
      # these are padded already by ensureViewport
      topAcceptable = topTileIndex # - Math.min(100, numInView)
      bottomAcceptable = bottomTileIndex # + Math.max(100, numInView)
      continue if index >= topAcceptable && index <= bottomAcceptable

      @_derenderTile($tile)


  _derenderTile: ($tile) =>
    return unless $tile && $tile.length > 0

    $tile.css
      height: $tile.height()
      width: $tile.width()
    # wipe out the children so the browser can reclaim memory
    @_renderDerenderedPlaceholder($tile)
    $tile.removeClass("rendered")
    $tile.removeClass("selected")
    modelId = $tile.data('id')
    return unless modelId?
    $tile.removeAttr('data-id', null)
    delete @_$tilesByModelId[modelId]

    zform =  $tile.data('zform')
    zform.destroy() if zform?


  _renderDerenderedPlaceholder: ($tile) =>
    $tile.html("<div class='placeholder'>. . .</div>")
