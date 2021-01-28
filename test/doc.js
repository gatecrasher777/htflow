'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test doc function',function(){
    
    it('Should return html5 doc string, optional input and ignore invalid input',function(){
        assert.strictEqual(ht.doc(),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(undefined),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(undefined,undefined),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(undefined,undefined,undefined),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(null),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(null,null),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(null,null,null),'<DOCTYPE html>');
        assert.strictEqual(ht.doc([]),'<DOCTYPE html>');
        assert.strictEqual(ht.doc([],[]),'<DOCTYPE html>');
        assert.strictEqual(ht.doc([],[],[]),'<DOCTYPE html>');
        assert.strictEqual(ht.doc({}),'<DOCTYPE html>');
        assert.strictEqual(ht.doc({},{}),'<DOCTYPE html>');
        assert.strictEqual(ht.doc({},{},{}),'<DOCTYPE html>');
        assert.strictEqual(ht.doc(ht.html()),'<DOCTYPE html><html></html>');
        assert.strictEqual(ht.doc(()=>{return ht.html()}),'<DOCTYPE html><html></html>');
    });

});
