'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _juice = require('juice');

var _juice2 = _interopRequireDefault(_juice);

var _inlineMargins = require('./inlineMargins');

var _inlineMargins2 = _interopRequireDefault(_inlineMargins);

var _fixWidthsFor = require('./fixWidthsFor');

var _fixWidthsFor2 = _interopRequireDefault(_fixWidthsFor);

var _removeProcessingIds = require('./removeProcessingIds');

var _removeProcessingIds2 = _interopRequireDefault(_removeProcessingIds);

var _preferMaxWidth = require('./preferMaxWidth');

var _preferMaxWidth2 = _interopRequireDefault(_preferMaxWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inline($) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$juice = options.juice,
      juiceOptions = _options$juice === undefined ? {} : _options$juice;


  _juice2.default.juiceDocument($, (0, _extends3.default)({}, juiceOptions));

  (0, _inlineMargins2.default)($);
  (0, _preferMaxWidth2.default)($, '[class$="__ie"]');
  (0, _fixWidthsFor2.default)($, 'img, .block__table__ie, .column');
  (0, _removeProcessingIds2.default)($);

  return $;
}

exports.default = inline;