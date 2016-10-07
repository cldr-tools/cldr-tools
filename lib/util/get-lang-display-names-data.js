/**
 * An object which key is language tag, value is language display name
 *
 * @typedef {Object<string, string>} LanguageDisplayNamesData
 */

/**
 * @module cldr-tools/lib/util/get-lang-display-names-data
 */

/**
 * get data for all languages display names in {availableLocale}
 *
 * @example
 * // return {
 * //   'en': 'English',
 * //   'zh': 'Chinese',
 * //   'ja': 'Japanese',
 * //   ...
 * // }
 * getLanguageDisplayNamesData('en')
 *
 * @param {String} availableLocale - locale available in CLDR
 * @returns {LanguageDisplayNamesData}
 */
module.exports = function(availableLocale) {
    // use string combined syntax for webpack loader
    return require('cldr-localenames-full/main/' + availableLocale + '/languages.json').
        main[availableLocale].localeDisplayNames.languages
}
