'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;

var _utils = require('@heml/utils');

function unique($node, _ref, $) {
  var tagName = _ref.tagName,
      shouldBeUnique = _ref.unique;

  var $nodes = $.findNodes(tagName);

  if ($nodes.length > 1 && shouldBeUnique) {
    /** remove all but the first $node */
    $nodes.slice(1).forEach(function ($node) {
      return $node.remove();
    });

    throw new _utils.HEMLError(`${tagName} should be unique. ${$nodes.length} were found.`, $node);
  }
}