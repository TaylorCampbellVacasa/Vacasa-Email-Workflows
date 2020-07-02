'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = fixWidthsFor;

var _styleHelper = require('./styleHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts all width properties on the given tag to be a fixed value
 * when any given image has an ancestor with a fixed width
 * (fix for outlook)
 * @param  {Cheerio} $
 * @param  {String}  selector
 */
function fixWidthsFor($, selector) {
  // get all relative widths and set them to fixed values by default
  $(`${selector}`).filter(`[width*="%"]`).toNodes().forEach(function ($node) {
    var nodeWidth = $node.attr('width');
    /**
     * Gather all the parent percents and multiply them against
     * the image and fixed parent width
     */
    var parentPercent = 1;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)($node.parents().toNodes()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var $el = _step.value;

        var parentWidth = $el.attr('width') || (0, _styleHelper.getProp)($el.attr('style'), 'width');

        if (parentWidth && !parentWidth.endsWith('%')) {
          var currentStyles = $node.attr('style');

          $node.attr('style', (0, _styleHelper.setProp)(currentStyles, 'width', nodeWidth));
          $node.attr('width', parseFloat(parentWidth, 10) * parentPercent * parseFloat(nodeWidth, 10) / 100);

          break;
        } else if (parentWidth && parentWidth.endsWith('%')) {
          parentPercent = parentPercent * parseFloat(parentWidth, 10) / 100;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}