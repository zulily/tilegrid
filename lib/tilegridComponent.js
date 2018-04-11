(function() {
  var MultiSelect, React, ReactDom, SingleSelect, TilegridComponent, TilegridReactTiles,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('./lib/reactLegacy');

  ReactDom = require('react-dom');

  TilegridReactTiles = require('./tilegridReactTiles');

  SingleSelect = require('./singleSelect');

  MultiSelect = require('./multiSelect');

  module.exports = TilegridComponent = (function(superClass) {
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

    TilegridComponent.prototype.render = function() {
      return React.createElement("div", {
        "className": 'tilegrid-react'
      });
    };

    TilegridComponent.prototype.componentDidMount = function() {
      this.node = ReactDom.findDOMNode(this);
      this.collection = this.props.collection || this.context.collection;
      this.tileTemplate = this._getTileTemplate();
      this.tilegrid = new this.props.tilegridClass(this.node, this.collection, this.tileTemplate, this.props.tilegridOptions);
      if (this.props.tilegridSelectionClass != null) {
        return new this.props.tilegridSelectionClass(this.tilegrid, this.props.tilegridSelectOptions);
      }
    };

    TilegridComponent.prototype.componentWillUnmount = function() {
      React.unmountComponentAtNode(this.node);
      return this.tilegrid.destroy();
    };

    TilegridComponent.prototype.componentWillReceiveProps = function() {};

    TilegridComponent.prototype._getTileTemplate = function() {
      return this.props.tileTemplate || this._findTileChild();
    };

    TilegridComponent.prototype._findTileChild = function() {
      return this.props.children;
    };

    return TilegridComponent;

  })(React.Component);

}).call(this);
