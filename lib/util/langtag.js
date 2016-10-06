/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'

let tagRegex = /^([a-z]{2,3}|[a-z]{5,8})-?([a-z]{4})?-?([a-z]{2}|\d{3})?/


/**
 * parse locale identifier into object
 * @param {string} locale
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
