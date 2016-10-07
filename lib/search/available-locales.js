'use strict'
const memoize = require('memoizee')
const availableLocales = require('cldr-core/availableLocales.json').availableLocales.full
const languageDisplayNamesIn = require('../util/get-lang-display-names-data')
const indexes = makeIndex()

/**
 * @module cldr-tools/lib/search/available-locales
 */

/**
 * search for available locales with given language name.
 * the language name could be all kinds of languages.
 * this function is memoized, the result would be cached.
 * it could be used to build an api or a cli for language searching.
 *
 * @example
 * const availableLocales = require('cldr-tools/lib/search/available-locales')
 *
 * availableLocales('English') // => ['en', 'en-AU', 'en-CA', 'en-GB']
 * availableLocales('英文') // => ['en', 'en-AU', 'en-CA', 'en-GB']
 * availableLocales('中文') // => ['zh', 'zh-Hans', 'zh-Hant']
 * availableLocales('Chinese') // => ['zh', 'zh-Hans', 'zh-Hant']
 * availableLocales('日文') // => ['ja']
 * availableLocales('日本語') // => ['ja']
 *
 * @param displayName
 * @returns {*}
 */
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
