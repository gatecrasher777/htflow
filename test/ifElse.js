'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test ifElse method',function(){

    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.ifElse(),'');
        assert.strictEqual(ht.ifElse(undefined),'');
        assert.strictEqual(ht.ifElse(undefined,undefined),'');
        assert.strictEqual(ht.ifElse(undefined,undefined,undefined),'');
        assert.strictEqual(ht.ifElse(null),'');
        assert.strictEqual(ht.ifElse(null,null),'');
        assert.strictEqual(ht.ifElse(null,null,null),'');
        assert.strictEqual(ht.ifElse([]),'');
        assert.strictEqual(ht.ifElse([],[]),'');
        assert.strictEqual(ht.ifElse([],[],[]),'');
        assert.strictEqual(ht.ifElse({}),'');
        assert.strictEqual(ht.ifElse({},{}),'');
        assert.strictEqual(ht.ifElse({},{},{}),'');
    });

    it('Should execute ifHtml if condition is true', function() {
        assert.strictEqual(ht.ifElse((3==3),ht.div(),ht.span()),'<div></div>');
    });

    it('It should execute elseHtml if condition is false', function() {
        assert.strictEqual(ht.ifElse((3==6),ht.div(),ht.span()),'<span></span>');
    });

    it('ifHtml should not be evaluated if condition is false', function() {
        let a;
        assert.strictEqual(
            ht.ifElse(
                (a!==undefined),
                ht.div('Here '+a+' is used...'),
                ht.div('...whereas it is safe here.')
            ),
            '<div>...whereas it is safe here.</div>'
        );
        a = 'sanity';
        assert.strictEqual(
            ht.ifElse(
                (a!==undefined),
                ht.div('Here '+a+' is used.'),
                ht.div('Whereas it is safe here')
            ),
            '<div>Here sanity is used.</div>'
        );
    });

    it('elseHtml should not be evaluated if condition is false', function() {
        let a;
        assert.strictEqual(
            ht.ifElse(
                (a===undefined),
                ht.div('Whereas it is safe here...'),
                ht.div('...here '+a+' is used.')
            ),
            '<div>Whereas it is safe here...</div>'
        );
        a = 'sanity';
        assert.strictEqual(
            ht.ifElse(
                (a===undefined),
                ht.div('Whereas it is safe here...'),
                ht.div('...here '+a+' is used.')
            ),
            '<div>...here sanity is used.</div>'
        );
    });

});
