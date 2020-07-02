'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Meta = require('./Meta');

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utils.createElement)('preview', {
  parent: ['head'],
  unique: true,

  render(attrs, contents) {
    _Meta2.default.set('preview', contents);

    return false;
  },

  flush() {
    var preview = _Meta2.default.get('preview');

    return preview ? _utils2.default.renderElement(
      'div',
      { 'class': 'preview', style: 'display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;' },
      preview,
      '&nbsp;&zwnj;'.repeat(200 - preview.length)
    ) : '';
  }
}); // eslint-disable-line no-unused-vars