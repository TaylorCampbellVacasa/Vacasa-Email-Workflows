'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = attrs;

var _utils = require('@heml/utils');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nativeAttrs = ['id', 'class', 'dir', 'lang', 'accesskey', 'tabindex', 'title', 'translate'];

function attrs($node, _ref) {
  var tagName = _ref.tagName,
      allowedAttrs = _ref.attrs,
      defaultAttrs = _ref.defaultAttrs;

  /** allow any attributes through */
  if (allowedAttrs === true) {
    return;
  }

  allowedAttrs = allowedAttrs.concat((0, _keys2.default)(defaultAttrs)).concat(nativeAttrs);

  var usedAttrs = (0, _keys2.default)($node.get(0).attribs);

  var foundNotAllowedAttrs = (0, _lodash.difference)(usedAttrs, allowedAttrs);

  if (foundNotAllowedAttrs.length > 0) {
    /** remove non-whitelisted attributes */
    foundNotAllowedAttrs.forEach(function (attr) {
      return $node.removeAttr(attr);
    });

    var plural = foundNotAllowedAttrs.length > 1;
    throw new _utils.HEMLError(`Attribute${plural ? 's' : ''} ${foundNotAllowedAttrs.join(', ')} ${plural ? 'are' : 'is'} not allowed on ${tagName}.`, $node);
  }
}