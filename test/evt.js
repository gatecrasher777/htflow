'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test evt helper function', function() {
    
    let doSomething = function(event,a,b,c) {
        // event handler
    }

    it('Should return an empty string if input is empty, undefined, or invalid', function() {
        assert.strictEqual(ht.img({onclick:ht.evt()}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(undefined,undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(undefined,undefined,undefined)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(null,null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt(null,null,null)}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt([])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt([],[])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt([],[],[])}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt({})}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt({},{})}),'<img onclick />');
        assert.strictEqual(ht.img({onclick:ht.evt({},{},{})}),'<img onclick />');
    });

    it('Should return a javascript command as an onevent reponse with leading event parameter', function() {
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething')}),'<img onclick="doSomething(event);" />');
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething','to a string')}),'<img onclick="doSomething(event,\"to a string\");" />');
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething','to a string',369)}),'<img onclick="doSomething(event,\"to a string\",369);" />');
    });

    it('Should pass non-string/number parameters as declared/evaluated', function() {
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething',undefined,369)}),'<img onclick="doSomething(event,undefined,369);" />');
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething',undefined,NaN)}),'<img onclick="doSomething(event,undefined,NaN);" />');
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething',{an:'object'},['an','array'])}),'<img onclick="doSomething(event,{\"an\":\"object\"},[\"an\",\"array\"]);" />');
        assert.strictEqual(ht.img({onclick:ht.evt('doSomething',(3==6),(9==9),Infinity)}),'<img onclick="doSomething(event,false,true,Infinity);" />');
    });

});
