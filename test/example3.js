'use strict'

var ht = require('../htflow.js')();
var assert = require('assert');

describe('Test readme example - build a dropdown control', function(){

    let wapp = {
        display: 15
    };
    
    let mySelect = ht.div(
        {
            id:'control1'
        },
        ht.label(
            {
                'for':'display'
            },
            'Display:'
        ),
        ht.select(
            { 
                id: 'display',
                onchange: ht.cmd('wapp.displayChanged'),
                title: 'Specify the maximum number of foobats to display'
            },
            ht.forEach(
                [3,6,9,12,15,18,24,30],
                (e,i,a) => {
                    let attrib = {
                        value: e
                    };
                    if (e == wapp.display) attrib.selected = 'selected';
                    return ht.option(
                        attrib,
                        ht.concat(
                            e,
                            ' foobats'
                        )
                    )
                }
            )
        )
    );
    
    it('Should work as expected', function(){
        assert.strictEqual(mySelect,            
            '<div id="control1">'+
                '<label for="display">Display:</label>'+
                '<select id="display" onchange="wapp.displayChanged();" title="Specify the maximum number of foobats to display">'+
                    '<option value="3">3 foobats</option>'+
                    '<option value="6">6 foobats</option>'+
                    '<option value="9">9 foobats</option>'+
                    '<option value="12">12 foobats</option>'+
                    '<option value="15" selected="selected">15 foobats</option>'+
                    '<option value="18">18 foobats</option>'+
                    '<option value="24">24 foobats</option>'+
                    '<option value="30">30 foobats</option>'+
                '</select>'+
            '</div>'
        );
    });

});
