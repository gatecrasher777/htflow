'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test registration of a custom single tagged html element method', function() {
    
    let s = 'text variable'
    let f = function() {
        return 'text function';
    }

    let attrib = {
        foo: 'etcetera',
        widget: 'jelly'
    }

    const customTag = 'specimen';

    ht.singleReg(customTag);

    it('Should return an empty single tag if input is empty, undefined or invalid', function() {
        assert.strictEqual(ht.specimen(),'<specimen>');
        assert.strictEqual(ht.specimen(undefined),'<specimen>');
        assert.strictEqual(ht.specimen(undefined,undefined),'<specimen>');
        assert.strictEqual(ht.specimen(undefined,undefined,undefined),'<specimen>');
        assert.strictEqual(ht.specimen(null),'<specimen>');
        assert.strictEqual(ht.specimen(null,null),'<specimen>');
        assert.strictEqual(ht.specimen(null,null,null),'<specimen>');
        assert.strictEqual(ht.specimen([]),'<specimen>');
        assert.strictEqual(ht.specimen([],[]),'<specimen>');
        assert.strictEqual(ht.specimen([],[],[]),'<specimen>');
        assert.strictEqual(ht.specimen({}),'<specimen>');
        assert.strictEqual(ht.specimen({},{}),'<specimen>');
        assert.strictEqual(ht.specimen({},{},{}),'<specimen>');
    });

    it('Should ignore string/function input and return an empty single tag', function() {
        assert.strictEqual(ht.specimen('direct text'),'<specimen>');
        assert.strictEqual(ht.specimen(s),'<specimen>');
        assert.strictEqual(ht.specimen(f),'<specimen>');
    });

    it('Should ignore multiple string/function parameters and return an empty single tag', function() {
        assert.strictEqual(ht.specimen('direct text',' for you to enjoy'),'<specimen>');
        assert.strictEqual(ht.specimen('A ',s,ht.br(),'and a ',f),'<specimen>');
    });

    it('Should interpret key/value pairs of an initial object parameter as element atrributes/properties', function() {
        assert.strictEqual(ht.specimen(attrib),'<specimen foo="etcetera" widget="jelly" />');
        assert.strictEqual(ht.specimen(attrib,f),'<specimen foo="etcetera" widget="jelly" />');
        assert.strictEqual(ht.specimen(attrib,attrib),'<specimen foo="etcetera" widget="jelly" />');
    });

    it('Should ignore the attribute object if it is not the first parameter', function() {
        assert.strictEqual(ht.specimen('direct text',' for you to enjoy',attrib),'<specimen>');
        assert.strictEqual(ht.specimen('A ',s,ht.br(),attrib,'and a ',f),'<specimen>');
    });

});
