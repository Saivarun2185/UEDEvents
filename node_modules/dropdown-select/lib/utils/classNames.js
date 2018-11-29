'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function classNames() {
  var styles = [];

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.map(function (item) {
    if (typeof item == 'string') {
      styles.push(item);
    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          if (item[key]) {
            styles.push(key);
          }
        }
      }
    }
  });
  return styles.join(' ');
}

// Export
exports.default = classNames;