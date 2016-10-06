/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'
const memoize = require('memoizee')
const availableLocales = require('cldr-core/availableLocales.json').availableLocales.full
const languageDisplayNamesIn = require('../util/get-lang-display-names-data')
const indexes = makeIndex()

module.exports = function (displayName){
    return memoizedSearch(displayName.toLowerCase())
}

function makeIndex (){
    let result = {
        keys: [],
        map: {}
    };

    availableLocales.forEach(function(locale) {
        let languages = languageDisplayNamesIn(locale)

        Object.keys(languages).forEach(function(locale) {
            let displayName = languages[locale].toLowerCase()
            result.keys.push(displayName)
            result.map[displayName] = locale
        })
    })

    return result;
}

function search (indexes, displayName){
    let result = {}

    if( displayName in indexes.map ){
        result[indexes.map[displayName]] = 1
    }

    findMatch(displayName, indexes.keys).forEach(function(matchedDisplayName) {
        result[indexes.map[matchedDisplayName]] = 1
    })

    return Object.keys(result).filter(function(locale) {
        return availableLocales.indexOf(locale) > -1
    })
}

let memoizedSearch = memoize(search.bind(null, indexes), {
    primitive: true,
    normalizer: function(args) {
        return args[0].toLowerCase()
    }
})

function findMatch(target, sources){
    return sources.filter(function(item) {
        return item.indexOf(target) > -1
    })
}
