'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getWidth = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path, isRetina) {
    var image, _sizeOf, width;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _isAbsoluteUrl2.default)(path) ? getRemoteBuffer(path) : _fsExtra2.default.readFile(path);

          case 3:
            image = _context2.sent;
            _sizeOf = (0, _imageSize2.default)(image), width = _sizeOf.width;

            if (width) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', 'auto');

          case 7:
            return _context2.abrupt('return', isRetina ? Math.round(width / 2) : width);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', 'auto');

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 10]]);
  }));

  return function getWidth(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

var _lodash = require('lodash');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _isAbsoluteUrl = require('is-absolute-url');

var _isAbsoluteUrl2 = _interopRequireDefault(_isAbsoluteUrl);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _imageSize = require('image-size');

var _imageSize2 = _interopRequireDefault(_imageSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
exports.default = (0, _utils.createElement)('img', {
  attrs: ['src', 'width', 'height', 'alt', 'infer', 'inline', 'style'],
  children: false,
  defaultAttrs: {
    border: '0',
    alt: ''
  },

  rules: {
    'img': [{ '@pseudo': 'root' }, { display: _utils.transforms.trueHide() }, '@default']
  },

  render(attrs, contents) {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var isBlock;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isBlock = !attrs.inline;

              if (!(!!attrs.infer && (0, _lodash.has)(attrs, 'src') && !attrs.width)) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return getWidth(attrs.src, attrs.infer === 'retina');

            case 4:
              attrs.width = _context.sent;

            case 5:

              attrs.class += ` ${isBlock ? 'img__block' : 'img__inline'}`;
              attrs.style = isBlock ? '' : 'display: inline-block;';

              return _context.abrupt('return', [_utils2.default.renderElement('img', (0, _lodash.omit)(attrs, 'inline', 'infer')), _utils2.default.renderElement(
                _Style2.default,
                { 'for': 'img' },
                `
        .img__block {
          display: block;
          max-width: 100%;
        }
      `
              )]);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
});


function getRemoteBuffer(path) {
  return (0, _axios2.default)({
    method: 'get',
    url: path,
    responseType: 'arraybuffer'
  }).then(function (_ref2) {
    var data = _ref2.data;

    return Buffer.from(data, 'binary');
  });
}