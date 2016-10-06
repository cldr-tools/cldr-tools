var addLikelySubtags = require('util/add-likely-subtags');

describe('add-likely-subtags', function (){
    describe('.addLikelySubtags("zh-SG")', function (){
        it('should return "zh-Hans-SG"', function (){
            addLikelySubtags('zh-SG').should.equal('zh-Hans-SG');
        });
    });

    describe('.addLikelySubtags("en-US-alt-short")', function (){
        it('should return "en-Latn-US"', function (){
            addLikelySubtags('en-US-alt-short').should.equal('en-Latn-US');
        });
    });
})
