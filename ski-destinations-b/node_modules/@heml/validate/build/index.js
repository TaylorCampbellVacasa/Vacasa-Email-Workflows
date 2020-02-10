'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

exports.default = validate;

var _validators = require('./validators');

var validatorsObject = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validators = (0, _values2.default)(validatorsObject);

/**
* Validate that a cheerio instance contains valid HEML
* @param  {Cheero} $         the heml cheerio
* @param  {Object} options
* @return {Array[HEMLError]} an array of heml errors
*/
function validate($) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$elements = options.elements,
      elements = _options$elements === undefined ? [] : _options$elements;


  var errors = [];

  var _loop = function _loop(element) {
    var matchedValidators = validators.filter(function (validator) {
      return validator.name in element;
    });

    if (matchedValidators.length === 0) {
      return {
        v: void 0
      };
    }

    var $nodes = $.findNodes(element.tagName);

    $nodes.forEach(function ($node) {
      return matchedValidators.forEach(function (validator) {
        try {
          validator($node, element, $);
        } catch (e) {
          errors.push(e);
        }
      });
    });
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;

      var _ret = _loop(element);

      if (typeof _ret === "object") return _ret.v;
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

  return errors;
}