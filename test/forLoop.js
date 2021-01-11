'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test forLoop method',function(){

    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.forLoop(),'');
        assert.strictEqual(ht.forLoop(undefined),'');
        assert.strictEqual(ht.forLoop(undefined,undefined),'');
        assert.strictEqual(ht.forLoop(undefined,undefined,undefined),'');
        assert.strictEqual(ht.forLoop(null),'');
        assert.strictEqual(ht.forLoop(null,null),'');
        assert.strictEqual(ht.forLoop(null,null,null),'');
        assert.strictEqual(ht.forLoop([]),'');
        assert.strictEqual(ht.forLoop([],[]),'');
        assert.strictEqual(ht.forLoop([],[],[]),'');
        assert.strictEqual(ht.forLoop({}),'');
        assert.strictEqual(ht.forLoop({},{}),'');
        assert.strictEqual(ht.forLoop({},{},{}),'');
    });

    it('Should execute html for each iteration of the loop', function() {
        assert.strictEqual(ht.forLoop(1,5,(i)=>{return ht.br();}),'<br><br><br><br><br>');
        assert.strictEqual(ht.forLoop(5,1,(i)=>{return ht.br();}),'<br><br><br><br><br>');
        assert.strictEqual(ht.forLoop(-2,2,(i)=>{return ht.br();}),'<br><br><br><br><br>');
        assert.strictEqual(ht.forLoop(-9,-4,(i)=>{return i;}),'-9-8-7-6-5-4');
        assert.strictEqual(ht.forLoop(4.25,8.44,(i)=>{return i+' ';}),'4.25 5.25 6.25 7.25 8.25 ');
    });

    it('Should break the loop if the html function returns false', function() {
        assert.strictEqual(
            ht.forLoop(
                4.25,
                8.44,
                (i)=>{
                    if (i>6) return false;
                    return i+' ';
                }
            ),'4.25 5.25 '
        );
    });

});
