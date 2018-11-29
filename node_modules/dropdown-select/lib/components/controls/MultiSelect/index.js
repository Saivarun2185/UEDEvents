'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _SelectDeselectAll = require('./SelectDeselectAll');

var _SelectDeselectAll2 = _interopRequireDefault(_SelectDeselectAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Dropdown Select
var MultiSelect = function (_BaseSelect) {
  _inherits(MultiSelect, _BaseSelect);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.state = {
      options: [],
      value: [],
      currentOptions: [],
      isOptionsOpen: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      selectedOptionIndex: 0,
      inputFoucsed: false,
      disabled: false
    };
    _this.handleCheckAllOptions = _this.handleCheckAllOptions.bind(_this);
    return _this;
  }

  // Handlers


  _createClass(MultiSelect, [{
    key: 'handleOptionClick',
    value: function handleOptionClick(option) {
      this.input.focus();
      this._changeOption(option);
    }
  }, {
    key: 'handleCheckAllOptions',
    value: function handleCheckAllOptions(flag) {
      flag ? this.props.onChange(this.state.options) : this.props.onChange([]);
    }

    // Private

  }, {
    key: '_setValue',
    value: function _setValue(value) {
      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      if (type == 'object' && Array.isArray(value)) {
        this.setState({ value: value });
      }
    }
  }, {
    key: '_changeOption',
    value: function _changeOption(newOption) {
      var value = this.state.value;
      var _props = this.props,
          labelKey = _props.labelKey,
          onChange = _props.onChange;

      var newValues = [];
      var isChecked = !this._findCheckedOption(newOption);
      if (isChecked) {
        newValues = value.concat(newOption);
      } else {
        newValues = value.filter(function (item) {
          if (labelKey) {
            return item[labelKey] !== newOption[labelKey];
          } else {
            return item !== newOption;
          }
        });
      }
      this.setState({
        isOptionSelected: false,
        focusedOptionIndex: this._findOptionIndexFromOptions(newOption),
        inputFoucsed: true
      });
      if (onChange) {
        this.props.onChange(newValues);
      }
    }
  }, {
    key: '_findCheckedOption',
    value: function _findCheckedOption(option) {
      return this._findOptionIndexFromValues(option) != -1;
    }
  }, {
    key: '_findOptionIndexFromValues',
    value: function _findOptionIndexFromValues(option) {
      var labelKey = this.props.labelKey;

      return this.state.value.findIndex(function (value) {
        if (labelKey) {
          return value[labelKey] == option[labelKey];
        } else {
          return value == option;
        }
      });
    }
  }, {
    key: '_renderPlaceholder',
    value: function _renderPlaceholder() {
      var _state = this.state,
          placeholder = _state.placeholder,
          value = _state.value,
          options = _state.options;

      var itemsCount = value.length;
      var singularName = 'Item';
      var pluralName = 'Items';
      if (typeof placeholder == 'string' && placeholder.length > 0) {
        singularName = pluralName = placeholder;
      } else if ((typeof placeholder === 'undefined' ? 'undefined' : _typeof(placeholder)) == 'object' && Array.isArray(placeholder)) {
        singularName = placeholder[0];
        pluralName = placeholder[1];
      }
      if (itemsCount == options.length) {
        return 'All ' + pluralName;
      } else if (itemsCount == 1) {
        return itemsCount + ' ' + singularName;
      } else if (itemsCount > 0) {
        return itemsCount + ' ' + pluralName;
      } else {
        return 'Select ' + singularName;
      }
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state2 = this.state,
          placeholder = _state2.placeholder,
          isOptionsOpen = _state2.isOptionsOpen,
          inputFoucsed = _state2.inputFoucsed,
          currentOptions = _state2.currentOptions,
          focusedOptionIndex = _state2.focusedOptionIndex,
          selectedOptionIndex = _state2.selectedOptionIndex,
          options = _state2.options,
          value = _state2.value,
          disabled = _state2.disabled;

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
            placeholder: this._renderPlaceholder(),
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
          _react2.default.createElement(_SelectDeselectAll2.default, {
            disabled: disabled,
            checked: options.length > 0 && options.length == value.length,
            onChange: this.handleCheckAllOptions
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
          values: value,
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

  return MultiSelect;
}(_BaseSelect3.default);

// Export


exports.default = MultiSelect;