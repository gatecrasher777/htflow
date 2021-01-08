'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test evt helper function', function() {
    
    var doSomething = function(event,a,b,c) {
        // event handler
    }

    it('Should return an empty string if input is empty, undefined, or invalid', function() {
        assert.strictEqual(ht.evt(undefined),'');
        assert.strictEqual(ht.evt(undefined,undefined),'');
        assert.strictEqual(ht.evt(undefined,undefined,undefined),'');
        assert.strictEqual(ht.evt(null),'');
        assert.strictEqual(ht.evt(null,null),'');
        assert.strictEqual(ht.evt(null,null,null),'');
        assert.strictEqual(ht.evt([]),'');
        assert.strictEqual(ht.evt([],[]),'');
        assert.strictEqual(ht.evt([],[],[]),'');
        assert.strictEqual(ht.evt({}),'');
        assert.strictEqual(ht.evt({},{}),'');
        assert.strictEqual(ht.evt({},{},{}),'');
    });

    it('Should return a javascript command as an onevent reponse with leading event parameter', function() {
        assert.strictEqual(ht.evt('doSomething'),'doSomething(event);');
        assert.strictEqual(ht.evt('doSomething','to a string'),'doSomething(event,\'to a string\');');
        assert.strictEqual(ht.evt('doSomething','to a string',369),'doSomething(event,\'to a string\',369);');
    });

    it('Should pass non-string/number parameters as declared/evaluated', function() {
        assert.strictEqual(ht.evt('doSomething',undefined,369),'doSomething(event,undefined,369);');
        assert.strictEqual(ht.evt('doSomething',undefined,NaN),'doSomething(event,undefined,NaN);');
        assert.strictEqual(ht.evt('doSomething',{an:'object'},['an','array']),'doSomething(event,{"an":"object"},["an","array"]);');
        assert.strictEqual(ht.evt('doSomething',(3==6),(9==9),Infinity),'doSomething(event,false,true,Infinity);');
    });

});
