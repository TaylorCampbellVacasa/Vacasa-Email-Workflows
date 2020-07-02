'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-merge-adjacent-media', function () {
  return function (root) {
    root.walkAtRules(function (rule) {
      if (rule.name !== 'media') {
        return;
      }

      var nextRule = getNextRule(rule);

      if (!nextRule || nextRule.type !== 'atrule') {
        return;
      }

      if (nextRule.params === rule.params) {
        nextRule.prepend(rule.nodes);
        rule.remove();
      }
    });
  };
});


function getNextRule(rule) {
  var nextNode = rule.next();
  if (!nextNode) {
    return;
  }

  if (nextNode.type === 'atrule' || nextNode.type === 'rule') {
    return nextNode;
  }

  return getNextRule(nextNode);
}