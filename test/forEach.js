'use strict'

const ht = require('../htflow.js')();
const { strict, strictEqual } = require('assert');
const assert = require('assert');

describe('Test forEach method', function(){

    const a = ['a','b','c','d'];
    const b = ['y',3,'z',9];


    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.forEach(),'');
        assert.strictEqual(ht.forEach(undefined),'');
        assert.strictEqual(ht.forEach(undefined,undefined),'');
        assert.strictEqual(ht.forEach(undefined,undefined,undefined),'');
        assert.strictEqual(ht.forEach(null),'');
        assert.strictEqual(ht.forEach(null,null),'');
        assert.strictEqual(ht.forEach(null,null,null),'');
        assert.strictEqual(ht.forEach([]),'');
        assert.strictEqual(ht.forEach([],[]),'');
        assert.strictEqual(ht.forEach([],[],[]),'');
        assert.strictEqual(ht.forEach({}),'');
        assert.strictEqual(ht.forEach({},{}),'');
        assert.strictEqual(ht.forEach({},{},{}),'');
    });

    it('Should execute html for each member of an array', function() {
        assert.strictEqual(ht.forEach(a,(e,i,a)=>{return e}),'abcd');
        assert.strictEqual(ht.forEach(b,(e,i,a)=>{return e}),'y3z9');
        assert,strictEqual(
            ht.forEach(
                [1,4,'r',()=>{return 'g'},[3,[6,9,'z']],Infinity,NaN],
                (e,i,a) => {
                    return ht.div(e);
                }
            ),
            '<div>1</div><div>4</div><div>r</div><div>g</div><div>369z</div><div>Infinity</div><div>NaN</div>'
        );
    });

});
