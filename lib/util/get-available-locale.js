/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'

const availableLocales = require('cldr-core/availableLocales.json').availableLocales.full
const getSearchChain = require('./get-search-chain')
const addLikelySubtags = require('./add-likely-subtags')

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
