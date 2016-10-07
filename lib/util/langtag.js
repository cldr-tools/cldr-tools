'use strict'
/**
 * @module cldr-tools/lib/util/langtag
 */


let tagRegex = /^([a-z]{2,3}|[a-z]{5,8})-?([a-z]{4})?-?([a-z]{2}|\d{3})?/

/**
 * @typedef {Object} LangTag
 * @property {string} LangTag.language - language subtag
 * @property {string} LangTag.script - script subtag
 * @property {string} LangTag.region - region subtag
 */

/**
 * parse locale identifier into object.
 *
 * do not support extension and private usage yet.
 *
 * parsed subtag would be lower cased for comparison.
 *
 * @example
 * const LangTag = require('cldr-tools/lib/util/langtag')
 *
 * LangTag.parse('zh-Hant-TW')  // => {language: 'zh', script: 'hant', region: 'tw'}
 *
 * @param {string} locale
 * @returns {LangTag}
 */
exports.parse = function(locale) {
    let result, matches

    if('string' !== typeof locale){
        throw new Error('locale should be a string')
    }

    matches = locale.toLowerCase().match(tagRegex)

    if(matches){
        result = {
            language: matches[1],
            script: matches[2],
            region: matches[3]
        }
    }

    return result
};

/**
 * transform given locale object into locale string if could.
 *
 * the result string would be formatted into suggestion format.
 *
 * see [BCP47 - Formatting of Language Tags]{@link https://tools.ietf.org/html/bcp47#section-2.1.1}
 *
 * @example
 * const LangTag = require('cldr-tools/lib/util/langtag')
 *
 * LangTag.stringify({language: 'en', script: 'latn', region: 'us'})  // => 'en-Latn-US'
 *
 * @param {LangTag} localeObject
 * @returns {string}
 */
exports.stringify = function(localeObject) {
    let result = []

    if('object' !== typeof localeObject){
        throw new Error('localeObject should be an object')
    }

    result.push(localeObject.language)

    if(localeObject.script){
        localeObject.script = localeObject.script[0].toUpperCase() + localeObject.script.slice(1)
        result.push(localeObject.script)
    }

    if(localeObject.region){
        result.push(localeObject.region.toUpperCase())
    }

    return result.join('-')
};
