/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
'use strict'

const langtag = require('./langtag')
const pick = require('lodash/pick')

module.exports = function(locale) {
    let result = [];

    let parsedTag = langtag.parse(locale);

    result.push(langtag.stringify(parsedTag));
    result.push(langtag.stringify(pick(parsedTag, 'language', 'region')));
    result.push(langtag.stringify(pick(parsedTag, 'language', 'script')));
    result.push(parsedTag.language);

    return result;
}
