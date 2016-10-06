/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
module.exports = function(availableLocale) {
    return require('cldr-localenames-full/main/' + availableLocale + '/languages.json').
        main[availableLocale].localeDisplayNames.languages
}
