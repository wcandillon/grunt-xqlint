'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('xqlint', 'Check XQuery & JSONiq queries', function(){
        var fs = require('fs');
        var XQLint = require('xqlint').XQLint;
        require('colors');
        
        var options = this.options();
        var files = grunt.file.expand(options.src);
        var styleCheck = options.styleCheck === true;

        var errors = 0;
        var warnings = 0;

        var spaces = function(count){
            var result = '';
            for(var i = 1; i <= count; i++){
                result += ' ';
            }
            return result;
        };
        files.forEach(function(file){
            var source = fs.readFileSync(file, 'utf-8');
            var linter = new XQLint(source, { styleCheck: styleCheck, fileName: file });
            var markers = linter.getMarkers();
            if(markers.length > 0) {
                var lines = source.split('\n');
                console.log(('\n' + file).bold);
                linter.getErrors().forEach(function(error){
                    errors++;
                    console.log('\t' + (error.pos.sl + 1) + ' |' + (lines[error.pos.sl].grey));
                    console.log('\t' + spaces((error.pos.sl + 1 + '').length + 1) + spaces(error.pos.sc + 1) + ('^ ' + error.message).red);
                });
                linter.getWarnings().forEach(function(error){
                    warnings++;
                    console.log('\t' + (error.pos.sl + 1) + ' |' + (lines[error.pos.sl].grey));
                    console.log('\t' + spaces((error.pos.sl + 1 + '').length + 1) + spaces(error.pos.sc + 1) + ('^ ' + error.message).yellow);
                });
            }
        });
        if(errors === 0 && warnings === 0) {
            console.log(('Linted ' + files.length + ' files').green);
        } else if(errors > 0) {
            grunt.fail.warn(('\nLinted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').red);
        } else if(warnings > 0) {
            grunt.fail.warn(('\nLinted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').yellow);
        }
    });
};
