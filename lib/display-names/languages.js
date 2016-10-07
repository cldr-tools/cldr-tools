'use strict'
const memoize = require('memoizee')
const util = require('../util')

/**
 * @typedef {Object} LanguageDisplayName
 * @property {string} LanguageDisplayName.locale - the language tag
 * @property {string} displayName
 * @property {string} [original]
 */

/**
 * @module {Function} cldr-tools/lib/display-names/languages
 */

/**
 * get language display names of locales specified by args.
 *
 * could be used to build a api for your application's languages selection.
 *
 * this function is memoized, calls would be cached
 *
 * @example
 * const languageDisplayNames = require('cldr-tools/lib/display-names/languages')
 *
 * languageDisplayNames(['zh', 'en'])
 * // => [{
 *   locale: 'zh',
 *   displayName: '中文'
 * }, {
 *   locale: 'en',
 *   displayName: 'English'
 * }]
 *
 * @example
 * languageDisplayNames(['zh', 'en'], 'en')
 * // => [{
 *   locale: 'zh',
 *   displayName: 'Chinese'
 * }, {
 *   locale: 'en',
 *   displayName: 'English'
 * }]
 *
 * @example
 * languageDisplayNames(['zh', 'en'], 'en', true)
 * // => [{
 *   locale: 'zh',
 *   displayName: 'Chinese',
 *   original: '中文'
 * }, {
 *   locale: 'en',
 *   displayName: 'English',
 *   original: 'English'
 * }]
 *
 * @function
 * @param {string[]} locales
 * @param {string} [specificLang] - if set a language, result language name will display in this language
 * @param {boolean} [withOriginal] - if true, the result will come out with display name in the language itself
 * @returns {LanguageDisplayName[]}
 */
module.exports = memoize(function(locales, specificLang, withOriginal) {
    let result = [];

    if(locales && locales.length){
        if(specificLang){
            let availableSpecificLang = util.getAvailableLocale(specificLang)
            let langData = availableSpecificLang ? util.getLangDisplayNamesData(availableSpecificLang) : null

            result = locales.map(function(locale) {
                let item = {
                    locale,
                    displayName: langData ? findDisplayName(langData, locale) : undefined
                }

                if(withOriginal){
                    item.original = findOriginal(locale)
                }

                return item
            });
        } else {
            result = locales.map(function(locale) {
                return {
                    locale,
                    displayName: findOriginal(locale)
                }
            });
        }
    }

    return result;
}, {
    primitive: true,
    length: false,
    normalizer: function(args) {
        return Array.prototype.map.call(args, function(arg) {
            if(Array.isArray(arg)){
                return arg.slice().sort()
            }
            return arg
        }).join(',')
    }
});

function findOriginal(locale){
    let result
    let availableLocale = util.getAvailableLocale(locale)

    if(availableLocale){
        result = findDisplayName(
            util.getLangDisplayNamesData(availableLocale), locale)
    }

    return result;
}

function findDisplayName(languageData, locale){
    var result,
        searchChain,
        i = 0;

    if(languageData){
        searchChain = [locale].concat(util.getSearchChain(util.addLikelySubtags(locale)));

        for(;i < searchChain.length; i++){
            if(searchChain[i] in languageData){
                result = languageData[searchChain[i]];
                break;
            }
        }
    }

    return result;
}
