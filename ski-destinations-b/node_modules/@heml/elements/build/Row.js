'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utils.createElement)('row', {
  children: ['column'],

  rules: {
    '.row': [{ '@pseudo': 'root' }, { display: _utils.transforms.trueHide('block') }],

    '.row__table': [{ '@pseudo': 'table' }],

    '.row__row': [{ '@pseudo': 'row' }]
  },

  render(attrs, contents) {
    attrs.class += ' row';
    return _utils2.default.renderElement(
      'div',
      attrs,
      _utils2.default.renderElement(
        'table',
        { 'class': 'row__table', width: '100%', align: 'center', role: 'presentation', border: '0', cellpadding: '0', cellspacing: '0', style: 'table-layout: fixed;' },
        _utils2.default.renderElement(
          'tr',
          { 'class': 'row__row' },
          contents
        )
      )
    );
  },

  preRender(_ref) {
    var $ = _ref.$;

    $.findNodes('row').forEach(function ($row) {
      var $columns = $row.children().toNodes();
      var columnSizes = $columns.map(function ($column) {
        return parseInt($column.attr('large') || 0, 10);
      });
      var remainingSpace = 12 - (0, _lodash.sum)(columnSizes);
      var remainingColumns = columnSizes.filter(function (size) {
        return size === 0;
      }).length;
      var spacePerColumn = (0, _lodash.max)([Math.floor(remainingSpace / remainingColumns), 1]);
      var overageSpace = remainingSpace - spacePerColumn * remainingColumns;

      var filledColumns = 0;
      $columns.forEach(function ($column) {
        if ((0, _lodash.isUndefined)($column.attr('large'))) {
          filledColumns++;
          $column.attr('large', spacePerColumn + (filledColumns === remainingColumns ? overageSpace : 0));
        }
      });

      // if they don't add up to 12
      // and there are no specified columns
      if (remainingColumns === 0 && remainingSpace > 0) {
        $row.append('<td class="column-filler" style="padding: 0; mso-hide: all; max-height: 0px; overflow: hidden;"></td>');
      }
    });
  }
}); // eslint-disable-line no-unused-vars