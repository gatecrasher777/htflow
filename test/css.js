'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test css helper function', function(){

    var myStyle = {
        'max-height': '200px',
        position: 'absolute'
    }
    
    it('Should return an empty single tag if input is empty, undefined, invalid or a function', function() {
        assert.strictEqual(ht.img({style:ht.css()}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css(undefined)}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css(null)}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css([])}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css({})}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css('howdy-doody')}),'<img style />');
        assert.strictEqual(ht.img({style:ht.css(()=>{return myStyle})}),'<img style />');
    });

    it('Should interpret key/value pairs of an object parameter as style properties/values', function() {
        assert.strictEqual(ht.img({style:ht.css({border:'1px solid red'})}),'<img style="border:1px solid red;" />')
        assert.strictEqual(ht.img({style:ht.css(myStyle)}),'<img style="max-height:200px;position:absolute;" />');
       
        assert.strictEqual(ht.img({style:ht.css({a:1,b:'2',c:3,d:'4'})}),'<img style="a:1;b:2;c:3;d:4;" />');
    });

});
