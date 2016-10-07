# CLDR Tools

[![Build Status](https://travis-ci.org/cldr-tools/cldr-tools.svg?branch=master)](https://travis-ci.org/cldr-tools/cldr-tools)
[![Coverage Status](https://coveralls.io/repos/github/cldr-tools/cldr-tools/badge.svg?branch=master)](https://coveralls.io/github/cldr-tools/cldr-tools?branch=master)


> Please Note

> This is an experimental project, modules or api may change frequently.


This project aim to build utility and convenient tools for [CLDR](http://cldr.unicode.org/)(Common Locale Data Repository).
Hope to help front-end developers to build globalization applications.


## Features (for now)

* transform given locale to available locale in CLDR
* find language display names by given locales
* [search the available locale by given language names](https://cldr-tools.github.io/cldr-tools/demo/languages/)

## Features (to be implemented)

* decimal formatting: some thing like 1000000000 => 1 billion(in English) but 10亿(in Chinese)
* other many fun functions


## Getting Started

```
$ npm install cldr-tools

```

### search locales by language name

```
const search = require('cldr-tools/lib/search/available-locales')

search('English') // => ['en', 'en-AU', 'en-CA', 'en-GB']
search('英文') // => ['en', 'en-AU', 'en-CA', 'en-GB']
search('中文') // => ['zh', 'zh-Hans', 'zh-Hant']
search('Chinese') // => ['zh', 'zh-Hans', 'zh-Hant']
search('日文') // => ['ja']
search('日本語') // => ['ja']

```

### get languages' display name

```
const languageDisplayNames = require('cldr-tools/lib/display-names/languages')

languageDisplayNames(['zh', 'en'])
// => [{
   locale: 'zh',
   displayName: '中文'
}, {
   locale: 'en',
   displayName: 'English'
}]

languageDisplayNames(['zh', 'en'], 'en')
// => [{
   locale: 'zh',
   displayName: 'Chinese'
}, {
   locale: 'en',
   displayName: 'English'
}]


languageDisplayNames(['zh', 'en'], 'en', true)
// => [{
   locale: 'zh',
   displayName: 'Chinese',
   original: '中文'
}, {
   locale: 'en',
   displayName: 'English',
   original: 'English'
}]

```

## Command line tool

could search locales in your terminal

see [cldr-cli](https://github.com/cldr-tools/cldr-cli)

## Documentation

waiting to be write


## Contribute

This project is a fresh start, welcome to contribute!

