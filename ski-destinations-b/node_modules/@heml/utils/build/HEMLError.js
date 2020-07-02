'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEMLError = function (_Error) {
  (0, _inherits3.default)(HEMLError, _Error);

  function HEMLError(message, $node) {
    (0, _classCallCheck3.default)(this, HEMLError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HEMLError.__proto__ || (0, _getPrototypeOf2.default)(HEMLError)).call(this, message));

    _this.name = 'HEMLError';

    if ($node) {
      _this.$node = $node;
      _this.selector = buildExactSelector($node);
    }

    Error.captureStackTrace(_this, HEMLError);
    return _this;
  }

  return HEMLError;
}(Error);

exports.default = HEMLError;


function buildExactSelector($node) {
  var nodeSelector = buildSelector($node[0]);
  var strSelector = $node.parents().map(function (index, node) {
    return buildSelector(node);
  }).toArray().reverse().concat([nodeSelector]).join(' > ');

  var chopAfter = (0, _lodash.min)((0, _lodash.max)(0, strSelector.lastIndexOf('#')), (0, _lodash.max)(0, strSelector.lastIndexOf('html')), (0, _lodash.max)(0, strSelector.lastIndexOf('heml')));

  return strSelector.substr(chopAfter);
}

function buildSelector(node) {
  if (node.id) {
    return `#${node.id}`;
  }

  var tag = node.tagName.toLowerCase();
  var siblingsBefore = findSiblingsBefore(node);
  var siblingsAfter = findSiblingsAfter(node);
  var siblings = siblingsBefore.concat(siblingsAfter);

  var sameTag = siblings.filter(function (s) {
    return s.tagName.toLowerCase() === tag;
  });

  if (siblings.length === 0 || sameTag.length === 0) {
    return tag;
  }

  var sameTagAndClass = siblings.filter(function (s) {
    return s.className === node.className && s.tagName.toLowerCase() === tag;
  });

  if (node.className && sameTagAndClass.length === 0) {
    return `${tag}.${node.className.split(' ').join('.')}`;
  }

  return `${tag}:nth-child(${siblingsBefore.length + 1})`;
}

function findSiblingsBefore(node) {
  var siblings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!node.previousSibling) {
    return siblings;
  }

  if (node.previousSibling.tagName) {
    siblings = siblings.concat([node.previousSibling]);
  }

  return findSiblingsBefore(node.previousSibling, siblings);
}

function findSiblingsAfter(node) {
  var siblings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!node.nextSibling) {
    return siblings;
  }

  if (node.nextSibling.tagName) {
    siblings = siblings.concat([node.nextSibling]);
  }

  return findSiblingsAfter(node.nextSibling, siblings);
}