'use strict';
/**
 * Tests utils methods.
 */

var assert = require('assert');
var utils = require('../src/util');

describe('Utils', function () {

    it('shuld be sane', function () {
        assert.equal(!!utils, true);
    });

    describe('regarding the script generation', function () {
        it('should generate js only script correctly', function () {
            var args = ['JAVASCRIPT'];
            var actual = utils.genLoadScript.apply(null, args);
            var expected = "var d=document;" +
                            "var s;" +
                            "var h = d.getElementsByTagName('head')[0];" +
                            "s = d.createElement('script');" +
                            "s.type='text/javascript';" +
                            "s.async=true;" +
                            "s.src='JAVASCRIPT';" +
                            "h.appendChild(s);";

            assert.equal(actual, expected);

        });

        // it('should generate css only script correctly', function () {
            // var args = [];
            // var actual = utils.genLoadScript.apply(null, args);
            // var expected = ;

            // assert.equal(actual, expected);
        // });

        // it('should generate css and js script correctly', function () {
            // var args = [];
            // var actual = utils.genLoadScript.apply(null, args);
            // var expected = ;

            // assert.equal(actual, expected);
        // });

        // it('should generate js/css/socketio script correctly', function () {
            // var args = [];
            // var actual = utils.genLoadScript.apply(null, args);
            // var expected = ;

            // assert.equal(actual, expected);
        // });
    });
});