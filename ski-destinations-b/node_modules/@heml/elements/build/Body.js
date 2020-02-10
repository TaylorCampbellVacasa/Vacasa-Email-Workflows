'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
var background = _utils.cssGroups.background,
    padding = _utils.cssGroups.padding,
    font = _utils.cssGroups.font,
    text = _utils.cssGroups.text;
exports.default = (0, _utils.createElement)('body', {
  unique: true,
  parent: ['heml'],
  containsText: true,

  rules: {
    '.body': [{ '@pseudo': 'root' }, background],

    '.bodyTable': [{ '@pseudo': 'table' }, '@default', background],

    '.body__content': [{ '@pseudo': 'content' }, padding, font, text],

    '.preview': [{ 'background-color': _utils.transforms.convertProp('color') }]
  },

  render(attrs, contents) {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              attrs.class += ' body';

              return _context.abrupt('return', _utils2.default.renderElement(
                'body',
                (0, _extends3.default)({}, attrs, { style: 'margin: 0; width: 100%;' }),
                _Preview2.default.flush(),
                _utils2.default.renderElement(
                  'table',
                  { 'class': 'bodyTable', role: 'presentation', width: '100%', align: 'left', border: '0', cellpadding: '0', cellspacing: '0', style: 'margin: 0;' },
                  _utils2.default.renderElement(
                    'tr',
                    null,
                    _utils2.default.renderElement(
                      'td',
                      { 'class': 'body__content', align: 'left', width: '100%', valign: 'top' },
                      contents
                    )
                  )
                ),
                _utils2.default.renderElement(
                  'div',
                  { style: 'display:none; white-space:nowrap; font-size:15px; line-height:0;' },
                  '&nbsp; '.repeat(30)
                ),
                _utils2.default.renderElement(
                  _Style2.default,
                  { 'for': 'body' },
                  `
          body {
            margin: 0;
            width: 100%;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 20px;
            color: black;
          }
      `
                )
              ));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});