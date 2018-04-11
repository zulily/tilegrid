"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rd = ReactDatum;
var ReactTilegrid = Tilegrid.ReactTilegrid;

// This is the source for the left-right iframe viewer used to
// view examples on our github.io pages like http://zulily.github.io/react-datum/docs/examples
//
// this file is created by bumble-docs if it doesn't exist in the docs/examples dir

// EXAMPLES_METADATA is loaded by the index.html from ./examplesMetadata.js which is generated
// by bumble-docs/scripts/buildExamples.coffee
var examplesCollection = new Backbone.Collection(EXAMPLES_METADATA.demos);

// Each of the demos are wrapped in their own .html which is generated using /src/docs/exampleFile.tpl  
// It makes each of them individually debuggable.  

var DemoIframe = function (_React$Component) {
  _inherits(DemoIframe, _React$Component);

  function DemoIframe() {
    _classCallCheck(this, DemoIframe);

    return _possibleConstructorReturn(this, (DemoIframe.__proto__ || Object.getPrototypeOf(DemoIframe)).apply(this, arguments));
  }

  _createClass(DemoIframe, [{
    key: "render",
    value: function render() {
      var model = this.getModel();
      var srcPath = model.get('path');
      var htmlPath = srcPath.replace(/(.*)(\.jsx|\.js|\.coffee|\.cjsx)/, "$1.html");
      return React.createElement("iframe", { src: htmlPath });
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return this.props.model || this.context.model;
    }
  }]);

  return DemoIframe;
}(React.Component);

DemoIframe.propTypes = {
  model: PropTypes.instanceOf(Backbone.Model)
};
DemoIframe.contextTypes = {
  model: React.PropTypes.object
};
DemoIframe.childContextTypes = {
  model: PropTypes.instanceOf(Backbone.Model)
};

var ExamplesView = function (_React$Component2) {
  _inherits(ExamplesView, _React$Component2);

  function ExamplesView() {
    _classCallCheck(this, ExamplesView);

    return _possibleConstructorReturn(this, (ExamplesView.__proto__ || Object.getPrototypeOf(ExamplesView)).apply(this, arguments));
  }

  _createClass(ExamplesView, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "examplesView" },
        React.createElement(
          Rd.Collection,
          { collection: examplesCollection },
          React.createElement(
            ReactTilegrid,
            null,
            React.createElement(Rd.LazyPhoto, { attr: "thumbnailUrl" }),
            React.createElement(
              "h4",
              null,
              React.createElement(Rd.Text, { attr: "name" })
            ),
            React.createElement(
              "div",
              null,
              React.createElement(Rd.Text, { attr: "description", ellipsizeAt: false, displayAsHtml: true })
            )
          ),
          React.createElement(
            "div",
            { className: "content-pane" },
            React.createElement(
              Rd.SelectedModel,
              { placeholder: "Select a demo from the list on the left" },
              React.createElement(DemoIframe, null)
            )
          )
        )
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window && window.location && window.location.hash) {
        var idToSelect = window.location.hash.slice(1);
        _.delay(function () {
          examplesCollection.selectModelById(idToSelect);
        }, 1000);
      }
      examplesCollection.on('selectionsChanged', function () {
        var model = examplesCollection.getSelectedModels()[0];
        window.location.hash = model && model.id || "";
      });
    }
  }]);

  return ExamplesView;
}(React.Component);

if (window) window.Demo = ExamplesView;else if (module) module.exports = ExamplesView;