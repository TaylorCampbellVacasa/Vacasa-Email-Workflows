'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Meta = require('./Meta');

var _Meta2 = _interopRequireDefault(_Meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utils.createElement)('subject', {
  parent: ['head'],
  unique: true,

  render(attrs, contents) {
    _Meta2.default.set('subject', contents);

    return false;
  },

  flush() {
    return _Meta2.default.get('subject') || '';
  }
}); // eslint-disable-line no-unused-vars