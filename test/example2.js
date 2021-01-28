'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test readme example - build a table', function(){

    const myData = [
        {
            fn: 'Joseph',
            sn: 'Bloggs',
            ad: '5 Spring Drive',
            sb: 'Leafyton',
            mn: '077 555 5555'
        },
        {
            fn: 'Mary Eliza',
            sn: 'Smith',
            ad: '1036 High Street',
            sb: 'Weston',
            mn: '098 765 4321'
        },
        {
            fn: 'Billy',
            sn: 'Bunter',
            ad: '60 Old School Road',
            sb: 'Eastville',
            mn: '011 222 3333'
        }
    ]

    const myTable = ht.table(
        {
            id: 'mytable'
        },
        ht.thead(
            ht.tr(
                ht.forEach(
                    ['Rec#','Firstname','Surname','Address','Suburb','Mobile'],
                    (e,i,a) => {
                        return ht.th(e);
                    }
                )
            )
        ),
        ht.tbody(
            ht.forEach(
                myData, //an array of object records
                (e,i,a) => {
                    return ht.tr(
                        ht.td(
                            {
                                align: 'right',
                                onmouseover: ht.evt('wapp.hover')
                            },
                            i+1
                        ),
                        ht.forIn(
                            e,
                            (k) => {
                                return ht.td(
                                    {
                                        align: 'left'
                                    },
                                    e[k]
                                )
                            }
                        )
                    )
                }
            )
        )
    );
    
    it('Should work as expected', function(){
        assert.strictEqual(myTable,            
            '<table id="mytable">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Rec#</th>'+
                        '<th>Firstname</th>'+
                        '<th>Surname</th>'+
                        '<th>Address</th>'+
                        '<th>Suburb</th>'+
                        '<th>Mobile</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                    '<tr>'+
                        '<td align="right" onmouseover="wapp.hover(event);">1</td>'+
                        '<td align="left">Joseph</td>'+
                        '<td align="left">Bloggs</td>'+
                        '<td align="left">5 Spring Drive</td>'+
                        '<td align="left">Leafyton</td>'+
                        '<td align="left">077 555 5555</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td align="right" onmouseover="wapp.hover(event);">2</td>'+
                        '<td align="left">Mary Eliza</td>'+
                        '<td align="left">Smith</td>'+
                        '<td align="left">1036 High Street</td>'+
                        '<td align="left">Weston</td>'+
                        '<td align="left">098 765 4321</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td align="right" onmouseover="wapp.hover(event);">3</td>'+
                        '<td align="left">Billy</td>'+
                        '<td align="left">Bunter</td>'+
                        '<td align="left">60 Old School Road</td>'+
                        '<td align="left">Eastville</td>'+
                        '<td align="left">011 222 3333</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'
        );
    });

});
