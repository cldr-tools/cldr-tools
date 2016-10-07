'use strict'
/**
 * @module cldr-tools/lib/util/get-search-chain
 */

const langtag = require('./langtag')
const pick = require('lodash/pick')

/**
 * return the permutation and combination of given locale.
 * could be used to search things in CLDR data in order
 *
 * @example
 * getSearchChain('zh-Hans-CN') // => ['zh-Hans-CN', 'zh-CN', 'zh-Hans', 'zh']
 *
 * @param {string} locale
 * @returns {string[]}
 */
module.exports = function(locale) {
    let result = [];

    let parsedTag = langtag.parse(locale);

    result.push(langtag.stringify(parsedTag));
    result.push(langtag.stringify(pick(parsedTag, 'language', 'region')));
    result.push(langtag.stringify(pick(parsedTag, 'language', 'script')));
    result.push(parsedTag.language);

    return result;
}
