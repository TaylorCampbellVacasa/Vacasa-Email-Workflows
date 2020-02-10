'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _styles = require('@heml/styles');

var _styles2 = _interopRequireDefault(_styles);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
var START_EMBED_CSS = `/*!***START:EMBED_CSS*****/`;
var START_INLINE_CSS = `/*!***START:INLINE_CSS*****/`;

var styleMap = void 0;
var options = void 0;

exports.default = (0, _utils.createElement)('style', {
  parent: ['head'],
  attrs: ['for', 'heml-embed'],
  defaultAttrs: {
    'heml-embed': false,
    'for': 'global'
  },

  preRender(_ref) {
    var $ = _ref.$,
        elements = _ref.elements;

    styleMap = new _map2.default([['global', []]]);
    options = {
      plugins: [],
      elements: {},
      aliases: {}
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(elements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var element = _step.value;

        if (element.postcss) {
          options.plugins = options.plugins.concat((0, _lodash.castArray)(element.postcss));
        }

        if (element.rules) {
          options.elements[element.tagName] = element.rules;
        }

        options.aliases[element.tagName] = $.findNodes(element.tagName);
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
  },

  render(attrs, contents) {
    if (!styleMap.get(attrs.for)) {
      styleMap.set(attrs.for, []);
    }

    styleMap.get(attrs.for).push({
      embed: !!attrs['heml-embed'],
      ignore: !!attrs['heml-ignore'],
      css: contents
    });

    return false;
  },

  flush() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var globalStyles, ignoredCSS, fullCSS, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ref2, _ref3, element, styles, _ref4, processedCss, processedCssParts, html, lastType, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, cssPart, css, type;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              /**
               * reverse the styles so they fall in an order that mirrors their position
               * - they get rendered bottom to top - should be styled top to bottom
               *
               * the global styles should always be rendered last
               */
              globalStyles = styleMap.get('global');

              styleMap.delete('global');
              styleMap = new _map2.default([].concat((0, _toConsumableArray3.default)(styleMap)).reverse());
              styleMap.set('global', globalStyles);

              ignoredCSS = [];
              fullCSS = '';

              /** combine the non-ignored css to be combined */

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 9;
              for (_iterator2 = (0, _getIterator3.default)(styleMap); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _ref2 = _step2.value;
                _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
                element = _ref3[0];
                styles = _ref3[1];

                styles = (0, _lodash.uniqWith)(styles, _lodash.isEqual);
                styles = element === 'global' ? styles : (0, _lodash.sortBy)(styles, ['embed', 'css']);

                styles.forEach(function (_ref6) {
                  var ignore = _ref6.ignore,
                      embed = _ref6.embed,
                      css = _ref6.css;

                  /** replace the ignored css with placeholders that will be swapped later */
                  if (ignore) {
                    ignoredCSS.push({ embed, css });
                    fullCSS += ignoreComment(ignoredCSS.length - 1);
                  } else if (embed) {
                    fullCSS += `${START_EMBED_CSS}${css}`;
                  } else {
                    fullCSS += `${START_INLINE_CSS}${css}`;
                  }
                });
              }

              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](9);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 17:
              _context.prev = 17;
              _context.prev = 18;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 20:
              _context.prev = 20;

              if (!_didIteratorError2) {
                _context.next = 23;
                break;
              }

              throw _iteratorError2;

            case 23:
              return _context.finish(20);

            case 24:
              return _context.finish(17);

            case 25:
              _context.next = 27;
              return (0, _styles2.default)(fullCSS, options);

            case 27:
              _ref4 = _context.sent;
              processedCss = _ref4.css;


              /** put the ignored css back in */
              ignoredCSS.forEach(function (_ref5, index) {
                var embed = _ref5.embed,
                    css = _ref5.css;

                processedCss = processedCss.replace(ignoreComment(index), embed ? `${START_EMBED_CSS}${css}` : `${START_INLINE_CSS}${css}`);
              });

              /** split on the dividers and map it so each part starts with INLINE or EMBED */
              processedCssParts = processedCss.split(/\/\*!\*\*\*START:/g).splice(1).map(function (css) {
                return css.replace(/_CSS\*\*\*\*\*\//, '');
              });

              /** build the html */

              html = '';
              lastType = null;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 36;


              for (_iterator3 = (0, _getIterator3.default)(processedCssParts); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                cssPart = _step3.value;
                css = cssPart.replace(/^(EMBED|INLINE)/, '');
                type = cssPart.startsWith('EMBED') ? 'EMBED' : 'INLINE';


                if (type === lastType) {
                  html += css;
                } else {
                  lastType = type;
                  html += `${html === '' ? '' : '</style>'}\n<style${type === 'EMBED' ? ' data-embed' : ''}>${css}\n`;
                }
              }

              _context.next = 44;
              break;

            case 40:
              _context.prev = 40;
              _context.t1 = _context['catch'](36);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t1;

            case 44:
              _context.prev = 44;
              _context.prev = 45;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 47:
              _context.prev = 47;

              if (!_didIteratorError3) {
                _context.next = 50;
                break;
              }

              throw _iteratorError3;

            case 50:
              return _context.finish(47);

            case 51:
              return _context.finish(44);

            case 52:
              html += '</style>';

              /** reset the styles and options */
              styleMap = options = null;

              return _context.abrupt('return', html);

            case 55:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[9, 13, 17, 25], [18,, 20, 24], [36, 40, 44, 52], [45,, 47, 51]]);
    }))();
  }
});


function ignoreComment(index) {
  return `/*!***IGNORE_${index}*****/`;
}