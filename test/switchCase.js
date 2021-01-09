'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test switchCase method', function() {

    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.switchCase(),'');
        assert.strictEqual(ht.switchCase(undefined),'');
        assert.strictEqual(ht.switchCase(undefined,undefined),'');
        assert.strictEqual(ht.switchCase(undefined,undefined,undefined),'');
        assert.strictEqual(ht.switchCase(undefined,undefined,undefined,undefined),'');
        assert.strictEqual(ht.switchCase(null),'');
        assert.strictEqual(ht.switchCase(null,null),'');
        assert.strictEqual(ht.switchCase(null,null,null),'');
        assert.strictEqual(ht.switchCase(null,null,null,null),'');
        assert.strictEqual(ht.switchCase([]),'');
        assert.strictEqual(ht.switchCase([],[]),'');
        assert.strictEqual(ht.switchCase([],[],[]),'');
        assert.strictEqual(ht.switchCase([],[],[],[]),'');
        assert.strictEqual(ht.switchCase({}),'');
        assert.strictEqual(ht.switchCase({},{}),'');
        assert.strictEqual(ht.switchCase({},{},{}),'');
        assert.strictEqual(ht.switchCase({},{},{},{}),'');
    });

    it('Should execute Html[n] if opt[n] is true', function() {
        assert.strictEqual(
            ht.switchCase(
                5,
                [1,3,5,7,9],
                [ht.main(),ht.span(),ht.div(),ht.p(),ht.h2()],
                ht.br()
            )   
            ,'<div></div>'
        );
    });

    it('Should allow fallthrough where Html[n]=\'||\'', function() {
        var foo = function(v) {
            return v+v+v;
        }
        var val = 1;
        assert.strictEqual(
            ht.switchCase(
                val,
                [1,2,3,4,5],
                ['||','||',()=>{ return 'X'+foo(val); },'||','Y'],
                'Z'
            ),
            'X3'
        );
        val = 2;
        assert.strictEqual(
            ht.switchCase(
                val,
                [1,2,3,4,5],
                ['||','||',()=>{ return 'X'+foo(val); },'||','Y'],
                'Z'
            ),
            'X6'
        );
        val = 4;
        assert.strictEqual(
            ht.switchCase(
                val,
                [1,2,3,4,5],
                ['||','||',()=>{ return 'X'+foo(val); },'||','Y'],
                'Z'
            ),
            'Y'
        );
    });

    it('It should execute defaultHtml if val does not match any options', function() {
        assert.strictEqual(
            ht.switchCase(
                'cabbage',
                [1,2,3,4,5],
                ['||','||',()=>{ return 'X'+foo(val); },'||','Y'],
                'Z'
            ),
            'Z'
        );
    });

});
