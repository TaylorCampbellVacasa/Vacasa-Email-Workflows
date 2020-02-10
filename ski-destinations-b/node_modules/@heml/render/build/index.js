'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderElement = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Run the async preRender functions for each element
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */
var preRenderElements = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(elements, globals) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 3;
            _iterator = (0, _getIterator3.default)(elements);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 12;
              break;
            }

            element = _step.value;
            _context2.next = 9;
            return element.preRender(globals);

          case 9:
            _iteratorNormalCompletion = true;
            _context2.next = 5;
            break;

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 18:
            _context2.prev = 18;
            _context2.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context2.prev = 21;

            if (!_didIteratorError) {
              _context2.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context2.finish(21);

          case 25:
            return _context2.finish(18);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function preRenderElements(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Run the async postRender functions for each element
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */


var postRenderElements = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(elements, globals) {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, element;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 3;
            _iterator2 = (0, _getIterator3.default)(elements);

          case 5:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 12;
              break;
            }

            element = _step2.value;
            _context3.next = 9;
            return element.postRender(globals);

          case 9:
            _iteratorNormalCompletion2 = true;
            _context3.next = 5;
            break;

          case 12:
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3['catch'](3);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 18:
            _context3.prev = 18;
            _context3.prev = 19;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 21:
            _context3.prev = 21;

            if (!_didIteratorError2) {
              _context3.next = 24;
              break;
            }

            throw _iteratorError2;

          case 24:
            return _context3.finish(21);

          case 25:
            return _context3.finish(18);

          case 26:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function postRenderElements(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Renders all HEML elements
 * @param  {Array}  elements  List of element definitons
 * @param  {Object} globals
 * @return {Promise}
 */


var renderElements = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(elements, globals) {
    var $, elementMap, metaTagNames, nonMetaTagNames, $nodes, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, $node, element, contents, attrs, renderedValue;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            $ = globals.$;
            elementMap = (0, _lodash.keyBy)(elements, 'tagName');
            metaTagNames = (0, _lodash.filter)(elements, { parent: ['head'] }).map(function (_ref6) {
              var tagName = _ref6.tagName;
              return tagName;
            });
            nonMetaTagNames = (0, _lodash.difference)(elements.map(function (_ref7) {
              var tagName = _ref7.tagName;
              return tagName;
            }), metaTagNames);
            $nodes = [].concat((0, _toConsumableArray3.default)($.findNodes(metaTagNames)), (0, _toConsumableArray3.default)($.findNodes(nonMetaTagNames).reverse()));
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context4.prev = 8;
            _iterator3 = (0, _getIterator3.default)($nodes);

          case 10:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context4.next = 22;
              break;
            }

            $node = _step3.value;
            element = elementMap[$node.prop('tagName').toLowerCase()];
            contents = $node.html();
            attrs = $node[0].attribs;
            _context4.next = 17;
            return _promise2.default.resolve((0, _renderElement2.default)(element, attrs, contents));

          case 17:
            renderedValue = _context4.sent;


            $node.replaceWith(renderedValue.trim());

          case 19:
            _iteratorNormalCompletion3 = true;
            _context4.next = 10;
            break;

          case 22:
            _context4.next = 28;
            break;

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4['catch'](8);
            _didIteratorError3 = true;
            _iteratorError3 = _context4.t0;

          case 28:
            _context4.prev = 28;
            _context4.prev = 29;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 31:
            _context4.prev = 31;

            if (!_didIteratorError3) {
              _context4.next = 34;
              break;
            }

            throw _iteratorError3;

          case 34:
            return _context4.finish(31);

          case 35:
            return _context4.finish(28);

          case 36:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[8, 24, 28, 36], [29,, 31, 35]]);
  }));

  return function renderElements(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

var _lodash = require('lodash');

var _renderElement = require('./renderElement');

var _renderElement2 = _interopRequireDefault(_renderElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.renderElement = _renderElement2.default;

/**
 * preRender, render, and postRender all elements
 * @param  {Array}   elements  List of element definitons
 * @param  {Object}  globals
 * @return {Promise}           Returns an object with the cheerio object and metadata
 */

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee($) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options$elements, elements, globals, Meta;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _options$elements = options.elements, elements = _options$elements === undefined ? [] : _options$elements;
            globals = { $, elements, options };
            Meta = (0, _lodash.first)(elements.filter(function (_ref2) {
              var tagName = _ref2.tagName;
              return tagName === 'meta';
            }));
            _context.next = 5;
            return preRenderElements(elements, globals);

          case 5:
            _context.next = 7;
            return renderElements(elements, globals);

          case 7:
            _context.next = 9;
            return postRenderElements(elements, globals);

          case 9:
            return _context.abrupt('return', { $, metadata: Meta ? Meta.flush() : {} });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function render(_x2) {
    return _ref.apply(this, arguments);
  }

  return render;
}();