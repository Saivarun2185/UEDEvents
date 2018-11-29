'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _classNames = require('../../utils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Dropdown Select
var BaseSelect = function (_Component) {
  _inherits(BaseSelect, _Component);

  function BaseSelect(props) {
    _classCallCheck(this, BaseSelect);

    var _this = _possibleConstructorReturn(this, (BaseSelect.__proto__ || Object.getPrototypeOf(BaseSelect)).call(this, props));

    _this.handleInputClick = _this.handleInputClick.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    _this.handleOptionClick = _this.handleOptionClick.bind(_this);
    _this.handleOptionsMouseDown = _this.handleOptionsMouseDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleInputFocus = _this.handleInputFocus.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleOptionFocused = _this.handleOptionFocused.bind(_this);
    _this.showOptions = _this.showOptions.bind(_this);
    _this._changeValueIfReq = _this._changeValueIfReq.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(BaseSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadProps(this.props, this._changeValueIfReq);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._loadProps(nextProps, this._changeValueIfReq);
    }

    // Handlers

  }, {
    key: 'handleInputChange',
    value: function handleInputChange(newValue) {
      this.setState({ focusedOptionIndex: 0 });
      this._filterOptions(newValue.target.value);
    }
  }, {
    key: 'handleInputClick',
    value: function handleInputClick(event) {
      this.setState({ inputFoucsed: true });
      this.showOptions(true);
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(event) {
      this.setState({ inputFoucsed: false });
      if (!this.state.isOptionSelected || this.state.currentOptions.length == 0) {
        this.setState({ isOptionsOpen: false, isOptionSelected: false });
      }
      this._restoreInputValue();
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus(e) {
      this.setState({ inputFoucsed: true });
      this.showOptions(true);
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(newOption) {
      this._changeOption(newOption);
    }
  }, {
    key: 'handleOptionsMouseDown',
    value: function handleOptionsMouseDown(e) {
      if (e.target !== this.optionsContainer) {
        this.setState({ isOptionSelected: true });
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(e) {
      var _state = this.state,
          currentOptions = _state.currentOptions,
          focusedOptionIndex = _state.focusedOptionIndex;

      switch (e.keyCode) {
        case 40:
          // Down Arrow
          e.preventDefault();
          e.stopPropagation();
          this._navigateOptions('down');
          break;
        case 38:
          // Up Arrow
          e.preventDefault();
          e.stopPropagation();
          this._navigateOptions('up');
          break;
        case 13:
          // Enter
          e.preventDefault();
          e.stopPropagation();
          this._changeOption(currentOptions[focusedOptionIndex]);
          break;
        case 27:
          // Esc
          this.showOptions(false);
          break;
        case 8:
          // Backspace
          this.showOptions(true);
          break;
      }
    }
  }, {
    key: 'handleOptionFocused',
    value: function handleOptionFocused(index) {
      this.setState({ focusedOptionIndex: index });
    }

    // Private

  }, {
    key: '_restoreInputValue',
    value: function _restoreInputValue() {
      var currentOption = this.state.currentOption;

      if (currentOption) {
        var label = this._getOptionLabel(currentOption);
        if (label != this.input.value) {
          this.input.value = label;
        }
      }
    }
  }, {
    key: '_changeValueIfReq',
    value: function _changeValueIfReq() {
      var _props = this.props,
          value = _props.value,
          returnValueOnly = _props.returnValueOnly;

      if (!value || value.length == 0) {
        return;
      }
      if (typeof value == 'string') {
        var option = this._getOptionByLabel(this._findLabelByValue(value));
        if (!option) {
          return;
        } else if (!returnValueOnly) {
          this._changeOption(option);
        } else if (returnValueOnly) {
          var index = this._findOptionIndexFromOptions(option);
          this.setState({
            focusedOptionIndex: index,
            selectedOptionIndex: index
          });
        }
      }
    }
  }, {
    key: '_changeOption',
    value: function _changeOption(newOption) {
      var onChange = this.props.onChange;

      var index = this._findOptionIndexFromOptions(newOption);
      this.setState({
        isOptionsOpen: false,
        isOptionSelected: false,
        focusedOptionIndex: index,
        selectedOptionIndex: index,
        currentOption: newOption
      });
      if (onChange) {
        this.props.onChange(this._getOptionValue(newOption));
      }
    }
  }, {
    key: '_getOptionValue',
    value: function _getOptionValue(option) {
      var _props2 = this.props,
          valueKey = _props2.valueKey,
          returnValueOnly = _props2.returnValueOnly;

      if (returnValueOnly) {
        return valueKey ? option[valueKey] : option;
      } else {
        return option;
      }
    }
  }, {
    key: '_findOptionIndexFromOptions',
    value: function _findOptionIndexFromOptions(option) {
      var labelKey = this.props.labelKey;

      return this.state.options.findIndex(function (item) {
        if (labelKey) {
          return item[labelKey] == option[labelKey];
        } else {
          return item == option;
        }
      });
    }
  }, {
    key: '_loadProps',
    value: function _loadProps(props, callback) {
      var _this2 = this;

      var options = props.options,
          value = props.value,
          labelKey = props.labelKey,
          autoComplete = props.autoComplete,
          placeholder = props.placeholder,
          disabled = props.disabled;

      if (autoComplete == false) {
        this.input.readOnly = true;
      }
      if (placeholder) {
        this.setState({ placeholder: placeholder });
      }
      if (typeof disabled == 'boolean') {
        this.setState({ disabled: disabled });
      }
      this._setValue(value);
      this._setOptions(options, function () {
        _this2._setInputValue(value, labelKey);
        if (callback) {
          callback();
        }
      });
    }
  }, {
    key: '_setValue',
    value: function _setValue(value) {
      this.setState({ value: value });
    }
  }, {
    key: '_setInputValue',
    value: function _setInputValue(newValue, labelKey) {
      var options = this.state.options;

      var type = typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue);
      var inputValue = '';
      if (options.length == 0) {
        inputValue = '';
      } else if (type == 'string' && newValue.length == 0) {
        inputValue = '';
      } else if (type == 'string') {
        inputValue = this._findLabelByValue(newValue);
      } else if (type == 'object' && !Array.isArray(newValue)) {
        inputValue = newValue[labelKey];
      }
      this.input.value = inputValue;
    }
  }, {
    key: '_getOptionByLabel',
    value: function _getOptionByLabel(label) {
      var _this3 = this;

      var options = this.state.options;

      var index = options.findIndex(function (option) {
        return _this3._getOptionLabel(option) == label;
      });
      return options[index];
    }
  }, {
    key: '_findLabelByValue',
    value: function _findLabelByValue(value) {
      var _this4 = this;

      var options = this.state.options;

      var index = options.findIndex(function (option) {
        return option[_this4.props.valueKey].toLowerCase() == value.toLowerCase();
      });
      return options[index][this.props.labelKey];
    }
  }, {
    key: '_filterOptions',
    value: function _filterOptions(newValue) {
      var _this5 = this;

      var options = this.state.options;

      var newOptions = [];
      if (newValue.length == 0) {
        newOptions = options;
      } else {
        newOptions = options.filter(function (option) {
          var label = _this5._getOptionLabel(option);
          return _this5._findSubStringIndex(label, newValue) !== -1;
        });
      }
      this.setState({ currentOptions: newOptions });
    }
  }, {
    key: '_getOptionLabel',
    value: function _getOptionLabel(option) {
      return (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' ? option[this.props.labelKey] : option;
    }
  }, {
    key: '_findSubStringIndex',
    value: function _findSubStringIndex(str, sub) {
      return str.toLowerCase().indexOf(sub.toLowerCase());
    }
  }, {
    key: '_navigateOptions',
    value: function _navigateOptions(dir) {
      if (!this.state.isOptionsOpen) {
        this.showOptions(true);
        return;
      }
      var _state2 = this.state,
          focusedOptionIndex = _state2.focusedOptionIndex,
          currentOptions = _state2.currentOptions;

      if (dir == 'down') {
        focusedOptionIndex += 1;
      } else if (dir == 'up') {
        focusedOptionIndex -= 1;
      }
      if (focusedOptionIndex < 0) {
        focusedOptionIndex = currentOptions.length - 1;
      } else if (focusedOptionIndex > currentOptions.length - 1) {
        focusedOptionIndex = 0;
      }
      this.setState({ focusedOptionIndex: focusedOptionIndex });
    }
  }, {
    key: 'showOptions',
    value: function showOptions(flag) {
      if (flag) {
        this.input.focus();
        this.setState({
          isOptionsOpen: true,
          inputFoucsed: true,
          currentOptions: this.state.options,
          focusedOptionIndex: this.state.selectedOptionIndex
        });
      } else {
        this.setState({
          isOptionsOpen: false,
          inputFoucsed: false,
          focusedOptionIndex: this.state.selectedOptionIndex
        });
      }
    }
  }, {
    key: '_setOptions',
    value: function _setOptions(options, callback) {
      if (!options) {
        return callback();
      }
      var optionsArr = [];
      if (this.props.defaultOption) {
        optionsArr = optionsArr.concat(this.props.defaultOption);
      }
      optionsArr = optionsArr.concat(options);
      this.setState({ options: optionsArr, currentOptions: optionsArr }, callback);
    }
  }, {
    key: '_getInputClassName',
    value: function _getInputClassName() {
      return (0, _classNames2.default)({
        'dropdown-select__input': !this.props.inputClassName
      }, this.props.inputClassName);
    }
  }, {
    key: '_getSelectClassName',
    value: function _getSelectClassName() {
      return (0, _classNames2.default)({
        'dropdown-select': !this.props.selectClassName,
        'dropdown-select--focused': this.state.inputFoucsed
      }, this.props.selectClassName);
    }
  }]);

  return BaseSelect;
}(_react.Component);

// Export


exports.default = BaseSelect;