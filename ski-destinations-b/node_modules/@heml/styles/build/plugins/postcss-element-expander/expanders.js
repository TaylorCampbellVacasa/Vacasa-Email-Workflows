'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandElementRule = exports.replaceElementPseudoMentions = exports.replaceElementTagMentions = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * replace all custom element tag selectors
 * @param  {Object} element  the element definition
 * @param  {String} selector the selector
 * @return {String}          the replaced selector
 */
function replaceElementTagMentions(element, selector) {
  var processor = (0, _postcssSelectorParser2.default)(function (selectors) {
    var nodesToReplace = [];

    /**
     * looping breaks if we replace dynamically
     * so instead collect an array of nodes to swap and do it at the end
     */
    selectors.walk(function (node) {
      if (node.value === element.tag && node.type === 'tag') {
        nodesToReplace.push(node);
      }
    });

    nodesToReplace.forEach(function (node) {
      return node.replaceWith(element.pseudos.root);
    });
  });

  return processor.process(selector).result;
}

/**
 * replace all custom element pseudo selectors
 * @param  {Object} element  the element definiton
 * @param  {String} selector the selector
 * @return {String}          the replaced selector
 */
function replaceElementPseudoMentions(element, selector) {
  var processor = (0, _postcssSelectorParser2.default)(function (selectors) {
    var nodesToReplace = [];

    /**
     * looping breaks if we replace dynamically
     * so instead collect an array of nodes to swap and do it at the end
     */
    selectors.each(function (selector) {
      var onElementTag = false;

      selector.each(function (node) {
        if (node.type === 'tag' && node.value === element.tag) {
          onElementTag = true;
        } else if (node.type === 'combinator') {
          onElementTag = false;
        } else if (node.type === 'pseudo' && onElementTag) {
          var matchedPseudos = (0, _entries2.default)(element.pseudos).filter(function (_ref) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
                pseudo = _ref2[0];

            return node.value.replace(/::?/, '') === pseudo;
          });

          if (matchedPseudos.length > 0) {
            var _matchedPseudos$ = (0, _slicedToArray3.default)(matchedPseudos[0], 2),
                value = _matchedPseudos$[1];

            nodesToReplace.push({ node, value });
          }
        }
      });
    });

    nodesToReplace.forEach(function (_ref3) {
      var node = _ref3.node,
          value = _ref3.value;
      return node.replaceWith(` ${value}`);
    });
  });

  return processor.process(selector).result;
}

/**
 * expand the given rule to correctly the style the element
 * @param {Object}       element      element The element definition
 * @param {Array}        selectors    the matched selectors to for
 * @return {Array[Rule]}              an array of the expanded rules
 */
function expandElementRule(element) {
  var selectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var originalRule = arguments[2];

  /** early return if we don't have any selectors */
  if (selectors.length === 0) return [];

  var usedProps = [];
  var expandedRules = [];
  var defaultRules = [];

  /** create the base rule */
  var baseRule = originalRule.clone();
  baseRule.selectors = selectors;
  baseRule.selector = replaceElementTagMentions(element, baseRule.selector);

  /** create postcss rules for each element rule */

  var _loop = function _loop(ruleSelector, ruleDecls) {
    var isRoot = element.pseudos.root === ruleSelector;
    var isDefault = element.defaults.includes(ruleSelector);
    var expandedRule = baseRule.clone();

    /** gather all rules that get decls be default */
    if (isDefault) {
      defaultRules.push(expandedRule);
    }

    /** map all the selectors to target this rule selector */
    if (!isRoot) {
      expandedRule.selectors = expandedRule.selectors.map(function (selector) {
        return `${selector} ${ruleSelector}`;
      });
    }

    /** strip any non whitelisted props, run tranforms, gather used props */
    expandedRule.walkDecls(function (decl) {
      var matchedRuleDecls = ruleDecls.filter(function (_ref6) {
        var prop = _ref6.prop;
        return prop.test(decl.prop);
      });

      if (matchedRuleDecls.length === 0) {
        return decl.remove();
      }

      usedProps.push(decl.prop);
      matchedRuleDecls.forEach(function (_ref7) {
        var transform = _ref7.transform;
        return transform(decl, originalRule);
      });
    });

    expandedRules.push(expandedRule);
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(element.rules)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref4 = _step.value;

      var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);

      var ruleSelector = _ref5[0];
      var ruleDecls = _ref5[1];

      _loop(ruleSelector, ruleDecls);
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

  baseRule.walkDecls(function (decl) {
    if (!usedProps.includes(decl.prop)) {
      defaultRules.forEach(function (defaultRule) {
        return defaultRule.prepend(decl.clone());
      });
    }
  });

  return expandedRules;
}

exports.replaceElementTagMentions = replaceElementTagMentions;
exports.replaceElementPseudoMentions = replaceElementPseudoMentions;
exports.expandElementRule = expandElementRule;