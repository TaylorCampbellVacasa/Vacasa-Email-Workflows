'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _coerceElements = require('./coerceElements');

var _coerceElements2 = _interopRequireDefault(_coerceElements);

var _tagAliasSelectors = require('./tagAliasSelectors');

var _tagAliasSelectors2 = _interopRequireDefault(_tagAliasSelectors);

var _findDirectElementSelectors = require('./findDirectElementSelectors');

var _findDirectElementSelectors2 = _interopRequireDefault(_findDirectElementSelectors);

var _expanders = require('./expanders');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * elements var looks like this before being coerced
 *
 * {
 *   button: {
 *     '.button': [ { '@pseudo': 'root' }, { '@default': true }, 'background-color' ],
 *     '.text': [ { '@pseudo': 'text' }, { color: function() { tranform here } } ],
 *   },
 *   ...
 * }
 */

/**
 * aliases var looks like this
 *
 * {
 *   button: [ $node, $node, $node, ... ]
 *   ...
 * }
 */

/**
 * Convert CSS to match custom elements
 * @param  {Object} options.elements An object of elements that define how to
 *                                   split up the css for each element
 * @param  {[type]} options.$        A cheerio instance
 */
exports.default = _postcss2.default.plugin('postcss-element-expander', function (_ref) {
  var elements = _ref.elements,
      aliases = _ref.aliases;

  elements = (0, _coerceElements2.default)(elements);

  return function (root, result) {
    var _loop = function _loop(element) {
      /**
       * add the element tag to any css selectors that implicitly target an element
       * .i.e. #my-button that selects <button id="my-button">click me</button>
       */
      root.walkRules(function (rule) {
        (0, _tagAliasSelectors2.default)(element, aliases[element.tag], rule);
      });

      /**
       * There are 3 (non-mutually exclusive) possibilities when it contains the element tag
       *
       * 1. it directly targets the element - i.e. button { background: blue; }
       *    in this case we need generate entirely new rules, prepend before the original rule, and strip the used selectors
       *
       * 2. it uses an element tag as an ancestor/sibling - .i.e. button span { color: black; }
       *
       * 3. it uses an element pseudo element - .i.e. button::text { color: blue }
       */
      root.walkRules(new RegExp(element.tag, 'i'), function (rule) {
        /** CASE 1 */
        /** grab all the selectors that target this element */
        var elementSelectors = (0, _findDirectElementSelectors2.default)(element, rule.selector);

        /** Create new rules to properly target the elements */
        var expandedRules = (0, _expanders.expandElementRule)(element, elementSelectors, rule);
        expandedRules.forEach(function (expandedRule) {
          return rule.before(expandedRule);
        });

        /** remove the directly targeting selectors from the original rule */
        rule.selectors = rule.selectors.filter(function (selector) {
          return !elementSelectors.includes(selector);
        });

        /** remove the rule if has no selectors */
        if (rule.selector.trim() === '') return rule.remove();

        /** CASE 2 */
        /** Replace all mentions of the element pseudo elements */
        rule.selector = (0, _expanders.replaceElementPseudoMentions)(element, rule.selector);

        /** CASE 3 */
        /** Replace all mentions of the element tag */
        rule.selector = (0, _expanders.replaceElementTagMentions)(element, rule.selector);
      });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var element = _step.value;

        _loop(element);
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
  };
});