'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Meta = require('./Meta');

var _Meta2 = _interopRequireDefault(_Meta);

var _isAbsoluteUrl = require('is-absolute-url');

var _isAbsoluteUrl2 = _interopRequireDefault(_isAbsoluteUrl);

var _url = require('url');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
exports.default = (0, _utils.createElement)('base', {
  parent: ['head'],
  children: false,
  unique: true,
  defaultAttrs: { href: '' },

  render(attrs, contents) {
    _Meta2.default.set('base', attrs.href);

    return false;
  },

  preRender(_ref) {
    var $ = _ref.$;

    var base = (0, _lodash.first)($.findNodes('base'));

    if (base) {
      var baseUrl = base.attr('href');

      $('[href], [src]').each(function (i, node) {
        var attr = (0, _lodash.has)(node.attribs, 'href') ? 'href' : 'src';

        if ((0, _lodash.has)(node.attribs, attr) && !(0, _isAbsoluteUrl2.default)(node.attribs[attr])) {
          node.attribs[attr] = (0, _url.resolve)(baseUrl, node.attribs[attr]);
        }
      });
    }
  }
});