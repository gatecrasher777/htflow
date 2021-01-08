'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test cmd helper function', function() {
    
    var doSomething = function(a,b,c) {
        // event handler
    }

    it('Should return an empty string if input is empty, undefined, or invalid', function() {
        assert.strictEqual(ht.cmd(undefined),'');
        assert.strictEqual(ht.cmd(undefined,undefined),'');
        assert.strictEqual(ht.cmd(undefined,undefined,undefined),'');
        assert.strictEqual(ht.cmd(null),'');
        assert.strictEqual(ht.cmd(null,null),'');
        assert.strictEqual(ht.cmd(null,null,null),'');
        assert.strictEqual(ht.cmd([]),'');
        assert.strictEqual(ht.cmd([],[]),'');
        assert.strictEqual(ht.cmd([],[],[]),'');
        assert.strictEqual(ht.cmd({}),'');
        assert.strictEqual(ht.cmd({},{}),'');
        assert.strictEqual(ht.cmd({},{},{}),'');
    });

    it('Should return a javascript command as an onevent reponse', function() {
        assert.strictEqual(ht.cmd('doSomething'),'doSomething();');
        assert.strictEqual(ht.cmd('doSomething','to a string'),'doSomething(\'to a string\');');
        assert.strictEqual(ht.cmd('doSomething','to a string',369),'doSomething(\'to a string\',369);');
    });

    it('Should pass non-string/number parameters as declared/evaluated', function() {
        assert.strictEqual(ht.cmd('doSomething',undefined,369),'doSomething(undefined,369);');
        assert.strictEqual(ht.cmd('doSomething',undefined,NaN),'doSomething(undefined,NaN);');
        assert.strictEqual(ht.cmd('doSomething',{an:'object'},['an','array']),'doSomething({"an":"object"},["an","array"]);');
        assert.strictEqual(ht.cmd('doSomething',(3==6),(9==9),Infinity),'doSomething(false,true,Infinity);');
    });

});
