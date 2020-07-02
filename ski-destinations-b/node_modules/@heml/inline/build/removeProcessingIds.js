'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * remove all ids used for processing only
 * @param  {Cheerio} $
 */
function removeProcessingIds($) {
  $('[id^="heml-"]').removeAttr('id');
}

exports.default = removeProcessingIds;