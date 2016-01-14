#grunt-xqlint
[![Build Status](http://img.shields.io/travis/wcandillon/grunt-xqlint/master.svg?style=flat)](https://travis-ci.org/wcandillon/grunt-xqlint) [![NPM version](http://img.shields.io/npm/v/grunt-xqlint.svg?style=flat)](http://badge.fury.io/js/grunt-xqlint) [![Code Climate](http://img.shields.io/codeclimate/github/wcandillon/grunt-xqlint.svg?style=flat)](https://codeclimate.com/github/wcandillon/grunt-xqlint)

Grunt task for [XQLint](http://github.com/wcandillon/xqlint)

## Example
```javascript
grunt.initConfig({
    xqlint: {
        options: {
            src: ['/path/to/queries/**/*.xq']
        },
        dist: {}
    }
});
```

