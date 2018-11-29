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

var _classNames = require('./classNames');

var _classNames2 = _interopRequireDefault(_classNames);

var _CheckFieldOption = require('./CheckFieldOption');

var _CheckFieldOption2 = _interopRequireDefault(_CheckFieldOption);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _SelectAllControl = require('./SelectAllControl');

var _SelectAllControl2 = _interopRequireDefault(_SelectAllControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Dropdown Select
var MultiSelect = function (_Component) {
  _inherits(MultiSelect, _Component);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.state = {
      placeholder: 'Select',
      options: [],
      currentOptions: [],
      values: [],
      showOptions: false,
      isOptionSelected: false,
      focusedOptionIndex: 0,
      inputFoucsed: false
    };
    _this.handleInputClick = _this.handleInputClick.bind(_this);
    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
    _this.handleOptionClick = _this.handleOptionClick.bind(_this);
    _this.renderOptions = _this.renderOptions.bind(_this);
    _this.renderOption = _this.renderOption.bind(_this);
    _this.handleOptionsMouseDown = _this.handleOptionsMouseDown.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.showOptions = _this.showOptions.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.renderOptionsContainer = _this.renderOptionsContainer.bind(_this);
    _this.checkAllOptions = _this.checkAllOptions.bind(_this);
    return _this;
  }

  // Component LifeCycle


  _createClass(MultiSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          options = _props.options,
          value = _props.value,
          placeholder = _props.placeholder,
          autoComplete = _props.autoComplete;

      if (value) {
        this.setState({ values: value });
      }
      this.setOptions(options);
      if (placeholder) {
        this.setState({ placeholder: placeholder });
      }
      if (autoComplete == false) {
        this.input.readOnly = true;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var options = nextProps.options,
          value = nextProps.value;

      if (value) {
        this.setState({ values: value });
      }
      this.setOptions(options);
    }

    // Handlers

  }, {
    key: 'handleInputChange',
    value: function handleInputChange(newValue) {
      this.filterOptions(newValue.target.value);
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
        this.setState({ showOptions: false, isOptionSelected: false });
      }
    }
  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(option, index, isChecked) {
      this.input.focus();
      var values = this.state.values;
      var labelKey = this.props.labelKey;

      var newValues = [];
      if (isChecked) {
        newValues = values.concat(option);
      } else {
        newValues = values.filter(function (item) {
          if (labelKey) {
            return item[labelKey] !== option[labelKey];
          } else {
            return item !== option;
          }
        });
      }
      this.setState({
        isOptionSelected: false,
        focusedOptionIndex: index,
        inputFoucsed: true
      });
      this.props.onChange(newValues);
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
      this.showOptions(true);
      var _state = this.state,
          currentOptions = _state.currentOptions,
          focusedOptionIndex = _state.focusedOptionIndex;

      switch (e.keyCode) {
        case 40:
          // Down Arrow
          e.preventDefault();
          e.stopPropagation();
          this.navigateOptions('down');
          break;
        case 38:
          // Up Arrow
          e.preventDefault();
          e.stopPropagation();
          this.navigateOptions('up');
          break;
        case 13:
          // Enter
          e.preventDefault();
          e.stopPropagation();
          var option = currentOptions[focusedOptionIndex];
          this.handleOptionClick(option, focusedOptionIndex, !this.findCheckedOption(option));
          break;
        case 27:
          // Esc
          this.showOptions(false);
          break;
      }
    }
  }, {
    key: 'checkAllOptions',
    value: function checkAllOptions(flag) {
      flag ? this.props.onChange(this.state.options) : this.props.onChange([]);
    }

    // Private

  }, {
    key: 'filterOptions',
    value: function filterOptions(newValue) {
      var labelKey = this.props.labelKey;
      var options = this.state.options;

      var newOptions = [];
      if (newValue.length == 0) {
        newOptions = options;
      } else {
        newOptions = options.filter(function (option) {
          var label = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' ? option[labelKey] : option;
          return label.toLowerCase().indexOf(newValue.toLowerCase()) !== -1;
        });
      }
      this.setState({ currentOptions: newOptions });
    }
  }, {
    key: 'navigateOptions',
    value: function navigateOptions(dir) {
      var _this2 = this;

      if (!this.state.showOptions) {
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
      this.setState({ focusedOptionIndex: focusedOptionIndex }, function () {
        _this2.setFocusOption();
      });
    }
  }, {
    key: 'setFocusOption',
    value: function setFocusOption() {
      var panel = void 0,
          node = void 0;
      panel = this.optionsContainer;
      node = _reactDom2.default.findDOMNode(this.focusedOptionItem);
      if (node) {
        panel.scrollTop = node.offsetTop - panel.offsetTop;
      }
    }
  }, {
    key: 'showOptions',
    value: function showOptions(flag) {
      if (flag) {
        this.input.focus();
        this.setState({ showOptions: true, inputFoucsed: true });
        this.filterOptions(this.input.value);
      } else {
        this.setState({ showOptions: false, inputFoucsed: false });
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      this.setState({ options: options, currentOptions: options });
    }
  }, {
    key: 'findCheckedOption',
    value: function findCheckedOption(option) {
      return this.findOptionIndexFromValues(option) != -1;
    }
  }, {
    key: 'findOptionIndexFromValues',
    value: function findOptionIndexFromValues(option) {
      var labelKey = this.props.labelKey;

      return this.state.values.findIndex(function (value) {
        if (labelKey) {
          return value[labelKey] == option[labelKey];
        } else {
          return value == option;
        }
      });
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state3 = this.state,
          options = _state3.options,
          values = _state3.values,
          showOptions = _state3.showOptions,
          inputFoucsed = _state3.inputFoucsed;

      var inputClasses = (0, _classNames2.default)({
        'Dropdown-Select-input': !this.props.inputClassName
      }, this.props.inputClassName);

      return _react2.default.createElement(
        'div',
        { className: 'Dropdown-Select' },
        _react2.default.createElement('input', {
          className: inputClasses,
          ref: function ref(input) {
            return _this3.input = input;
          },
          placeholder: this.renderPlaceholder(),
          type: 'text',
          onBlur: this.handleInputBlur,
          onChange: this.handleInputChange,
          onClick: this.handleInputClick,
          onKeyDown: this.handleKeyPress
        }),
        _react2.default.createElement(_SelectAllControl2.default, {
          checked: options.length == values.length,
          onChange: this.checkAllOptions
        }),
        _react2.default.createElement(_Arrow2.default, { isOptionsVisible: showOptions, showOptions: this.showOptions }),
        this.renderOptionsContainer()
      );
    }
  }, {
    key: 'renderPlaceholder',
    value: function renderPlaceholder() {
      var _state4 = this.state,
          placeholder = _state4.placeholder,
          values = _state4.values,
          options = _state4.options;
      var placeholderName = this.props.placeholderName;

      var itemsCount = values.length;
      var scopeSingularName = placeholderName ? placeholderName[0] : 'Item';
      var scopePluralName = placeholderName ? placeholderName[1] : 'Items';
      if (itemsCount == options.length) {
        return 'All ' + scopePluralName;
      } else if (itemsCount == 1) {
        return itemsCount + ' ' + scopeSingularName;
      } else if (itemsCount > 0) {
        return itemsCount + ' ' + scopePluralName;
      } else {
        return 'Select ' + scopeSingularName;
      }
    }
  }, {
    key: 'renderOptionsContainer',
    value: function renderOptionsContainer() {
      var _this4 = this;

      var _state5 = this.state,
          showOptions = _state5.showOptions,
          currentOptions = _state5.currentOptions;

      var styles = (0, _classNames2.default)('options-container', {
        show: showOptions,
        hide: !showOptions
      });
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(el) {
            return _this4.optionsContainer = el;
          },
          className: styles,
          onMouseDown: this.handleOptionsMouseDown
        },
        this.renderOptions(currentOptions)
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(currentOptions) {
      if (currentOptions.length > 0) {
        return currentOptions.map(this.renderOption);
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'options-item' },
          'No options found...'
        );
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option, index) {
      var _this5 = this;

      return _react2.default.createElement(_CheckFieldOption2.default, {
        key: index,
        index: index,
        option: option,
        isFocused: this.state.focusedOptionIndex == index,
        isChecked: this.findCheckedOption(option),
        labelKey: this.props.labelKey,
        onClick: this.handleOptionClick,
        ref: function ref(el) {
          if (_this5.state.focusedOptionIndex == index) {
            _this5.focusedOptionItem = el;
          }
        }
      });
    }
  }]);

  return MultiSelect;
}(_react.Component);

// Export


exports.default = MultiSelect;