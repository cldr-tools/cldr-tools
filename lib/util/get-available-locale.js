'use strict'

const availableLocales = require('cldr-core/availableLocales.json').availableLocales.full
const getSearchChain = require('./get-search-chain')
const addLikelySubtags = require('./add-likely-subtags')

/**
 * @module cldr-tools/lib/util/get-available-locale
 */

/**
 * try to find an available locale in CLDR specified by given locale
 * see [cldr available locales]{@link https://github.com/unicode-cldr/cldr-core/blob/master/availableLocales.json}
 *
 * @param {string} locale
 * @returns {string|null}
 */
module.exports = function(locale) {
    let result = null,
        searchChain = getSearchChain(addLikelySubtags(locale)),
        i = 0

    for(;i < searchChain.length; i++){

        if(availableLocales.indexOf(searchChain[i]) > -1){
            result = searchChain[i]
            break
        }
    }

    return result
}
