
React = require('react')
ReactDom = require('react-dom')
$ = jQuery = require('jquery')

Tilegrid = require('./tilegrid')

# react datum model rerenders our tiles when the model changes and provides the context 'model'
RdModel = require('react-datum/src/model')

###
  this extension of the jquery tilegrid allows the use of ReactComponents as the tile template.

  See src/tilegrid for tile grid that can be used as a React component
  from JSX. 

  This class is not exported from index.js for simplicity.  If the user is using react components
  as tiles, why wouldn't they be be using the tilegrid as a React component? maybe wrong about that
###
module.exports = class TilegridReactTiles extends Tilegrid

  # extends - adds support for rendering react components
  setTileTemplate: (tileTemplate) =>
    if @isReactTemplate(tileTemplate)
      @$tileTemplate = tileTemplate
    else
      super    # super will try to coerce tileTemplate into a jQuery object


  isReactTemplate: (template = @_getTileTemplate()) =>
    # TODO : a better way of making this determination. as of React 0.14 this is the best I've got
    template = template[0] if _.isArray(template)
    _.intersection(['props', 'type', 'key'], _.keys(template)).length == 3 ||
      template.prototype instanceof React.Component


  # extends - adds support for rendering react components
  _renderTileTemplate: ($tile, model) =>
    template = @_getTileTemplate($tile, model)
    if @isReactTemplate(template)
      # Model below is a react-datum Model class.  Tilegrid wraps react tile
      # components in a contextual model object for model associated with this tile
      element = React.createElement(RdModel, {'model': model}, template)
      ReactDom.render(element, $tile[0])
    else
      super


  # extends super - need to unmount react model
  _renderDerenderedPlaceholder: ($tile) =>
    ReactDom.unmountComponentAtNode($tile[0]) if @isReactTemplate()
    super


  # overrides - returns unmutilated @$tileTemplate
  _getTileTemplate: ($tile, model) =>
    return @$tileTemplate


  # override - normally returns a @$tileTemplate.clone()
  _cloneTileTemplate: (model, options = {}) =>
    # this needs to return a jquery element - it's what get's pushed into the grid and our
    # reactive tile will render into it
    if @isReactTemplate()
      classNames = if (options.tileWrapperClassNames? && (typeof options.tileWrapperClassNames == "function")) then options.tileWrapperClassNames(model) else ""
      return $("<div class='tile #{classNames}'></div>")
    else
      return super
