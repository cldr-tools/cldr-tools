var getAvailableLocale = require('util/get-available-locale')

describe('getAvailableLocale(targetLoacle)', function (){
    it('should return an available locale value specified by targetLoacle', function (){
        getAvailableLocale('zh-CN').should.eql('zh-Hans')
        getAvailableLocale('zh-TW').should.eql('zh-Hant')
        getAvailableLocale('en-US').should.eql('en')
        getAvailableLocale('en-GB').should.eql('en-GB')
        getAvailableLocale('th-TH').should.eql('th')           // with extra region tag
        getAvailableLocale('my_MY').should.eql('my')           // with underscore
    })
})
