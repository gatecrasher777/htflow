'use strict'

const ht = require('../htflow.js')();
const assert = require('assert');

describe('Test readme example - build a web page', function(){

    const myWebPage = ht.doc(
        ht.html(
            ht.head(
                ht.meta(
                    {
                        charset:'utf8'
                    }
                ),
                ht.link(
                    {
                        rel:'stylesheet',
                        href: './css/wapp.css'
                    }
                ),
                ht.script(
                    {
                        src: './js/wapp.js'
                    }
                ),
                ht.title(
                    'Hello'
                )
            ),
            ht.body(
                {
                    onload: ht.cmd('wapp.start',0),
                    style: ht.css(
                        {
                            margin : '0px',
                            width: '100%',
                            height: '100%'
                        }
                    )
                },
                ht.main(
                    {
                        id: 'main'
                    },
                    ht.div(
                        {
                            id: 'hellodiv'
                        },
                        ht.p(
                            'hello world'
                        ),
                        ht.button(
                            {
                                onclick: ht.cmd('wapp.magic'),
                                title: 'click on me for some magic'
                            },
                            ht.img(
                                {
                                    src: './img/smileyface.jpg',
                                    height: 24,
                                    width: 24               
                                }
                            )
                        )
                    )
                )
            )
        )
    );
    
    it('Should work as expected', function(){
        assert.strictEqual(myWebPage,'<!DOCTYPE html>'+
            '<html>'+
                '<head>'+
                    '<meta charset="utf8" >'+
                    '<link rel="stylesheet" href="./css/wapp.css" >'+
                    '<script src="./js/wapp.js"></script>'+
                    '<title>Hello</title>'+
                '</head>'+
                '<body onload="wapp.start(0);" style="margin:0px;width:100%;height:100%;">'+
                    '<main id="main">'+
                        '<div id="hellodiv">'+
                            '<p>hello world</p>'+
                            '<button onclick="wapp.magic();" title="click on me for some magic">'+
                                '<img src="./img/smileyface.jpg" height="24" width="24" >'+
                            '</button>'+
                        '</div>'+
                    '</main>'+
                '</body>'+
            '</html>'
        );
    });

});
