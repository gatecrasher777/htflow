/* All double tag methods use the same souce code and are identical in every respect apart from their function name */
/* A div tag is used for these double tag tests */

'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test a double tagged html element method', function() {
    
    let s = 'text variable'
    let f = function() {
        return 'text function';
    }

    let attrib = {
        id: 'mydiv',
        'class': 'divs tests'
    }

    it('Should return an empty double tag if input is empty, undefined or invalid', function() {
        assert.strictEqual(ht.div(),'<div></div>');
        assert.strictEqual(ht.div(undefined),'<div></div>');
        assert.strictEqual(ht.div(undefined,undefined),'<div></div>');
        assert.strictEqual(ht.div(undefined,undefined,undefined),'<div></div>');
        assert.strictEqual(ht.div(null),'<div></div>');
        assert.strictEqual(ht.div(null,null),'<div></div>');
        assert.strictEqual(ht.div(null,null,null),'<div></div>');
        assert.strictEqual(ht.div([]),'<div></div>');
        assert.strictEqual(ht.div([],[]),'<div></div>');
        assert.strictEqual(ht.div([],[],[]),'<div></div>');
        assert.strictEqual(ht.div({}),'<div></div>');
        assert.strictEqual(ht.div({},{}),'<div></div>');
        assert.strictEqual(ht.div({},{},{}),'<div></div>');
    });

    it('Should include string/function input within a double tag', function() {
        assert.strictEqual(ht.div('direct text'),'<div>direct text</div>');
        assert.strictEqual(ht.div(s),'<div>text variable</div>');
        assert.strictEqual(ht.div(f),'<div>text function</div>');
    });

    it('Should concatinate multiple string/function parameters within a double tag', function() {
        assert.strictEqual(ht.div('direct text',' for you to enjoy'),'<div>direct text for you to enjoy</div>');
        assert.strictEqual(ht.div('A ',s,ht.br(),'and a ',f),'<div>A text variable<br>and a text function</div>');
    });

    it('Should interpret key/value pairs of an initial object parameter as element atrributes/properties', function() {
        assert.strictEqual(ht.div(attrib),'<div id="mydiv" class="divs tests"></div>');
        assert.strictEqual(ht.div(attrib,f),'<div id="mydiv" class="divs tests">text function</div>');
        assert.strictEqual(ht.div(attrib,attrib),'<div id="mydiv" class="divs tests"></div>');
    });

    it('Should handle numbers and booleans as strings', function() {
        assert.strictEqual(ht.div(369),'<div>369</div>');
        assert.strictEqual(ht.div((3==9)),'<div>false</div>');
        assert.strictEqual(ht.div((9==9)),'<div>true</div>');
    });

    it('Should concatenate arrays of strings/functions/arrays recursively', function() {
        assert.strictEqual(ht.div(['A ',s,ht.br(),'and a ',f]),'<div>A text variable<br>and a text function</div>');
        assert.strictEqual(ht.div(attrib,'A',['B','C'],'D',['E','F',['G','H',['I','J']]]),'<div id="mydiv" class="divs tests">ABCDEFGHIJ</div>');
    });

});
