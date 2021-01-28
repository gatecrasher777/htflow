'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test registration of a custom double tagged html element', function() {
    
    let s = 'text variable'
    let f = function() {
        return 'text function';
    }

    let attrib = {
        id: 'myexample',
        'class': 'examples tests'
    }

    const customTag = 'example';

    ht.doubleReg(customTag);

    it('Should return an empty double tag if input is empty, undefined or invalid', function() {
        assert.strictEqual(ht.example(),'<example></example>');
        assert.strictEqual(ht.example(undefined),'<example></example>');
        assert.strictEqual(ht.example(undefined,undefined),'<example></example>');
        assert.strictEqual(ht.example(undefined,undefined,undefined),'<example></example>');
        assert.strictEqual(ht.example(null),'<example></example>');
        assert.strictEqual(ht.example(null,null),'<example></example>');
        assert.strictEqual(ht.example(null,null,null),'<example></example>');
        assert.strictEqual(ht.example([]),'<example></example>');
        assert.strictEqual(ht.example([],[]),'<example></example>');
        assert.strictEqual(ht.example([],[],[]),'<example></example>');
        assert.strictEqual(ht.example({}),'<example></example>');
        assert.strictEqual(ht.example({},{}),'<example></example>');
        assert.strictEqual(ht.example({},{},{}),'<example></example>');
    });

    it('Should include string/function input within a double tag', function() {
        assert.strictEqual(ht.example('direct text'),'<example>direct text</example>');
        assert.strictEqual(ht.example(s),'<example>text variable</example>');
        assert.strictEqual(ht.example(f),'<example>text function</example>');
    });

    it('Should concatinate multiple string/function parameters within a double tag', function() {
        assert.strictEqual(ht.example('direct text',' for you to enjoy'),'<example>direct text for you to enjoy</example>');
        assert.strictEqual(ht.example('A ',s,ht.br(),'and a ',f),'<example>A text variable<br>and a text function</example>');
    });

    it('Should interpret key/value pairs of an initial object parameter as element atrributes/properties', function() {
        assert.strictEqual(ht.example(attrib),'<example id="myexample" class="examples tests"></example>');
        assert.strictEqual(ht.example(attrib,f),'<example id="myexample" class="examples tests">text function</example>');
        assert.strictEqual(ht.example(attrib,attrib),'<example id="myexample" class="examples tests"></example>');
    });

    it('Should handle numbers and booleans as strings', function() {
        assert.strictEqual(ht.example(369),'<example>369</example>');
        assert.strictEqual(ht.example((3==9)),'<example>false</example>');
        assert.strictEqual(ht.example((9==9)),'<example>true</example>');
    });

    it('Should concatenate arrays of strings/functions/arrays recursively', function() {
        assert.strictEqual(ht.example(['A ',s,ht.br(),'and a ',f]),'<example>A text variable<br>and a text function</example>');
        assert.strictEqual(ht.example(attrib,'A',['B','C'],'D',['E','F',['G','H',['I','J']]]),'<example id="myexample" class="examples tests">ABCDEFGHIJ</example>');
    });

});
