'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = function (type) {
  var containsTables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (decl, originalRule) {
    if (decl.value.trim().toLowerCase() === 'none') {
      decl.after(decl.clone({ prop: 'mso-hide', value: 'all' }));
      decl.after(decl.clone({ prop: 'max-height', value: '0px' }));
      decl.after(decl.clone({ prop: 'overflow', value: 'hidden' }));

      if (type === 'block' || type === 'table' || containsTables) {
        var hideTableRule = decl.parent.clone();
        hideTableRule.selectors = hideTableRule.selectors.map(function (s) {
          return `${s} table`;
        });
        hideTableRule.removeAll();
        hideTableRule.append(decl.clone({ prop: 'mso-hide', value: 'all' }));
        originalRule.after(hideTableRule);
      }
    } else if (decl.value.trim().toLowerCase() === type || (0, _lodash.isUndefined)(type)) {
      decl.after(decl.clone({ prop: 'mso-hide', value: 'none' }));
      decl.after(decl.clone({ prop: 'max-height', value: 'initial' }));
      decl.after(decl.clone({ prop: 'overflow', value: 'auto' }));

      if (type === 'block' || type === 'table' || containsTables) {
        var showTableRule = decl.parent.clone();
        showTableRule.selectors = showTableRule.selectors.map(function (s) {
          return `${s} table`;
        });
        showTableRule.removeAll();
        showTableRule.append(decl.clone({ prop: 'mso-hide', value: 'none' }));
        originalRule.after(showTableRule);
      }
    }
  };
};