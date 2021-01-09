# htflow

Add structured html5 codeflow into your javascript/nodejs projects.

## Features

* All standard html5 tags as class methods.
* Flexible html input; string, function, array of strings or functions, multiple arguments.
* Inbuilt method loops, conditionals and switches so your html and programming logic can reside together.
* Provides several helper methods.
* Fast, lightweight, no dependencies.

## Usage
#### In client-side javascript:
```javascript
var ht = htflowInit();
```
#### In nodejs:
```javascript
var htflow = require('htflow');
var ht = htflow();
```
or more simply:
```javascript
var ht = require('htflow')();
```
## Examples
#### Build a wepage:
```javascript
var myWebPage = ht.doc(
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

```
#### Build a table:
```javascript
var myTable = ht.table(
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
						i
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

```
#### Build a dropdown control:
```javascript
var mySelect = ht.div(
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
			[3,6,9,12,15,18,21,24,30,45,60,90,120,150,180,240,300,600,900],
			(e,i,a) => {
				var a = {
					value: e
				};
				if (e == wapp.display) a.selected = 'selected';
				return ht.option(
					a,
					ht.concat(
						e,
						' foobats'
					)
				)
			}
		)
	)
);
```
## Methods
All methods return strings representing HTML5.  

#### html tag
There are methods for all HTML5 standard tags:
```javascript
ht.tag([attr][,html][,html[[,...]);     //for double tags, i.e. html, div, span, p, a, etc.
ht.tag([attr]);                         //for single tags, i.e. meta, img, br, etc
```
Replace '__tag__' with the actual html5 element tag.  
__attr__ is an object with key value pairs matching element attributes/properties.   
__html__ is either a string, a function ()=>{...}, or an array of strings and/or functions returning strings, the string values of which are sequentially appended. 
#### doubleReg
```javascript
ht.doubleReg(tag);
```
Registers a method for a custom html element __tag__ with double tags (opening/closing pair).  
After registering `doubleReg('mycustomtag');` you can then use `ht.mycustomtag([attr][,html][,...]);` in your code.

#### singleReg
```javascript
ht.singleReg(tag);
```
Registers a function for a custom html element __tag__ with single tag.  
After registering `singleReg('myothercustomtag');` you can then use `ht.myothercustomtag([attr]);` in your code.
#### doc
```javascript
ht.doc([html]);
```
Generates html5 initial document type string with optional __html__ content.
### methods as control structures
#### doWhile
```javascript
doWhile(test, (cond) => {...});
```
__test__ is a function returning true or false.  
__cond__ is the boolean result of the last test.  
`(cond) => {...}` will be executed while the boolean result of __test()__ is true.  
 in order to exit the loop `(cond) => {...}` must manipulate in-scope variables so that a subsequent __test()__ returns false.
#### forLoop
```javascript
ht.forLoop(start, end, (i) => {...} );
```
Loop __i__ incrementally from __start__ to __end__ (step +1).  
If start is less than end, step is -1.  
The numbers __start__ and __end__ are inclusive.  
Let `(i) => {...}` return __false__ to break prematurely from the loop. 
#### forEach
```javascript
ht.forEach(vals, (e,i,a) => {...});
```
Given an array of values __vals__, html is processed sequentially for each array value with e = element, i = index, a = array.
#### forIn
```javascript
ht.forIn(obj, (k) => {...});
```
Given an object __obj__, html is processed sequentially for each of its enumerable properties with k = key.  
To then access the property value in your function use __obj[k]__.
#### ifElse
```javascript
ht.ifElse(cond, htmlIf[, htmlElse]);
```
If __cond__ (boolean), returns __htmlIf__ or else returns __htmlElse__ (optional.)
#### switchCase
```javascript
ht.switchCase(val,opts,html[,htmlDefault]);
```
Given a value __val__, and an array of possible matches __opts__ then __html__ is the corresponding array of possible html outputs.  
If there is no match for __val__, __htmlDefault__ is the default output.  
If __html[n]__ is given as '||', then __opt[n]__ is a fall through case. For example:
```javascript
ht.switchCase(
  val,
  [1,2,3,4,5],
  ['||','||',()=>{ return 'X'+foo(val); },'||','Y'],
  'Z'
);
```
is an emulation of:
```javascript
switch (val) {
  case 1:
  case 2:
  case 3: return 'X' + foo(val);
  case 4:
  case 5: return 'Y';
  default: return 'Z';
}
```
#### whileDo
```javascript
whileDo(test, (cond) => {...});
```
__test__ is a function returning true or false.  
__cond__ is the boolean result of the last test.   
`(cond) => {...}` will be executed at least once then repeated while __test()__ is true. (N.B. The initial value of __cond__ is undefined.)  
In order to exit the loop `(cond) => {...}` must manipulate in-scope variables so that a subsequent __test()__ returns false.
### helper methods
#### concat
```javascript
ht.concat(html[,html][,...]);
```
Add html content together (aesthetic alternative to using +'s)
#### cmd
```javascript
ht.cmd(func[,param][,param][,...]);
```
Helps construct an embedded js event command in html.    
__func__ is a string of the target js method name.  
__param__ are optional parameters to pass to the method.  
For example, clicking on an element with
```javascript
{
  onclick: ht.cmd('validate',str,num);
} 
```
triggers  

```javascript
function validate(str,num) {
  ...
} 
```
#### evt
```javascript
ht.evt(func,[param,][param,][...]));
```
Operates just like ht.cmd except an 'event' variable is assumed as the first parameter: For example a key down event
```javascript
{
  onkeydown: ht.evt('test',val1,val2);
}
```
triggers
```javascript
function test(event,val1,val2) {
  if (event.code == 'Enter') {...}
}
```
#### css
```javascript
ht.css(prop);
```
Helps include style properties within your html. (Rather use css stylesheets for non-dynamic styling.)   
__prop__ is an enumerable object whose key value pairs represent the css properties and values you wish to set or change.

## Install

```bash
npm install htflow
```
## tests
Tests are written in __Mocha__
```bash
npm test
```
