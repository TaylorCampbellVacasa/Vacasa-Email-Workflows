'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _cssShorthandExpand = require('css-shorthand-expand');

var _cssShorthandExpand2 = _interopRequireDefault(_cssShorthandExpand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-expand-shorthand', function () {
  return function (root) {
    root.walkDecls(function (decl) {
      if (shouldExpand(decl.prop) && !!decl.value) {
        var expandedDecls = (0, _cssShorthandExpand2.default)(decl.prop, decl.value);

        if (!expandedDecls) {
          return;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(expandedDecls)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

            var prop = _ref2[0];
            var value = _ref2[1];

            decl.before(_postcss2.default.decl({ prop, value }));
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

        decl.remove();
      }
    });
  };
});


function shouldExpand(prop) {
  return ['background', 'font', 'margin'].includes(prop);
}