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
            var expected =
                "<script>" +
                    "window.onload = function () {" +
                        "var d=document;" +
                        "var s;" +
                        "var h = d.getElementsByTagName('head')[0];" +

                        "s = d.createElement('script');" +
                        "s.type='text/javascript';" +
                        "s.async=true;" +
                        "s.src='JAVASCRIPT';" +
                        "h.appendChild(s);" +
                    "};" +
                "</script>";

            assert.strictEqual(actual, expected);

        });

        it('should generate css only script correctly', function () {
            var args = [null,'CSS'];
            var actual = utils.genLoadScript.apply(null, args);
            var expected =
                "<script>" +
                    "window.onload = function () {" +
                        "var d=document;" +
                        "var s;" +
                        "var h = d.getElementsByTagName('head')[0];" +

                        "s = d.createElement('link');" +
                        "s.href = 'CSS';" +
                        "s.rel = 'stylesheet';" +
                        "s.type = 'text/css';" +
                        "h.appendChild(s);" +
                    "};" +
                "</script>";

            assert.equal(actual, expected);
        });

        it('should generate css and js script correctly', function () {
            var args = ['JS', 'CSS'];
            var actual = utils.genLoadScript.apply(null, args);
            var expected =
                "<script>" +
                    "window.onload = function () {" +
                        "var d=document;" +
                        "var s;" +
                        "var h = d.getElementsByTagName('head')[0];" +

                        "s = d.createElement('script');" +
                        "s.type='text/javascript';" +
                        "s.async=true;" +
                        "s.src='JS';" +
                        "h.appendChild(s);" +

                        "s = d.createElement('link');" +
                        "s.href = 'CSS';" +
                        "s.rel = 'stylesheet';" +
                        "s.type = 'text/css';" +
                        'h.appendChild(s);' +
                    '};' +
                '</script>';
            assert.equal(actual, expected);
        });

        it('should generate js/css/socketio script correctly', function () {
            var args = ['JS', 'CSS', 'SOCKETURL'];
            var actual = utils.genLoadScript.apply(null, args);
            var expected =
                "<script>" +
                    "window.onload = function () {" +
                        "var d=document;" +
                        "var s;" +
                        "var h = d.getElementsByTagName('head')[0];" +

                        "s = d.createElement('script');" +
                        "s.type='text/javascript';" +
                        "s.async=true;" +
                        "s.src='JS';" +
                        "h.appendChild(s);" +

                        "s = d.createElement('link');" +
                        "s.href = 'CSS';" +
                        "s.rel = 'stylesheet';" +
                        "s.type = 'text/css';" +
                        'h.appendChild(s);' +
                    '};' +
                '</script>' +

                '<script src="http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js"></script>' +
                "<script>" +
                    "var socket = io.connect('SOCKETURL');" +
                    "socket.on('code', function (data) {" +
                        "eval(data);" +
                    "});" +

                    "socket.on('reload', function (data) {" +
                        "window.location.reload();" +
                    "})" +

                "</script>";

            assert.equal(actual, expected);
        });
    });
});