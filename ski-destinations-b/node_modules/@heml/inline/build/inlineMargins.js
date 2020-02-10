'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

/**
 * finds all the tables that are centered with margins
 * and centers them with the align attribute
 * @param  {Cheerio} $
 */
function inlineMargins($) {
  $('table[style*=margin]').toNodes().forEach(function ($el) {
    var _getSideMargins = getSideMargins($el.attr('style')),
        left = _getSideMargins.left,
        right = _getSideMargins.right;

    if (left === 'auto' && right === 'auto') {
      $el.attr('align', 'center');
    } else if (left === 'auto' && right !== 'auto') {
      $el.attr('align', 'right');
    } else if (left !== 'auto') {
      $el.attr('align', 'left');
    }
  });
}

/**
 * pulls the left and right margins from the given inline styles
 * @param  {String} style the inline styles
 * @return {Object}       object with left and right margins
 */
function getSideMargins(style) {
  var margins = (0, _lodash.compact)(style.split(';')).map(function (decl) {
    var split = decl.split(':');

    return {
      prop: (0, _lodash.first)(split).trim().toLowerCase(),
      value: (0, _lodash.last)(split).trim().toLowerCase()
    };
  }).filter(function (_ref) {
    var prop = _ref.prop,
        value = _ref.value;
    return prop.indexOf('margin') === 0;
  });

  var left = 0;
  var right = 0;
  margins.forEach(function (_ref2) {
    var prop = _ref2.prop,
        value = _ref2.value;

    if (prop === 'margin-left') {
      left = value;
      return;
    }

    if (prop === 'margin-right') {
      right = value;
      return;
    }

    if (prop === 'margin') {
      var values = value.split(' ').map(function (i) {
        return i.trim();
      });

      switch (values.length) {
        case 1:
          right = (0, _lodash.first)(values);
          left = (0, _lodash.first)(values);
          break;

        case 2:
          right = (0, _lodash.last)(values);
          left = (0, _lodash.last)(values);
          break;

        case 3:
          right = (0, _lodash.nth)(values, 1);
          left = (0, _lodash.nth)(values, 1);
          break;

        default:
          right = (0, _lodash.nth)(values, 1);
          left = (0, _lodash.nth)(values, 3);
          break;
      }
    }
  });

  return { left, right };
}

exports.default = inlineMargins;