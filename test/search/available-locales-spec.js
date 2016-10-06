/**
 * @author 锂锌 <zinc.lx@alibaba-inc.com>
 */
var search = require('search/available-locales')

describe('search/available-locales', function (){
    describe('search("中文")', function (){
        it('should return ["zh", "zh-Hans", "zh-Hant"]', function (){
            search('中文').should.eql(
                ['zh', 'zh-Hans', 'zh-Hant']
            )
        })
    })
    describe('search("英文")', function (){
        it('should return ["en", "en-AU", "en-CA", "en-GB"]', function (){
            search('英文').should.eql(
                ['en', 'en-AU', 'en-CA', 'en-GB']
            )
        })
    })

    describe('search("ئۇيغۇرچە")', function (){
        it('should return ["ug"]', function (){
            search('ئۇيغۇرچە').should.eql(
                ['ug']
            )
        })
    })

    describe('search("维吾尔文")', function (){
        it('should return ["ug"]', function (){
            search('维吾尔文').should.eql(
                ['ug']
            )
        })
    })

    describe('search("བོད་སྐད་")', function (){
        it('should return ["bo"]', function (){
            search('བོད་སྐད་').should.eql(
                ['bo']
            )
        })
    })

    describe('search("한국어")', function (){
        it('should return ["ko"]', function (){
            search('한국어').should.eql(
                ['ko']
            )
        })
    })
})
