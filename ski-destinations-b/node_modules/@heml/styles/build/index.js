'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/** custom element expander */
var hemlstyles = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(contents) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options$elements, elements, _options$aliases, aliases, _options$plugins, plugins;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _options$elements = options.elements, elements = _options$elements === undefined ? {} : _options$elements, _options$aliases = options.aliases, aliases = _options$aliases === undefined ? {} : _options$aliases, _options$plugins = options.plugins, plugins = _options$plugins === undefined ? [] : _options$plugins;
            return _context.abrupt('return', (0, _postcss2.default)([].concat((0, _toConsumableArray3.default)(plugins), [

            // /** optimize css */
            (0, _postcssDiscardComments2.default)({ removeAll: false }), (0, _postcssMinifyGradients2.default)(), (0, _postcssNormalizeDisplayValues2.default)(), (0, _postcssNormalizeTimingFunctions2.default)(), (0, _postcssConvertValues2.default)({ length: false }), (0, _postcssCalc2.default)(), (0, _postcssOrderedValues2.default)(), (0, _postcssMinifySelectors2.default)(), (0, _postcssMinifyParams2.default)(), (0, _postcssDiscardOverridden2.default)(), (0, _postcssNormalizeString2.default)(), (0, _postcssMinifyFontValues2.default)({ removeQuotes: false }), (0, _postcssNormalizeRepeatStyle2.default)(), (0, _postcssNormalizePositions2.default)(), (0, _postcssDiscardEmpty2.default)(), (0, _postcssUniqueSelectors2.default)(), (0, _cssDeclarationSorter2.default)(), (0, _postcssMergeAdjacentMedia2.default)(), (0, _postcssDiscardDuplicates2.default)(), (0, _postcssMergeRules2.default)(),

            /** color handling */
            (0, _postcssColornamesToHex2.default)(), (0, _postcssRgbaHex2.default)({ rgbOnly: true, silent: true }), (0, _postcssColorRgbaFallback2.default)(), (0, _postcssHexFormat2.default)(),

            /** email fixes */
            (0, _postcssEmailImportant2.default)(), (0, _postcssExpandShorthand2.default)(), // so we can match for margin-top/margin-left etc.
            (0, _postcssZeroOutMargin2.default)(),

            /** expanding to match heml elements */
            (0, _postcssElementExpander2.default)({ elements, aliases }), (0, _postcssMergeLonghand2.default)(), (0, _postcssDiscardEmpty2.default)()])).process(contents, { parser: _postcssSafeParser2.default }));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function hemlstyles(_x2) {
    return _ref.apply(this, arguments);
  };
}();

/** email fixes */


/** format colors */


/** optimize css - credz to cssnano */


var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssSafeParser = require('postcss-safe-parser');

var _postcssSafeParser2 = _interopRequireDefault(_postcssSafeParser);

var _postcssDiscardComments = require('postcss-discard-comments');

var _postcssDiscardComments2 = _interopRequireDefault(_postcssDiscardComments);

var _postcssMinifyGradients = require('postcss-minify-gradients');

var _postcssMinifyGradients2 = _interopRequireDefault(_postcssMinifyGradients);

var _postcssNormalizeDisplayValues = require('postcss-normalize-display-values');

var _postcssNormalizeDisplayValues2 = _interopRequireDefault(_postcssNormalizeDisplayValues);

var _postcssNormalizeTimingFunctions = require('postcss-normalize-timing-functions');

var _postcssNormalizeTimingFunctions2 = _interopRequireDefault(_postcssNormalizeTimingFunctions);

var _postcssConvertValues = require('postcss-convert-values');

var _postcssConvertValues2 = _interopRequireDefault(_postcssConvertValues);

var _postcssCalc = require('postcss-calc');

var _postcssCalc2 = _interopRequireDefault(_postcssCalc);

var _postcssOrderedValues = require('postcss-ordered-values');

var _postcssOrderedValues2 = _interopRequireDefault(_postcssOrderedValues);

var _postcssMinifySelectors = require('postcss-minify-selectors');

var _postcssMinifySelectors2 = _interopRequireDefault(_postcssMinifySelectors);

var _postcssMinifyParams = require('postcss-minify-params');

var _postcssMinifyParams2 = _interopRequireDefault(_postcssMinifyParams);

var _postcssDiscardOverridden = require('postcss-discard-overridden');

var _postcssDiscardOverridden2 = _interopRequireDefault(_postcssDiscardOverridden);

var _postcssNormalizeString = require('postcss-normalize-string');

var _postcssNormalizeString2 = _interopRequireDefault(_postcssNormalizeString);

var _postcssMinifyFontValues = require('postcss-minify-font-values');

var _postcssMinifyFontValues2 = _interopRequireDefault(_postcssMinifyFontValues);

var _postcssNormalizeRepeatStyle = require('postcss-normalize-repeat-style');

var _postcssNormalizeRepeatStyle2 = _interopRequireDefault(_postcssNormalizeRepeatStyle);

var _postcssNormalizePositions = require('postcss-normalize-positions');

var _postcssNormalizePositions2 = _interopRequireDefault(_postcssNormalizePositions);

var _postcssDiscardEmpty = require('postcss-discard-empty');

var _postcssDiscardEmpty2 = _interopRequireDefault(_postcssDiscardEmpty);

var _postcssUniqueSelectors = require('postcss-unique-selectors');

var _postcssUniqueSelectors2 = _interopRequireDefault(_postcssUniqueSelectors);

var _cssDeclarationSorter = require('css-declaration-sorter');

var _cssDeclarationSorter2 = _interopRequireDefault(_cssDeclarationSorter);

var _postcssMergeAdjacentMedia = require('./plugins/postcss-merge-adjacent-media');

var _postcssMergeAdjacentMedia2 = _interopRequireDefault(_postcssMergeAdjacentMedia);

var _postcssDiscardDuplicates = require('postcss-discard-duplicates');

var _postcssDiscardDuplicates2 = _interopRequireDefault(_postcssDiscardDuplicates);

var _postcssMergeRules = require('postcss-merge-rules');

var _postcssMergeRules2 = _interopRequireDefault(_postcssMergeRules);

var _postcssRgbaHex = require('postcss-rgba-hex');

var _postcssRgbaHex2 = _interopRequireDefault(_postcssRgbaHex);

var _postcssColornamesToHex = require('postcss-colornames-to-hex');

var _postcssColornamesToHex2 = _interopRequireDefault(_postcssColornamesToHex);

var _postcssColorRgbaFallback = require('postcss-color-rgba-fallback');

var _postcssColorRgbaFallback2 = _interopRequireDefault(_postcssColorRgbaFallback);

var _postcssHexFormat = require('postcss-hex-format');

var _postcssHexFormat2 = _interopRequireDefault(_postcssHexFormat);

var _postcssExpandShorthand = require('./plugins/postcss-expand-shorthand');

var _postcssExpandShorthand2 = _interopRequireDefault(_postcssExpandShorthand);

var _postcssEmailImportant = require('postcss-email-important');

var _postcssEmailImportant2 = _interopRequireDefault(_postcssEmailImportant);

var _postcssZeroOutMargin = require('./plugins/postcss-zero-out-margin');

var _postcssZeroOutMargin2 = _interopRequireDefault(_postcssZeroOutMargin);

var _postcssElementExpander = require('./plugins/postcss-element-expander');

var _postcssElementExpander2 = _interopRequireDefault(_postcssElementExpander);

var _postcssMergeLonghand = require('postcss-merge-longhand');

var _postcssMergeLonghand2 = _interopRequireDefault(_postcssMergeLonghand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = hemlstyles;