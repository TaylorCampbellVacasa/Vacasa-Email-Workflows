'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var renderHemlFile = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filepath, options) {
    var contents, startTime, results;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fsExtra.readFile)(filepath, 'utf8');

          case 2:
            contents = _context.sent;
            startTime = process.hrtime();
            _context.next = 6;
            return (0, _2.default)(contents, options);

          case 6:
            results = _context.sent;

            results.metadata.time = Math.round(process.hrtime(startTime)[1] / 1000000);

            return _context.abrupt('return', results);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function renderHemlFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fsExtra = require('fs-extra');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = renderHemlFile;