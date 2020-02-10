'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
exports.default = (0, _utils.createElement)('head', {
  unique: true,
  parent: ['heml'],
  attrs: [],

  render(attrs, contents) {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = _utils2.default.renderElement(
                'head',
                null,
                ' '
              );
              _context.t1 = _utils2.default;
              _context.t2 = attrs;
              _context.t3 = _utils2.default.renderElement('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' });
              _context.t4 = _utils2.default.renderElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' });
              _context.t5 = _utils2.default.renderElement('meta', { name: 'x-apple-disable-message-reformatting' });
              _context.t6 = _utils2.default.renderElement('meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' });
              _context.t7 = _utils2.default.renderElement(
                'style',
                { type: 'text/css', 'data-embed': true },
                `
        * { text-size-adjust: 100%; -ms-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        html { height: 100%; width: 100%; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; mso-line-height-rule: exactly; }
        div[style*="margin: 16px 0"] { margin:0 !important; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
        .ReadMsgBody, .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass td, .ExternalClass div { line-height: 100%; }
      `
              );
              _context.t8 = _utils2.default.renderElement(
                'style',
                { type: 'text/css' },
                `
        h1, h2, h3, h4, h5, h6 { margin: 20px 0; }
        h1 { line-height: 40px; }
        h2 { line-height: 30px; }
        h3 { line-height: 24px; }
        h5 { line-height: 17px; }
        h6 { line-height: 12px; }
        p { display: block; margin: 14px 0; }
        ul { margin-left: 20px; margin-top: 16px; margin-bottom: 16px; padding: 0; list-style-type: disc; }
      `
              );
              _context.t9 = _utils2.default.renderElement(
                'title',
                null,
                _Subject2.default.flush()
              );
              _context.next = 12;
              return _Style2.default.flush();

            case 12:
              _context.t10 = _context.sent;
              _context.t11 = /* drop in the contents */
              contents;
              _context.t12 = _context.t1.renderElement.call(_context.t1, 'head', _context.t2, _context.t3, _context.t4, _context.t5, /* <!-- https://webdesign.tutsplus.com/tutorials/creating-a-future-proof-responsive-email-without-media-queries--cms-23919 --> */
              `<!--[if !mso]><!-->`, _context.t6, `<!--<![endif]-->`, _context.t7, _context.t8, `<!--[if gte mso 9]>
      <style type="text/css">
      li { text-indent: -1em; }
      table td { border-collapse: collapse; }
      </style>
      <![endif]-->`, _context.t9, _context.t10, `<!-- content -->`, _context.t11, /* https://litmus.com/community/discussions/151-mystery-solved-dpi-scaling-in-outlook-2007-2013 */
              `<!--[if gte mso 9]><xml>
       <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
       </o:OfficeDocumentSettings>
      </xml><![endif]-->`);
              return _context.abrupt('return', [_context.t0, _context.t12]);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});