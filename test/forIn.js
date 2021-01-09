'use strict'

var ht = require('../htflow.js')();
const { strict, strictEqual } = require('assert');
var assert = require('assert');

describe('Test forIn method', function(){

    var a = {
        'a': 'a',
        'b': 'b',
        'y': 'c',
        'z': 'd'
    };

    var b = {
        'x': 'foo',
        'y': 3,
        'z': 9
    };

    it('Should return an empty string with empty, undefined or invalid inputs ', function(){
        assert.strictEqual(ht.forIn(),'');
        assert.strictEqual(ht.forIn(undefined),'');
        assert.strictEqual(ht.forIn(undefined,undefined),'');
        assert.strictEqual(ht.forIn(undefined,undefined,undefined),'');
        assert.strictEqual(ht.forIn(null),'');
        assert.strictEqual(ht.forIn(null,null),'');
        assert.strictEqual(ht.forIn(null,null,null),'');
        assert.strictEqual(ht.forIn([]),'');
        assert.strictEqual(ht.forIn([],[]),'');
        assert.strictEqual(ht.forIn([],[],[]),'');
        assert.strictEqual(ht.forIn({}),'');
        assert.strictEqual(ht.forIn({},{}),'');
        assert.strictEqual(ht.forIn({},{},{}),'');
    });

    it('Should execute html for each enummerable key/value pair of an object', function() {
        assert.strictEqual(ht.forIn(a,(k,v)=>{return v;}),'abcd');
        assert.strictEqual(ht.forIn(b,(k,v)=>{return k+v;}),'xfooy3z9');
        assert,strictEqual(
            ht.forIn(
                {
                    a: 1,
                    b: 4,
                    c: 'r',
                    d: ()=>{return 'g'},
                    e: [3,[6,9,'z']],
                    f: Infinity,
                    g: NaN
                },
                (k,v) => {
                    return ht.div(v);
                }
            ),
            '<div>1</div><div>4</div><div>r</div><div>g</div><div>369z</div><div>Infinity</div><div>NaN</div>'
        );
    });

    var c =  ['a','b','c','d'];
    var d =  ['y',3,'z',9];

    it('Should work on arrays too.', function() {
        assert.strictEqual(ht.forIn(c,(k,v)=>{return v}),'abcd');
        assert.strictEqual(ht.forIn(d,(k,v)=>{return k+v}),'0y132z39');
        assert,strictEqual(
            ht.forIn(
                [1,4,'r',()=>{return 'g'},[3,[6,9,'z']],Infinity,NaN],
                (k,v) => {
                    return ht.div(k+'-'+v);
                }
            ),
            '<div>0-1</div><div>1-4</div><div>2-r</div><div>3-()=>{return \'g\'}</div><div>4-3,6,9,z</div><div>5-Infinity</div><div>6-NaN</div>'
        );
        //N.B the function and array in the array parameter are not evaluated further - this is expected behaviour.  
    });

});
