'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = function (originalElements) {
  var elements = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(originalElements)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var tag = _ref2[0];
      var originalRules = _ref2[1];

      var defaults = [];
      var pseudos = {};
      var rules = {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(originalRules)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref3 = _step2.value;

          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

          var selector = _ref4[0];
          var decls = _ref4[1];

          /** gather all the default values */
          if (findAtDecl(decls, 'default')) defaults.push(selector);

          /** gather all the pseudo selectors */
          var pseudo = findAtDecl(decls, 'pseudo');
          if (pseudo) pseudos[pseudo] = selector;

          /** remap the rules to always be { prop: RegExp, transform: Function } */
          rules[selector] = (0, _lodash.compact)(decls.map(function (decl) {
            if ((0, _lodash.isPlainObject)(decl) && (0, _keys2.default)(decl).length === 0) return;

            var prop = (0, _lodash.isPlainObject)(decl) ? (0, _keys2.default)(decl)[0] : decl;
            var transform = (0, _lodash.isPlainObject)(decl) ? (0, _values2.default)(decl)[0] : function () {};

            if ((0, _lodash.isString)(prop) && prop.startsWith('@')) return;

            return { prop: toRegExp(prop), transform };
          }));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      elements.push({ tag, defaults, pseudos, rules });
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

  return elements;
};

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * finds the given at declaration value
 * @param  {Array[Object]} decls the decls from an element
 * @param  {String}        the prop
 * @return {Any}           the found value
 */
function findAtDecl(decls, prop) {
  var foundDecls = decls.filter(function (decl) {
    return (0, _lodash.isPlainObject)(decl) && (0, _keys2.default)(decl).length > 0 && (0, _keys2.default)(decl)[0] === `@${prop}` || decl === `@${prop}`;
  });

  if (foundDecls.length === 0) {
    return;
  }

  var decl = foundDecls[0];

  return (0, _lodash.isPlainObject)(decl) ? (0, _values2.default)(decl)[0] : true;
}

/**
 * convert the given string to a regular expression
 * @param  {String|RegExp} prop  the string to convert
 * @return {RegExp}              the regular expression
 */


/**
   * remap the elements var to looks like this
   * [
   *   {
   *     tag: 'button',
   *     pseudos: { root: '.button', text: '.text' },
   *     defaults: [ '.button' ],
   *     rules: {
   *       '.button': [ { prop: /^background-color$/, tranform: () => {} } ],
   *       '.text': [ { prop: /^color$/, transform: function() { tranform here } } ],
   *     }
   *   }
   *   ...
   * ]
   */

/**
 * coerce the elements for use in the plugin
 * @param  {Object} elements the given elements
 * @return {Array}  elements in a more usable format
 */
function toRegExp(string) {
  if ((0, _lodash.isString)(string) && string.startsWith('/') && string.lastIndexOf('/') !== 0) {
    var pattern = string.substr(1, string.lastIndexOf('/') - 1);
    var opts = string.substr(string.lastIndexOf('/') + 1).toLowerCase();

    return new RegExp(pattern, opts.includes('i') ? opts : `${opts}i`);
  }

  if ((0, _lodash.isString)(string)) {
    return new RegExp(`^${(0, _lodash.escapeRegExp)(string)}$`, 'i');
  }

  return string;
}