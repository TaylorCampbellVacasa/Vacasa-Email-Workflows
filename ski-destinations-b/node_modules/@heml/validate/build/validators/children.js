'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = children;

var _utils = require('@heml/utils');

var _lodash = require('lodash');

function children($node, _ref) {
  var tagName = _ref.tagName,
      requiredChildren = _ref.children;

  if ((0, _lodash.isArray)(requiredChildren)) {
    var _children = $node.children().toArray().map(function (c) {
      return c.name;
    });

    var foundRequiredChildren = (0, _lodash.intersection)(requiredChildren, _children);

    if (foundRequiredChildren.length < requiredChildren.length) {
      var missingRequiredChildren = (0, _lodash.difference)(requiredChildren, foundRequiredChildren);

      throw new _utils.HEMLError(`${tagName} is missing required children: ${missingRequiredChildren}`, $node);
    }
  }
};