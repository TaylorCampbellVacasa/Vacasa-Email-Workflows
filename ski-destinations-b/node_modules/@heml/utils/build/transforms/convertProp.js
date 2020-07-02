"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertProp;
/**
 * convert a decleration to different properity
 * .i.e. max-width -> width
 * @param  {String} prop
 * @return {Function}
 */
function convertProp(prop) {
  return function (decl) {
    decl.prop = prop;
  };
}