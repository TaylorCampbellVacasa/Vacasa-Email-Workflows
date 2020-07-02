'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

var metaMap = void 0;

exports.default = (0, _utils.createElement)('meta', {
  attrs: true,
  parent: ['head'],

  preRender() {
    metaMap = new _map2.default([['meta', []]]);
  },

  render(attrs, contents) {
    metaMap.get('meta').push(attrs);

    return true;
  },

  get(key) {
    return metaMap.get(key);
  },

  set(key, value) {
    return metaMap.set(key, value);
  },

  flush() {
    var metaObject = {};

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(metaMap), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        metaObject[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    metaMap = null;

    return metaObject;
  }
});