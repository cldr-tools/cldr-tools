/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'
const likelySubtags = require('cldr-core/supplemental/likelySubtags.json').
    supplemental.likelySubtags
const defaults = require('lodash/defaults')

const langtag = require('./langtag')
const getSearchChain = require('./get-search-chain')

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
