/* All single tag methods use the same souce code and are identical in every respect apart from their function name */
/* A meta tag is used for these double tag tests */

'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test a single tagged html element method', function() {
    
    var s = 'text variable'
    var f = function() {
        return 'text function';
    }

    var attrib = {
        keywords: 'html, create, flow',
        charset: 'utf8'
    }

    it('Should return an empty single tag if input is empty, undefined or invalid', function() {
        assert.strictEqual(ht.meta(),'<meta>');
        assert.strictEqual(ht.meta(undefined),'<meta>');
        assert.strictEqual(ht.meta(undefined,undefined),'<meta>');
        assert.strictEqual(ht.meta(undefined,undefined,undefined),'<meta>');
        assert.strictEqual(ht.meta(null),'<meta>');
        assert.strictEqual(ht.meta(null,null),'<meta>');
        assert.strictEqual(ht.meta(null,null,null),'<meta>');
        assert.strictEqual(ht.meta([]),'<meta>');
        assert.strictEqual(ht.meta([],[]),'<meta>');
        assert.strictEqual(ht.meta([],[],[]),'<meta>');
        assert.strictEqual(ht.meta({}),'<meta>');
        assert.strictEqual(ht.meta({},{}),'<meta>');
        assert.strictEqual(ht.meta({},{},{}),'<meta>');
    });

    it('Should ignore string/function input and return an empty single tag', function() {
        assert.strictEqual(ht.meta('direct text'),'<meta>');
        assert.strictEqual(ht.meta(s),'<meta>');
        assert.strictEqual(ht.meta(f),'<meta>');
    });

    it('Should ignore multiple string/function parameters and return an empty single tag', function() {
        assert.strictEqual(ht.meta('direct text',' for you to enjoy'),'<meta>');
        assert.strictEqual(ht.meta('A ',s,ht.br(),'and a ',f),'<meta>');
    });

    it('Should interpret key/value pairs of an initial object parameter as element atrributes/properties', function() {
        assert.strictEqual(ht.meta(attrib),'<meta keywords="html, create, flow" charset="utf8" />');
        assert.strictEqual(ht.meta(attrib,f),'<meta keywords="html, create, flow" charset="utf8" />');
        assert.strictEqual(ht.meta(attrib,attrib),'<meta keywords="html, create, flow" charset="utf8" />');
    });

    it('Should ignore the attribute object if it is not the first parameter', function() {
        assert.strictEqual(ht.meta('direct text',' for you to enjoy',attrib),'<meta>');
        assert.strictEqual(ht.meta('A ',s,ht.br(),attrib,'and a ',f),'<meta>');
    });

});
