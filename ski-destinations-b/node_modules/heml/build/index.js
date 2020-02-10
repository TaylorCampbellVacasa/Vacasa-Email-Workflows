'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * renders the given HEML string with the config provided
 * @param  {String} HEML     the heml to render
 * @param  {Object} options  the options
 * @return {Object}          { metadata, html, errors }
 */
var heml = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(contents) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var results, _options$beautify, beautifyOptions, _options$validate, validateOption, $heml, errors, _ref2, $html, metadata;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            results = {};
            _options$beautify = options.beautify, beautifyOptions = _options$beautify === undefined ? {} : _options$beautify, _options$validate = options.validate, validateOption = _options$validate === undefined ? 'soft' : _options$validate;


            options.elements = (0, _lodash.flattenDeep)((0, _lodash.toArray)(coreElements).concat(options.elements || []));

            /** parse it ✂️ */
            $heml = (0, _parse2.default)(contents, options);

            /** validate it 🕵 */

            errors = (0, _validate2.default)($heml, options);

            if (!(validateOption.toLowerCase() === 'strict' && errors.length > 0)) {
              _context.next = 7;
              break;
            }

            throw errors[0];

          case 7:
            if (validateOption.toLowerCase() === 'soft') {
              results.errors = errors;
            }

            /** render it 🤖 */
            _context.next = 10;
            return (0, _render2.default)($heml, options);

          case 10:
            _ref2 = _context.sent;
            $html = _ref2.$;
            metadata = _ref2.metadata;


            /** inline it ✍️ */
            (0, _inline2.default)($html, options);

            /** beautify it 💅 */
            results.html = _utils.condition.replace((0, _jsBeautify.html)($html.html(), (0, _extends3.default)({
              indent_size: 2,
              indent_inner_html: true,
              preserve_newlines: false,
              extra_liners: []
            }, beautifyOptions)));

            /** final touches 👌 */
            metadata.size = `${((0, _byteLength2.default)(results.html) / 1024).toFixed(2)}kb`;
            results.metadata = metadata;

            /** send it back 🎉 */
            return _context.abrupt('return', results);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function heml(_x2) {
    return _ref.apply(this, arguments);
  };
}();

/** module.exports for commonjs */


var _parse = require('@heml/parse');

var _parse2 = _interopRequireDefault(_parse);

var _render = require('@heml/render');

var _render2 = _interopRequireDefault(_render);

var _inline = require('@heml/inline');

var _inline2 = _interopRequireDefault(_inline);

var _validate = require('@heml/validate');

var _validate2 = _interopRequireDefault(_validate);

var _utils = require('@heml/utils');

var _byteLength = require('byte-length');

var _byteLength2 = _interopRequireDefault(_byteLength);

var _jsBeautify = require('js-beautify');

var _lodash = require('lodash');

var _elements = require('@heml/elements');

var coreElements = _interopRequireWildcard(_elements);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = heml;