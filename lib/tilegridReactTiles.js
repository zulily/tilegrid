(function() {
  var $, ModelWatcher, React, ReactDom, Tilegrid, TilegridReactTiles, jQuery,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('./lib/reactLegacy');

  ReactDom = require('react-dom');

  $ = jQuery = require('jquery');

  Tilegrid = require('./tilegrid');

  ModelWatcher = require('./lib/modelWatcher');


  /*
    this extension of the jquery tilegrid allows the use of ReactComponents as the tile template.
  
    See src/tilegrid for tile grid that can be used as a React component
    from JSX. 
  
    This class is not exported from index.js for simplicity.  If the user is using react components
    as tiles, why wouldn't they be be using the tilegrid as a React component? maybe wrong about that
   */

  module.exports = TilegridReactTiles = (function(superClass) {
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

    TilegridReactTiles.prototype.setTileTemplate = function(tileTemplate) {
      if (this.isReactTemplate(tileTemplate)) {
        return this.tileTemplate = tileTemplate;
      } else {
        return TilegridReactTiles.__super__.setTileTemplate.apply(this, arguments);
      }
    };

    TilegridReactTiles.prototype.isReactTemplate = function(template) {
      if (template == null) {
        template = this._getTileTemplate();
      }
      if (_.isArray(template)) {
        template = template[0];
      }
      return _.intersection(['props', 'type', 'key'], _.keys(template)).length === 3 || template.prototype instanceof React.Component;
    };

    TilegridReactTiles.prototype._renderTileTemplate = function($tile, model) {
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

    TilegridReactTiles.prototype._renderDerenderedPlaceholder = function($tile) {
      var template;
      template = this._getTileTemplate();
      if (this.isReactTemplate(template) || _.isFunction(template)) {
        ReactDom.unmountComponentAtNode($tile[0]);
      }
      return TilegridReactTiles.__super__._renderDerenderedPlaceholder.apply(this, arguments);
    };

    TilegridReactTiles.prototype._getTileTemplate = function($tile, model) {
      return this.tileTemplate;
    };

    TilegridReactTiles.prototype._cloneTileTemplate = function(model, options) {
      var classNames, template;
      if (options == null) {
        options = {};
      }
      template = this._getTileTemplate();
      if (this.isReactTemplate(template) || _.isFunction(template)) {
        classNames = (options.tileWrapperClassNames != null) && (typeof options.tileWrapperClassNames === "function") ? options.tileWrapperClassNames(model) : "";
        return $("<div class='tile " + classNames + "'></div>");
      } else {
        return TilegridReactTiles.__super__._cloneTileTemplate.apply(this, arguments);
      }
    };

    return TilegridReactTiles;

  })(Tilegrid);

}).call(this);
