'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test cmd helper function and ensure correct quote escaping', function() {
    
    var doSomething = function(a,b,c) {
        // event handler
    }

    it('Should return an empty event string if input is empty, undefined, or invalid', function() {
        assert.strictEqual(ht.img({onclick:ht.cmd()}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(undefined,undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(undefined,undefined,undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(null,null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd(null,null,null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd([])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd([],[])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd([],[],[])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd({})}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd({},{})}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.cmd({},{},{})}),'<img onclick />');
    });

    it('Should return a javascript command with optional parameters to an event handler', function() {
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething')}),'<img onclick="doSomething();" />');
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething','to a string')}),'<img onclick="doSomething(\"to a string\");" />');
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething','to a string',369)}),'<img onclick="doSomething(\"to a string\",369);" />');
    });

    it('Should pass non-string/number parameters as declared/evaluated', function() {
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething',undefined,369)}),'<img onclick="doSomething(undefined,369);" />');
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething',undefined,NaN)}),'<img onclick="doSomething(undefined,NaN);" />');
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething',{an:'object'},['an','array'])}),'<img onclick="doSomething({\"an\":\"object\"},[\"an\",\"array\"]);" />');
        assert.strictEqual(ht.img({onclick:ht.cmd('doSomething',(3==6),(9==9),Infinity)}),'<img onclick="doSomething(false,true,Infinity);" />');
    });

});
