'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BaseSelect2 = require('../../shared/BaseSelect');

var _BaseSelect3 = _interopRequireDefault(_BaseSelect2);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _Arrow = require('../../shared/Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Dropdown Select
var Select = function (_BaseSelect) {
  _inherits(Select, _BaseSelect);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      placeholder: 'Select',
      options: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      disabled: false,
      autoComplete: true
    };
    return _this;
  }

  // Render


  _createClass(Select, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          placeholder = _state.placeholder,
          isOptionsOpen = _state.isOptionsOpen,
          inputFoucsed = _state.inputFoucsed,
          currentOptions = _state.currentOptions,
          focusedOptionIndex = _state.focusedOptionIndex,
          selectedOptionIndex = _state.selectedOptionIndex,
          disabled = _state.disabled;

      return _react2.default.createElement(
        'div',
        { className: this._getSelectClassName() },
        _react2.default.createElement(
          'div',
          { className: 'dropdown-select__container' },
          _react2.default.createElement('input', {
            tabIndex: this.props.tabIndex,
            disabled: disabled,
            className: this._getInputClassName(),
            ref: function ref(input) {
              return _this2.input = input;
            },
            placeholder: placeholder,
            type: 'text',
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            onChange: this.handleInputChange,
            onClick: this.handleInputClick,
            onKeyDown: this.handleKeyPress,
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false'
          }),
          _react2.default.createElement(_Arrow2.default, {
            disabled: disabled,
            isOptionsOpen: isOptionsOpen,
            onShowOptions: this.showOptions
          })
        ),
        _react2.default.createElement(_Options2.default, {
          ref: function ref(el) {
            return _this2.optionsContainer = _reactDom2.default.findDOMNode(el);
          },
          options: currentOptions,
          focusedOptionIndex: focusedOptionIndex,
          selectedOptionIndex: selectedOptionIndex,
          isOptionsOpen: isOptionsOpen,
          labelKey: this.props.labelKey,
          onOptionClick: this.handleOptionClick,
          onMouseDown: this.handleOptionsMouseDown,
          onOptionFoucsed: this.handleOptionFocused
        })
      );
    }
  }]);

  return Select;
}(_BaseSelect3.default);

// Export


exports.default = Select;