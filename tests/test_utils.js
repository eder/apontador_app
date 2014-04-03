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

});