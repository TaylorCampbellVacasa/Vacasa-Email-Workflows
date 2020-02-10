'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (element, aliases, rule) {
  if (!aliases) return;

  var selectors = [];

  rule.selectors.forEach(function (selector) {
    var matchedAliases = aliases.filter(function (alias) {
      return alias.is(selector.replace(/::?\S*/g, ''));
    }).length > 0;

    /** the selector in an alias that doesn't target the tag already */
    if (matchedAliases && !targetsTag(selector)) {
      selectors.push(appendElementSelector(element, selector));
    }

    /** dont add the original selector back in if it targets a pseudo selector */
    if (!targetsElementPseudo(element, selector)) {
      selectors.push(selector);
    }
  });

  rule.selectors = selectors;
};

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var simpleSelectorParser = (0, _postcssSelectorParser2.default)();

/**
 * Add the element tag to selectors from the rule that match the element alias
 * @param  {Object}       element element definition
 * @param  {Array[$node]} aliases array of cheerio nodes
 * @param  {Rule}         rule    postcss node
 */


/**
 * checks if selector targets a tag
 * @param  {String} selector the selector
 * @return {Boolean}         if the selector targets a tag
 */
function targetsTag(selector) {
  var selectors = simpleSelectorParser.process(selector).res;

  return selectors.filter(function (selector) {
    var selectorNodes = selector.nodes.concat([]).reverse(); // clone the array

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(selectorNodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;

        if (node.type === 'cominator') {
          break;
        }

        if (node.type === 'tag') {
          return true;
        }
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

    return false;
  }).length > 0;
}

/**
 * find all selectors that target the give element
 * @param  {Object} element  the element definition
 * @param  {String} selector the selector
 * @return {Array}           the matched selectors
 */
function targetsElementPseudo(element, selector) {
  var selectors = simpleSelectorParser.process(selector).res;

  return selectors.filter(function (selector) {
    var selectorNodes = selector.nodes.concat([]).reverse(); // clone the array

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(selectorNodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var node = _step2.value;

        if (node.type === 'cominator') {
          break;
        }

        if (node.type === 'pseudo' && node.value.replace(/::?/, '') in element.pseudos) {
          return true;
        }

        if (node.type === 'tag' && node.value === element.tag) {
          break;
        }
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

    return false;
  }).length > 0;
}

/**
 * Add the element tag to the end of the selector
 * @param  {Object} element  element definition
 * @param  {String} selector the selector
 * @return {String}          the modified selector
 */
function appendElementSelector(element, selector) {
  var processor = (0, _postcssSelectorParser2.default)(function (selectors) {
    var combinatorNode = null;

    /**
     * looping breaks if we insert dynamically
     */
    selectors.each(function (selector) {
      var elementNode = _postcssSelectorParser2.default.tag({ value: element.tag });
      selector.walk(function (node) {
        if (node.type === 'combinator') {
          combinatorNode = node;
        }
      });

      if (combinatorNode) {
        selector.insertAfter(combinatorNode, elementNode);
      } else {
        selector.prepend(elementNode);
      }
    });
  });

  return processor.process(selector).result;
}