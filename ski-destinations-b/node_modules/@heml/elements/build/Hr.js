'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trueHide = _utils.transforms.trueHide,
    ieAlignFallback = _utils.transforms.ieAlignFallback; // eslint-disable-line no-unused-vars

var background = _utils.cssGroups.background,
    margin = _utils.cssGroups.margin,
    padding = _utils.cssGroups.padding,
    border = _utils.cssGroups.border,
    borderRadius = _utils.cssGroups.borderRadius,
    width = _utils.cssGroups.width,
    height = _utils.cssGroups.height,
    table = _utils.cssGroups.table,
    box = _utils.cssGroups.box;
exports.default = (0, _utils.createElement)('hr', {
  children: false,

  rules: {
    '.hr': [{ '@pseudo': 'root' }, { display: trueHide() }, margin, width],

    '.hr__table__ie': ['width', 'max-width', { [margin]: ieAlignFallback }],

    '.hr__table': [{ '@pseudo': 'table' }, table],

    '.hr__row': [{ '@pseudo': 'row' }],

    '.hr__cell': [{ '@pseudo': 'cell' }, height, background, box, padding, border, borderRadius, 'vertical-align']
  },

  render(attrs, contents) {
    attrs.class += ' hr';
    return _utils2.default.renderElement(
      'div',
      attrs,
      (0, _utils.condition)('mso | IE', `<table class="hr__table__ie" role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td>`),
      _utils2.default.renderElement(
        'table',
        { 'class': 'hr__table', role: 'presentation', border: '0', align: 'center', cellpadding: '0', cellspacing: '0', width: '100%', style: 'table-layout: fixed;' },
        _utils2.default.renderElement(
          'tr',
          { 'class': 'hr__row' },
          _utils2.default.renderElement(
            'td',
            { 'class': 'hr__cell', width: '100%', align: 'left', valign: 'top' },
            `&nbsp;`
          )
        )
      ),
      (0, _utils.condition)('mso | IE', `</td></tr></table>`),
      _utils2.default.renderElement(
        _Style2.default,
        { 'for': 'hr' },
        `
          hr {
            width: 100%;
            margin: auto;
            border-top: 1px solid #9A9A9A;
          }
        `
      )
    );
  }
});