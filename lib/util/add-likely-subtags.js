'use strict'
const likelySubtags = require('cldr-core/supplemental/likelySubtags.json').
    supplemental.likelySubtags
const defaults = require('lodash/defaults')

const langtag = require('./langtag')
const getSearchChain = require('./get-search-chain')

/**
 * @module cldr-tools/lib/util/add-likely-subtags
 */

/**
 * try to add likely subtags to given locale.
 * it's used to transform the unavailable locale into available locale.
 * see [Likely Subtags]{@link http://www.unicode.org/reports/tr35/tr35.html#Likely_Subtags}
 *
 * @param {string} locale
 * @returns {string}
 */
module.exports = function(locale) {
    let parsedTag = langtag.parse(locale)
    let likelySubtag
    let searchChain = getSearchChain(locale)
    let i = 0;

    for(;i < searchChain.length; i++){
        if(searchChain[i] in likelySubtags){
            likelySubtag = likelySubtags[searchChain[i]]
            break
        }
    }

    if(likelySubtag){
        parsedTag = defaults(parsedTag, langtag.parse(likelySubtag))
    }

    return langtag.stringify(parsedTag)
}
