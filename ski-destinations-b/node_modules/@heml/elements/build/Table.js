'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Td = exports.Tr = exports.Table = undefined;

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

var Table = (0, _utils.createElement)('table', {
  attrs: true,
  containsText: true,
  rules: {
    '.table': [{ '@pseudo': 'root' }, '@default', { display: _utils.transforms.trueHide('table') }]
  },

  render(attrs, contents) {
    attrs.class += ' table';
    return _utils2.default.renderElement(
      'table',
      attrs,
      contents
    );
  }
});

var Tr = (0, _utils.createElement)('tr', {
  attrs: true,
  containsText: true,
  rules: {
    '.tr': [{ '@pseudo': 'root' }, '@default']
  },

  render(attrs, contents) {
    attrs.class += ' tr';
    return _utils2.default.renderElement(
      'tr',
      attrs,
      contents
    );
  }
});

var Td = (0, _utils.createElement)('td', {
  attrs: true,
  containsText: true,
  rules: {
    '.td': [{ '@pseudo': 'root' }, '@default']
  },

  render(attrs, contents) {
    attrs.class += ' td';
    return _utils2.default.renderElement(
      'td',
      attrs,
      contents
    );
  }
});

exports.Table = Table;
exports.Tr = Tr;
exports.Td = Td;