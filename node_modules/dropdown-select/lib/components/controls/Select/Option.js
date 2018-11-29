'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classNames = require('../../../utils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Option Component
var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  _createClass(Option, [{
    key: '_classes',

    // Private
    value: function _classes() {
      var _props = this.props,
          isFocused = _props.isFocused,
          optionClassName = _props.optionClassName;

      return (0, _classNames2.default)({
        'dropdown-select__options__option': !optionClassName,
        'dropdown-select__options__option--focused': isFocused
      }, optionClassName);
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          option = _props2.option,
          index = _props2.index,
          labelKey = _props2.labelKey;

      return _react2.default.createElement(
        'div',
        {
          className: this._classes(),
          onClick: function onClick() {
            return _this2.props.onClick(option);
          },
          onMouseOver: function onMouseOver() {
            return _this2.props.onMouseOver(index);
          }
        },
        labelKey ? option[labelKey] : option
      );
    }
  }]);

  return Option;
}(_react.Component);

// Export


exports.default = Option;