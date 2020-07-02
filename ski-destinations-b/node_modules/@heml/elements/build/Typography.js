'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A = exports.Li = exports.Ul = exports.Ol = exports.P = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = undefined;

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var margin = _utils.cssGroups.margin,
    background = _utils.cssGroups.background,
    border = _utils.cssGroups.border,
    borderRadius = _utils.cssGroups.borderRadius,
    text = _utils.cssGroups.text,
    font = _utils.cssGroups.font;

/**
 * create mergable text element
 * @param  {String} name
 * @param  {Object} element
 * @return {Object}
 */
// eslint-disable-line no-unused-vars

function createTextElement(name) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var classToAdd = '';
  var Tag = name;

  if (/^h\d$/i.test(name)) {
    classToAdd = 'header';
  } else {
    classToAdd = 'text';
  }

  return (0, _utils.createElement)(name, (0, _lodash.merge)({
    attrs: true,
    rules: {
      [`.${name}.${classToAdd}`]: [{ '@pseudo': 'root' }, '@default', { display: _utils.transforms.trueHide() }, margin, background, border, borderRadius, text, font]
    },
    render(attrs, contents) {
      attrs.class += ` ${classToAdd} ${name}`;

      return _utils2.default.renderElement(
        Tag,
        attrs,
        contents
      );
    }
  }, element));
}

var H1 = createTextElement('h1');
var H2 = createTextElement('h2');
var H3 = createTextElement('h3');
var H4 = createTextElement('h4');
var H5 = createTextElement('h5');
var H6 = createTextElement('h6');
var P = createTextElement('p');
var Ol = createTextElement('ol');
var Ul = createTextElement('ul');
var Li = createTextElement('li');

var A = (0, _utils.createElement)('a', {
  attrs: true,
  defaultAttrs: { href: '#' },

  rules: {
    '.a': [{ '@pseudo': 'root' }, { '@default': true }, { display: _utils.transforms.trueHide('inline') }, 'color', 'text-decoration'],
    '.a__text': [{ '@pseudo': 'text' }, 'color', 'text-decoration']
  },

  render(attrs, contents) {
    attrs.class += ' a';
    return _utils2.default.renderElement(
      'a',
      attrs,
      _utils2.default.renderElement(
        'span',
        { 'class': 'a__text' },
        contents
      )
    );
  }
});

exports.H1 = H1;
exports.H2 = H2;
exports.H3 = H3;
exports.H4 = H4;
exports.H5 = H5;
exports.H6 = H6;
exports.P = P;
exports.Ol = Ol;
exports.Ul = Ul;
exports.Li = Li;
exports.A = A;