'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test the concat helper function',function(){

    let garbage;
    let obj = {id:'obj'};

    it('Should handle all input appropriately and gracefully, consistent with doubleTag', function(){
        assert.strictEqual(ht.concat(),'');
        assert.strictEqual(ht.concat('a string'),'a string');
        assert.strictEqual(ht.concat('string 1','string 2'),'string 1string 2');
        assert.strictEqual(ht.concat('string 1',()=>{return ' and '},'string 2'),'string 1 and string 2');
        assert.strictEqual(ht.concat(garbage),'');
        assert.strictEqual(ht.concat(obj),'');
        assert.strictEqual(ht.concat(undefined),'');
        assert.strictEqual(ht.concat(undefined,undefined),'');
        assert.strictEqual(ht.concat(undefined,undefined,undefined),'');
        assert.strictEqual(ht.concat(null),'');
        assert.strictEqual(ht.concat(null,null),'');
        assert.strictEqual(ht.concat(null,null,null),'');
        assert.strictEqual(ht.concat(NaN,Infinity,(3==6),(9==9)),'NaNInfinityfalsetrue');
        assert.strictEqual(ht.concat({an:'object'},['an','array']),'anarray');
        assert.strictEqual(ht.concat('A',['B','C'],'D',['E','F',['G','H',['I','J']]]),'ABCDEFGHIJ');
    });

});
