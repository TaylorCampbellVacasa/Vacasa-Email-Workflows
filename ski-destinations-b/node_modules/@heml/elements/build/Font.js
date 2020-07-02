'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

exports.default = (0, _utils.createElement)('font', {
  parent: ['head'],
  children: false,
  defaultAttrs: { href: '' },

  render(attrs, contents) {
    return [`<!--[if !mso]><!-->`, _utils2.default.renderElement('link', { href: attrs.href, rel: 'stylesheet', type: 'text/css' }), _utils2.default.renderElement(
      'style',
      { type: 'text/css' },
      `@import url(${attrs.href});`
    ), `<!--<![endif]-->`];
  }
});