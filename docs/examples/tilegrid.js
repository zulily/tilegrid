"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rd = ReactDatum;
var Tilegrid = ReactTilegrid;

var KittenModel = Backbone.Model.extend({
  save: function save(attrs, options) {
    options.success(this);
    return true;
  }
});
var KittenCollection = Backbone.Collection.extend({
  model: KittenModel
});

// KITTEN_DATA is a static array of data from petfinder api
//    that gets loaded via script tag for the examples
var kittenCollection = new KittenCollection(KITTEN_DATA);

// The above is all backbone setup that you would probably do 
// elsewhere or wouldn't need to do, like stub out model save

// Below is really most of what you need for a basic list
// left, form right type view.  All in 30 lines of code!

var TilegridDisplay = function (_React$Component) {
  _inherits(TilegridDisplay, _React$Component);

  function TilegridDisplay() {
    _classCallCheck(this, TilegridDisplay);

    return _possibleConstructorReturn(this, (TilegridDisplay.__proto__ || Object.getPrototypeOf(TilegridDisplay)).apply(this, arguments));
  }

  _createClass(TilegridDisplay, [{
    key: "render",
    value: function render() {
      return React.createElement(
        Rd.Collection,
        { collection: kittenCollection },
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(Rd.CollectionStats, { itemDisplayName: "Kittens" }),
          React.createElement(
            Tilegrid,
            null,
            React.createElement(Rd.LazyPhoto, { attr: "imageUrl" }),
            React.createElement(
              "h4",
              null,
              React.createElement(Rd.Text, { attr: "name" })
            ),
            React.createElement(Rd.Email, { attr: "breed" })
          )
        ),
        React.createElement(
          "div",
          { className: "preview" },
          React.createElement(
            Rd.SelectedModel,
            { placeholder: "Select a kitten to see information here" },
            React.createElement(Rd.LazyPhoto, { attr: "imageUrl" }),
            React.createElement(
              "div",
              { className: "top-right" },
              React.createElement(
                "h3",
                null,
                "Adopt ",
                React.createElement(Rd.Text, { attr: "name", readonly: true }),
                " Today!"
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  Rd.Link,
                  { attr: "petfinderUrl" },
                  "Show ",
                  React.createElement(Rd.Text, { attr: "name", readonly: true }),
                  " on Petfinder.com"
                )
              ),
              React.createElement(
                "div",
                null,
                React.createElement(Rd.Email, { attr: "contactEmail", label: "Email now:", displayAsLink: true, readonly: true })
              )
            ),
            React.createElement(
              Rd.ClickToEditForm,
              { className: "kitten-form" },
              React.createElement(
                "div",
                null,
                React.createElement(Rd.Text, { attr: "name", label: "Name: ", setOnChange: true, required: true })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(Rd.Email, { attr: "contactEmail", label: "Sponsor Email: " })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(Rd.Text, { attr: "description", className: "wide-input", ellipsizeAt: false, displayAsHtml: true })
              )
            )
          )
        )
      );
    }
  }]);

  return TilegridDisplay;
}(React.Component);

TilegridDisplay.displayName = "TilegridDisplay";


window.Demo = TilegridDisplay;