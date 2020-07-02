'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _cheerio = require('cheerio');

var _lodash = require('lodash');

var _cryptoRandomString = require('crypto-random-string');

var _cryptoRandomString2 = _interopRequireDefault(_cryptoRandomString);

var _htmlTags = require('html-tags');

var _htmlTags2 = _interopRequireDefault(_htmlTags);

var _void = require('html-tags/void');

var _void2 = _interopRequireDefault(_void);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrappingHtmlTags = (0, _lodash.difference)(_htmlTags2.default, _void2.default);

function parse(contents) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$elements = options.elements,
      elements = _options$elements === undefined ? [] : _options$elements,
      _options$cheerio = options.cheerio,
      cheerioOptions = _options$cheerio === undefined ? {} : _options$cheerio;


  var $ = (0, _cheerio.load)(contents, (0, _extends3.default)({
    xmlMode: true,
    lowerCaseTags: true,
    decodeEntities: false
  }, cheerioOptions));

  $.findNodes = function (q) {
    return $(Array.isArray(q) ? q.join(',') : q).not('[heml-ignore]').toNodes();
  };

  $.prototype.toNodes = function () {
    return this.toArray().map(function (node) {
      return $(node);
    });
  };

  var selfClosingTags = [].concat((0, _toConsumableArray3.default)(_void2.default), (0, _toConsumableArray3.default)(elements.filter(function (element) {
    return element.children === false;
  }).map(function (_ref) {
    var tagName = _ref.tagName;
    return tagName;
  })));
  var wrappingTags = [].concat((0, _toConsumableArray3.default)(wrappingHtmlTags), (0, _toConsumableArray3.default)(elements.filter(function (element) {
    return element.children !== false;
  }).map(function (_ref2) {
    var tagName = _ref2.tagName;
    return tagName;
  })));

  var $selfClosingNodes = $.findNodes(selfClosingTags).reverse();
  var $wrappingNodes = $.findNodes(wrappingTags).reverse();

  /** Move contents from self wrapping tags outside of itself */
  $selfClosingNodes.forEach(function ($node) {
    $node.after($node.html());
    $node.html('');
  });

  /** ensure that all wrapping tags have at least a zero-width, non-joining character */
  $wrappingNodes.forEach(function ($node) {
    if ($node.html().length === 0) {
      $node.html(' ');
    }
  });

  /** try for head, fallback to body, then heml */
  var $head = (0, _lodash.first)((0, _lodash.compact)([].concat((0, _toConsumableArray3.default)($('head').toNodes()), (0, _toConsumableArray3.default)($('body').toNodes()), (0, _toConsumableArray3.default)($('heml').toNodes()))));

  /** move inline styles to a style tag with unique ids so they can be hit by the css processor */
  if ($head) {
    var $inlineStyleNodes = $.findNodes(elements.map(function (_ref3) {
      var tagName = _ref3.tagName;
      return tagName;
    })).filter(function ($node) {
      return !!$node.attr('style');
    });

    var inlineCSS = $inlineStyleNodes.map(function ($node) {
      var id = $node.attr('id');
      var css = $node.attr('style');
      $node.removeAttr('style');

      if (!id) {
        id = `heml-${(0, _cryptoRandomString2.default)(5)}`;
        $node.attr('id', id);
      }

      return `#${id} {${css}}`;
    }).join('\n');

    $head.append(`<style>${inlineCSS}</style>`);
  }

  return $;
}

exports.default = parse;