'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createHtmlElement;

var _stringifyAttributes = require('./stringifyAttributes');

var _stringifyAttributes2 = _interopRequireDefault(_stringifyAttributes);

var _void = require('html-tags/void');

var _void2 = _interopRequireDefault(_void);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHtmlElement(_ref) {
  var name = _ref.name,
      attrs = _ref.attrs,
      _ref$contents = _ref.contents,
      contents = _ref$contents === undefined ? ' ' : _ref$contents;

  if (_void2.default.includes(name)) {
    return `<${name}${attrs ? (0, _stringifyAttributes2.default)(attrs) : ''} />`;
  }

  return `<${name}${attrs ? (0, _stringifyAttributes2.default)(attrs) : ''}>${contents || ' '}</${name}>`;
}