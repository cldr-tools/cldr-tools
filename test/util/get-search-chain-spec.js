var getSearchChain = require('util/get-search-chain')

describe('get-search-chain()', function (){
    it('should generate an array with all sub tags combination', function (){
        getSearchChain('zh-Hans-CN').should.eql([
            'zh-Hans-CN',
            'zh-CN',
            'zh-Hans',
            'zh'
        ])
    })
})
