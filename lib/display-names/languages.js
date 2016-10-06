/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'
const memoize = require('memoizee')
const util = require('../util')

/**
 * get language display names of locales specified by args
 *
 * @param {string[]} locales
 * @param {string} specificLang
 * @param {boolean} withOriginal
 * @returns {object}
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
