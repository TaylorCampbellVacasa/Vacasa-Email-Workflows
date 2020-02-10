'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeProp = exports.setProp = exports.getProp = undefined;

var _lodash = require('lodash');

/**
 * Gets the value of a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to get
 *
 * @return {String} style
 */
function getProp() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prop = arguments[1];

  prop = prop.trim().toLowerCase();
  var decls = style.split(';');

  var value = false;

  decls.forEach(function (decl) {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      value = decl.split(':')[1].trim();
    }
  });

  return value;
}

/**
 * Sets the value of a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to update/add
 * @param {String} value new value
 *
 * @return {String} style
 */
function setProp() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prop = arguments[1];
  var value = arguments[2];

  prop = prop.trim().toLowerCase();
  var decls = style.split(';');

  var updated = false;

  var updatedDecls = decls.map(function (decl) {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      updated = true;
      return `${prop}: ${value}`;
    }

    return decl;
  });

  if (!updated) {
    updatedDecls.push(`${prop}: ${value}`);
  }

  return (0, _lodash.compact)(updatedDecls).join(';');
}

/**
 * removes a prop in a given inline style string
 * @param {String} style inline styles
 * @param {String} prop  prop to remove
 *
 * @return {String} style
 */
function removeProp() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prop = arguments[1];

  prop = prop.trim().toLowerCase();
  var decls = style.split(';');

  var updatedDecls = decls.map(function (decl) {
    if (decl.trim().toLowerCase().startsWith(`${prop}:`)) {
      return false;
    }

    return decl;
  });

  return (0, _lodash.compact)(updatedDecls).join(';');
}

exports.getProp = getProp;
exports.setProp = setProp;
exports.removeProp = removeProp;