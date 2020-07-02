'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (name, attrs) {
  for (var _len = arguments.length, contents = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    contents[_key - 2] = arguments[_key];
  }

  /** catch all promises in this content and wait for them to finish */
  if (contents.filter(_isPromise2.default).length > 0) {
    return _promise2.default.all(contents).then(function (contents) {
      return render(name, attrs, contents.join(''));
    });
  }

  return render(name, attrs, contents.join(''));
};

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _lodash = require('lodash');

var _createHtmlElement = require('./createHtmlElement');

var _createHtmlElement2 = _interopRequireDefault(_createHtmlElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(name, attrs, contents) {
  if (!name || (0, _lodash.isPlainObject)(name) && !name.render) {
    throw new Error(`name must be a HEML element or HTML tag name (.e.g 'td'). Received: ${(0, _stringify2.default)(name)}`);
  }

  if ((0, _lodash.isPlainObject)(name) && name.render) {
    /** set the defaults and massage attribute values */
    attrs = (0, _lodash.defaults)({}, attrs, name.defaultAttrs || {});
    attrs = (0, _lodash.mapValues)(attrs, function (value, name) {
      if (value === '' && name !== 'class' || value === 'true' || value === 'on') {
        return true;
      }

      if (value === 'false' || value === 'off') {
        return false;
      }

      return value;
    });

    /**
     * custom elements can return promises, arrays, or strings
     *
     * we will:
     * 1. check for the shorthands and render on that
     * 2. return a string synchronously if we can
     * 3. return a string in a promise
     */
    var renderResults = (0, _lodash.castArray)(name.render(attrs, contents));

    /** 1. catch shorthands for rerendering the element */
    if (renderResults.length === 1 && renderResults[0] === true) {
      return render(name.tagName, attrs, contents);
    }

    /** 2. we want to return synchronously if we can */
    if (renderResults.filter(_isPromise2.default).length === 0) {
      return (0, _lodash.compact)(renderResults).join('');
    }

    /** otherwise, combine the array of promises/strings into a single string */
    return _promise2.default.all(renderResults).then(function (results) {
      return (0, _lodash.compact)((0, _lodash.flattenDeep)(results)).join('');
    });
  }

  /** if we have a regular ol element go ahead and convert it to a string */
  if (attrs && attrs.class === '') {
    delete attrs.class;
  }
  if (attrs && attrs.class) {
    attrs.class = attrs.class.trim();
  }

  return (0, _createHtmlElement2.default)({ name, attrs, contents });
}