"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Arrow Component
var Arrow = function (_Component) {
  _inherits(Arrow, _Component);

  function Arrow(props) {
    _classCallCheck(this, Arrow);

    var _this = _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this, props));

    _this.state = {
      isOptionsOpen: false
    };
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(Arrow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._loadProps(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._loadProps(nextProps);
    }

    // Private

  }, {
    key: "_loadProps",
    value: function _loadProps(props) {
      var isOptionsOpen = props.isOptionsOpen;

      this.setState({ isOptionsOpen: isOptionsOpen });
    }

    // Handlers

  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e.preventDefault();
      var _props = this.props,
          onShowOptions = _props.onShowOptions,
          disabled = _props.disabled;

      if (!disabled) {
        onShowOptions(!this.state.isOptionsOpen);
      }
    }

    // Render

  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        {
          className: "dropdown-select__arrow",
          onMouseDown: this.handleMouseDown
        },
        this.renderArrow()
      );
    }
  }, {
    key: "renderArrow",
    value: function renderArrow() {
      if (this.state.isOptionsOpen) {
        return _react2.default.createElement("i", { className: "dropdown-select__arrow-icon arrow-up" });
      } else {
        return _react2.default.createElement("i", { className: "dropdown-select__arrow-icon arrow-down" });
      }
    }
  }]);

  return Arrow;
}(_react.Component);

// Export


exports.default = Arrow;