'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var background = _utils.cssGroups.background,
    box = _utils.cssGroups.box,
    padding = _utils.cssGroups.padding,
    border = _utils.cssGroups.border,
    borderRadius = _utils.cssGroups.borderRadius; // eslint-disable-line no-unused-vars

var breakpoint = 600;

exports.default = (0, _utils.createElement)('column', {
  attrs: ['small', 'large'],
  parent: ['row'],
  defaultAttrs: { small: 12, large: 12 },
  containsText: true,

  rules: {
    '.column': [{ '@pseudo': 'root' }, { display: _utils.transforms.trueHide(undefined, true) }, background, box, padding, border, borderRadius, 'vertical-align']
  },

  render(attrs, contents) {
    var small = parseInt(attrs.small, 10);
    var large = parseInt(attrs.large, 10);
    var largeWidth = `${Math.round(100 * large / 12)}%`;
    attrs.class += ` column col-sm-${small}`;

    delete attrs.large;
    delete attrs.small;

    return [_utils2.default.renderElement(
      'td',
      (0, _extends3.default)({}, attrs, { width: largeWidth, style: `width: ${largeWidth};`, align: 'left', valign: 'top' }),
      contents.length === 0 ? '&nbsp;' : contents
    ), small === large ? '' : _utils2.default.renderElement(
      _Style2.default,
      { 'for': 'column', 'heml-embed': true },
      `
         @media only screen and (max-width: ${breakpoint}px) {
          .column, .column-filler { float: left; box-sizing: border-box; }
          .col-sm-${small} {
            width: ${Math.round(100 * small / 12)}% !important;
            display: block;
          }
        }
      `
    )];
  }
});