'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('test whileDo method',function() {

    var alpha = 6;
    var beta = 1;
    var myCond = () => { 
        if (alpha>beta) return true;
        return false;
    };


    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.whileDo(),'');
        assert.strictEqual(ht.whileDo(undefined),'');
        assert.strictEqual(ht.whileDo(undefined,undefined),'');
        assert.strictEqual(ht.whileDo(undefined,undefined,undefined),'');
        assert.strictEqual(ht.whileDo(null),'');
        assert.strictEqual(ht.whileDo(null,null),'');
        assert.strictEqual(ht.whileDo(null,null,null),'');
        assert.strictEqual(ht.whileDo([]),'');
        assert.strictEqual(ht.whileDo([],[]),'');
        assert.strictEqual(ht.whileDo([],[],[]),'');
        assert.strictEqual(ht.whileDo({}),'');
        assert.strictEqual(ht.whileDo({},{}),'');
        assert.strictEqual(ht.whileDo({},{},{}),'');
    });

    it('Should execute a function(or return a string value) only while condition is true', function(){
        alpha = 6;
        assert.strictEqual(ht.whileDo(myCond,(cond)=>{alpha--;return '*';}),'*****');
        alpha = 6;
        assert.strictEqual(ht.whileDo(myCond,(cond)=>{alpha--;return alpha+beta;}),'65432');
        alpha = 6;
        assert.strictEqual(
            ht.whileDo(
                () => { return (alpha>beta); },
                (cond) => {
                    alpha--;
                    return alpha;
                }
            ),
            '54321'
        );
    });

    it('Should not execute at all if initial condition is false', function() {
        alpha = 1;
        assert.strictEqual(ht.whileDo(myCond,(cond)=>{alpha--;return '*';}),'');
    });

});
