'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('test doWhile method',function() {

    let alpha = 6;
    let beta = 1;
    let myCond = () => { 
        if (alpha>beta) return true;
        return false;
    };

    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.doWhile(),'');
        assert.strictEqual(ht.doWhile(undefined),'');
        assert.strictEqual(ht.doWhile(undefined,undefined),'');
        assert.strictEqual(ht.doWhile(undefined,undefined,undefined),'');
        assert.strictEqual(ht.doWhile(null),'');
        assert.strictEqual(ht.doWhile(null,null),'');
        assert.strictEqual(ht.doWhile(null,null,null),'');
        assert.strictEqual(ht.doWhile([]),'');
        assert.strictEqual(ht.doWhile([],[]),'');
        assert.strictEqual(ht.doWhile([],[],[]),'');
        assert.strictEqual(ht.doWhile({}),'');
        assert.strictEqual(ht.doWhile({},{}),'');
        assert.strictEqual(ht.doWhile({},{},{}),'');
    });

    it('Should execute a function(and return a string value) then repeat while a test condition is true', function(){
        alpha = 6;
        assert.strictEqual(ht.doWhile(myCond,(cond)=>{alpha--;return '*';}),'*****');
        alpha = 6;
        assert.strictEqual(ht.doWhile(myCond,(cond)=>{alpha--;return alpha+beta;}),'65432');
        alpha = 6;
        assert.strictEqual(
            ht.doWhile(
                () => { return (alpha>beta); },
                (cond)=>{
                    alpha--;
                    return alpha;
                }
            ),
            '54321'
        );
    });

    it('It Should execute once even if initial condition is false', function() {
        alpha = 1;
        assert.strictEqual(
            ht.doWhile(
                myCond,
                (cond)=>{
                    alpha--;
                    return '*';
                }
            ),
            '*'
        );
    });


});
