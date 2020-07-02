'use strict';

const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

module.exports = postcss.plugin('postcss-colornames-to-hex', (options = {}) => (root) => {
  if (options.length !== "long" && options.length !== "short")
    options.length = "long";

  if (options.case !== "upper" && options.case !== "lower")
    options.case = "upper";


  function formatHex(node) {
    if (node.type === 'word' && isHex(node.value)) {
      if (options.length === "long")
        node.value = expandHex(node.value);
      else
        node.value = shrinkHex(node.value);

      if (options.case === "upper")
        node.value = node.value.toUpperCase();
      else
        node.value = node.value.toLowerCase();
    }
  }

  root.walkDecls(decl => {
    decl.value = valueParser(decl.value).walk(formatHex).toString();
  });
});


function canShrink(hex) {
  return hex.length === 7 &&
         hex[1] === hex[2] &&
         hex[3] === hex[4] &&
         hex[5] === hex[6];
}

function isHex(str) {
  return /^#(?:[0-9a-z]{3}){1,2}$/i.test(str);
}

function expandHex(hex) {
  if (hex.length === 4)
    return `${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;

  return hex;
}

function shrinkHex(hex) {
  if (hex.length === 7 && canShrink(hex))
    return `${hex[0]}${hex[1]}${hex[3]}${hex[5]}`;

  return hex;
}
