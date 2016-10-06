/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
var languageDisplayNames = require('display-names/languages')
var path = require('path')

describe('languageDisplayNames()', function (){
    describe('languageDisplayNames(locales)', function (){
        it('should return [] while no locales given', function (){
            languageDisplayNames().should.have.length(0)
        })

        it('should return undefined displayName while given invalid locales', function (){
            languageDisplayNames(['foo', 'bar']).should.eql([
                {locale: 'foo', displayName: undefined},
                {locale: 'bar', displayName: undefined},
            ])
        })

        it('should handle available locales', function (){
            languageDisplayNames(
                ['zh-Hans', 'zh-Hant', 'en', 'ug', 'bo']).
            should.eql([
                {locale: 'zh-Hans', displayName: '简体中文'},
                {locale: 'zh-Hant', displayName: '繁體中文'},
                {locale: 'en', displayName: 'English'},
                {locale: 'ug', displayName: 'ئۇيغۇرچە'},
                {locale: 'bo', displayName: 'བོད་སྐད་'},
            ])
        })

        it('should handle legacy locales', function (){
            languageDisplayNames(["zh-CN", "zh-TW", "zh-SG", 'ug-CN', 'bo-CN']).
            should.eql([
                {locale: 'zh-CN', displayName: '简体中文'},
                {locale: 'zh-TW', displayName: '繁體中文'},
                {locale: 'zh-SG', displayName: '简体中文'},
                {locale: 'ug-CN', displayName: 'ئۇيغۇرچە'},
                {locale: 'bo-CN', displayName: 'བོད་སྐད་'},
            ])
        })
    })

    describe('languageDisplayNames(locales, specificLang)', function (){
        it('should return result with specified language', function (){

            languageDisplayNames([
                'zh-Hans', 'zh-Hant', 'en', 'ug', 'bo'], 'zh-Hans').
            should.eql([
                {locale: 'zh-Hans', displayName: '简体中文'},
                {locale: 'zh-Hant', displayName: '繁体中文'},
                {locale: 'en', displayName: '英文'},
                {locale: 'ug', displayName: '维吾尔文'},
                {locale: 'bo', displayName: '藏文'},
            ])

            languageDisplayNames([
                'zh-Hans', 'zh-Hant', 'en', 'ug', 'bo'], 'zh-Hant').
            should.eql([
                {locale: 'zh-Hans', displayName: '簡體中文'},
                {locale: 'zh-Hant', displayName: '繁體中文'},
                {locale: 'en', displayName: '英文'},
                {locale: 'ug', displayName: '維吾爾文'},
                {locale: 'bo', displayName: '藏文'},
            ])

            languageDisplayNames([
                'zh-Hans', 'zh-Hant', 'en', 'ug', 'bo'], 'en').
            should.eql([
                {locale: 'zh-Hans', displayName: 'Simplified Chinese'},
                {locale: 'zh-Hant', displayName: 'Traditional Chinese'},
                {locale: 'en', displayName: 'English'},
                {locale: 'ug', displayName: 'Uyghur'},
                {locale: 'bo', displayName: 'Tibetan'},
            ])
        })

        it('should return undefined displayName while given invalid specificLang', function (){
            languageDisplayNames([
                'zh-Hans', 'zh-Hant', 'en', 'ug', 'bo'], 'foo').
            should.eql([
                {locale: 'zh-Hans', displayName: undefined},
                {locale: 'zh-Hant', displayName: undefined},
                {locale: 'en', displayName: undefined},
                {locale: 'ug', displayName: undefined},
                {locale: 'bo', displayName: undefined},
            ])
        })
    })

    describe('languageDisplayNames(locales, specificLang, true)', function (){
        it('should return with specified language and original', function (){

            languageDisplayNames([
                "zh-Hans", "zh-Hant", "en", 'ug', 'bo'], 'en-US', true).
            should.eql([
                {locale: 'zh-Hans', displayName: 'Simplified Chinese', original: '简体中文'},
                {locale: 'zh-Hant', displayName: 'Traditional Chinese', original: '繁體中文'},
                {locale: 'en', displayName: 'English', original: 'English'},
                {locale: 'ug', displayName: 'Uyghur', original: 'ئۇيغۇرچە'},
                {locale: 'bo', displayName: 'Tibetan', original: 'བོད་སྐད་'},
            ])
        })
    })
})
