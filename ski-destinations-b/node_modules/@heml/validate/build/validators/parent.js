'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parent;

var _utils = require('@heml/utils');

function parent($node, _ref) {
  var tagName = _ref.tagName,
      allowedParents = _ref.parent;

  var parentTag = $node.parent().get(0);

  if (!parentTag) {
    return;
  }

  if (allowedParents.includes(parentTag.name)) {
    return;
  }

  var message = `${tagName} is inside of ${parentTag.name}.`;

  if (allowedParents.length === 0) {
    message = `${message} It may not have any parents.`;
  } else {
    message = `${message} It should only be used in: ${allowedParents.join(', ')}`;
  }

  throw new _utils.HEMLError(message, $node);
}