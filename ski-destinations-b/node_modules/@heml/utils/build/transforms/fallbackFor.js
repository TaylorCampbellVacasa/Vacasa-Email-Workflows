"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fallbackFor;
/**
 * Adds the property this tranform is attached to, if the desired property wasn't given
 * @param  {String} prop
 * @return {Function}
 */
function fallbackFor(desiredProp) {
  return function (prop, rule) {
    var hasDesiredProp = false;
    rule.walkDecls(desiredProp, function () {
      hasDesiredProp = true;
    });

    /** remove the fallback property if we already have the desired properity */
    if (hasDesiredProp) {
      prop.remove();
    }
  };
}