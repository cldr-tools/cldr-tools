var langtag = require('util/langtag');

describe('langtag', function (){
    describe('.parse("en-US")', function (){
        it('should return {language: "en", script: undefined, region: "us"}', function (){
            langtag.parse('en-US').should.eql({
                language: 'en',
                script: undefined,
                region: 'us'
            });
        });
    });

    describe('.parse("zh-Hans-CN")', function (){
        it('should return {language: "zh", script: "hans", region: "cn"}', function (){
            langtag.parse('zh-Hans-CN').should.eql({
                language: 'zh',
                script: 'hans',
                region: 'cn'
            });
        });
    });

    describe('.stringify({language: "en", script: undefined, region: "us"})', function (){
        it('should return "en-US"', function (){
            langtag.stringify({
                language: 'en',
                region: 'us'
            }).should.eql('en-US');
        });
    });

    describe('.stringify({language: "zh", script: "hant", region: "tw"})', function (){
        it('should return "zh-Hant-TW"', function (){
            langtag.stringify({
                language: 'zh',
                script: 'hant',
                region: 'tw'
            }).should.eql('zh-Hant-TW');
        });
    });
});
