'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _classNames = require('../../../utils/classNames');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Vendor Imports


// Local Imports


// Options
var Options = function (_Component) {
  _inherits(Options, _Component);

  function Options(props) {
    _classCallCheck(this, Options);

    var _this = _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).call(this, props));

    _this.state = {
      isOptionsOpen: false,
      focusedOptionIndex: 0,
      options: [],
      values: []
    };
    return _this;
  }

  // Component LifeCycle


  _createClass(Options, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadProps(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._loadProps(nextProps);
    }

    // Private

  }, {
    key: '_loadProps',
    value: function _loadProps(props) {
      var options = props.options,
          values = props.values,
          isOptionsOpen = props.isOptionsOpen,
          focusedOptionIndex = props.focusedOptionIndex;

      if (focusedOptionIndex !== this.state.focusedOptionIndex) {
        this.setState({ focusedOptionIndex: focusedOptionIndex }, this._setFocusOption);
      }
      this.setState({ options: options, values: values, isOptionsOpen: isOptionsOpen });
    }
  }, {
    key: '_setFocusOption',
    value: function _setFocusOption() {
      var panel = void 0,
          node = void 0;
      panel = _reactDom2.default.findDOMNode(this);
      node = _reactDom2.default.findDOMNode(this.focusedOptionItem);
      if (node) {
        var nodePos = node.offsetHeight + node.offsetTop;
        var panelPos = panel.offsetHeight + panel.scrollTop;
        if (nodePos < panelPos && nodePos <= panel.offsetHeight) {
          panel.scrollTop = 0;
        } else if (nodePos <= panelPos && nodePos + panel.offsetHeight <= panelPos) {
          panel.scrollTop = panel.scrollTop - node.offsetHeight;
        } else if (nodePos <= panelPos && nodePos + panel.offsetHeight > panelPos) {
          return;
        } else {
          var diff = Math.abs(nodePos - panelPos);
          panel.scrollTop += diff;
        }
      }
    }
  }, {
    key: '_classes',
    value: function _classes() {
      return (0, _classNames2.default)({
        'dropdown-select__options': !this.props.optionsClassName,
        'dropdown-select__options-open': this.state.isOptionsOpen,
        'dropdown-select__options-close': !this.state.isOptionsOpen
      }, this.props.optionsClassName);
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

      return this.state.values.findIndex(function (value) {
        if (labelKey) {
          return value[labelKey] == option[labelKey];
        } else {
          return value == option;
        }
      });
    }

    // Handler

  }, {
    key: 'handleOptionRef',
    value: function handleOptionRef(node, index) {
      if (this.state.focusedOptionIndex == index) {
        this.focusedOptionItem = node;
      }
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      var options = this.props.options;

      return _react2.default.createElement(
        'div',
        { className: this._classes(), onMouseDown: this.props.onMouseDown },
        this.renderOptions()
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var options = this.state.options;

      if (options.length > 0) {
        return options.map(this.renderOption.bind(this));
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'dropdown-select__options__option' },
          'No options found...'
        );
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option, index) {
      var _this2 = this;

      var focusedOptionIndex = this.state.focusedOptionIndex;
      var _props = this.props,
          labelKey = _props.labelKey,
          onOptionClick = _props.onOptionClick,
          onOptionFoucsed = _props.onOptionFoucsed;

      return _react2.default.createElement(_Option2.default, {
        key: index,
        index: index,
        option: option,
        isChecked: this._findCheckedOption(option),
        isFocused: focusedOptionIndex == index,
        labelKey: labelKey,
        onClick: onOptionClick,
        ref: function ref(node) {
          return _this2.handleOptionRef(node, index);
        },
        onMouseOver: onOptionFoucsed
      });
    }
  }]);

  return Options;
}(_react.Component);

// Export


exports.default = Options;