(function() {
  var ModelWatcher, React, _,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  React = require('./reactLegacy');

  _ = require('underscore');


  /*
    This was stolen from react-datum  ContextualData component
   */

  module.exports = ModelWatcher = (function(superClass) {
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

    ModelWatcher.prototype.getChildContext = function() {
      var c;
      c = {};
      c[this.contextKey] = this.state.model;
      return c;
    };

    ModelWatcher.prototype.render = function() {
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

    ModelWatcher.prototype.renderContent = function() {
      if ((this.state.model != null) || this.props.placeholder === void 0) {
        return this.props.children;
      }
      return this.props.placeholder;
    };


    /* !pragma coverage-skip-next */

    ModelWatcher.prototype.componentWillUnmount = function() {
      return this.unbindEvents();
    };

    ModelWatcher.prototype.componentWillMount = function() {
      return this.initializeModel();
    };


    /* !pragma coverage-skip-next */

    ModelWatcher.prototype.componentWillReceiveProps = function(newProps) {
      this.props = newProps;
      return this.initializeModel();
    };


    /*
      extend this method to provide additional initialization on the 
      thing you provide.  You should probably call super
     */

    ModelWatcher.prototype.initializeModel = function() {
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

    ModelWatcher.prototype.getInputmodel = function() {
      return this.props[this.contextKey] || this.context[this.contextKey];
    };


    /*
      override or extend this method to provide something other than what we recieve
     */

    ModelWatcher.prototype.getModelToProvide = function() {
      return this.getInputmodel();
    };


    /*
      extend this method to provide additional tests to determine if initialization is 
      needed.  You should probably extend this method like so:
      ```
        return super() || this._someOtherTest()
      ```
     */

    ModelWatcher.prototype.needsReinitializing = function() {
      var model, truth;
      model = this.getModelToProvide();
      truth = (this.state.model == null) || model !== this._lastPropsModel;
      this._lastPropsModel = model;
      return truth;
    };

    ModelWatcher.prototype.setmodel = function() {
      var model;
      model = this.getModelToProvide();
      this.setState({
        model: model
      });
      return this.state.model = model;
    };

    ModelWatcher.prototype.bindEvents = function() {
      var ref;
      return (ref = this.state.model) != null ? typeof ref.on === "function" ? ref.on('all', this.onDataChanged, this) : void 0 : void 0;
    };

    ModelWatcher.prototype.unbindEvents = function() {
      var ref;
      return (ref = this.state.model) != null ? typeof ref.off === "function" ? ref.off('all', this.onDataChanged) : void 0 : void 0;
    };

    ModelWatcher.prototype.onDataChanged = function() {
      return this.debouncedUpdate();
    };

    ModelWatcher.prototype.update = function() {
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

  })(React.Component);

}).call(this);
