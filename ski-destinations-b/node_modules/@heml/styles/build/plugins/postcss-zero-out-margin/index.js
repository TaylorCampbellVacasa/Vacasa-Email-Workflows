'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * convert margin-top/margin-bottom to 0 when they are margin auto
 */
exports.default = _postcss2.default.plugin('postcss-zero-out-margin', function () {
  return function (root) {
    root.walkDecls(/margin-top|margin-bottom/i, function (decl) {
      decl.value = decl.value.toLowerCase() === 'auto' ? '0' : decl.value;
    });
  };
});