'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _isHemlFile = require('../utils/isHemlFile');

var _isHemlFile2 = _interopRequireDefault(_isHemlFile);

var _renderHemlFile = require('../utils/renderHemlFile');

var _renderHemlFile2 = _interopRequireDefault(_renderHemlFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorBlock = _chalk2.default.bgRed.black;
var successBlock = _chalk2.default.bgGreen.black;
var _console = console,
    log = _console.log;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, options) {
    var filepath, outputpath, _ref2, html, metadata, errors, relativePath;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filepath = _path2.default.resolve(file);
            outputpath = _path2.default.resolve(options.output || file.replace(/\.heml$/, '.html'));

            /** require .heml extention */

            if (!(0, _isHemlFile2.default)(file)) {
              log(`${(0, _chalk.red)('ERROR')} ${file} must have ${(0, _chalk.yellow)('.heml')} extention`);
              process.exit(1);
            }

            _context.prev = 3;

            log(`${_chalk2.default.bgBlue.black(' COMPILING ')}`);
            log(`${(0, _chalk.blue)(' -')} Reading ${file}`);
            log(`${(0, _chalk.blue)(' -')} Building HEML`);
            _context.next = 9;
            return (0, _renderHemlFile2.default)(filepath, options);

          case 9:
            _ref2 = _context.sent;
            html = _ref2.html;
            metadata = _ref2.metadata;
            errors = _ref2.errors;


            log(`${(0, _chalk.blue)(' -')} Writing ${metadata.size}`);
            _context.next = 16;
            return (0, _fsExtra.writeFile)(outputpath, html);

          case 16:
            relativePath = (0, _chalk.yellow)(_path2.default.relative(process.cwd(), outputpath));


            log(errors.length ? `\n${errorBlock(' DONE ')} Compiled with errors to ${(0, _chalk.yellow)(relativePath)} in ${metadata.time}ms\n` : `\n${successBlock(' DONE ')} Compiled successfully to ${(0, _chalk.yellow)(relativePath)} in ${metadata.time}ms\n`);

            if (errors.length) {
              log((0, _chalk.red)(`${errors.length} ${errors.length > 1 ? 'errors' : 'error'} `));
              errors.forEach(function (err) {
                return log(`> ${(0, _chalk.yellow)(err.selector)}\n  ${err.message}`);
              });
            }
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context['catch'](3);

            log(`\n${errorBlock(' ERROR ')} ${_context.t0.message}\n${(0, _chalk.dim)(_context.t0.stack)}`);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 21]]);
  }));

  function build(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return build;
}();