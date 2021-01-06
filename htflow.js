// html5 hypertext flow class
// (c) 2021 gatecrasher777


'use strict'

class htflowClass {

	constructor() {
		var dtags = 'html,head,style,title,body,address,article,aside,footer,h1,h2,h3,h4,h5,h6,header,hgroup,nav,section,blockquote,dd,div,dl,dt,figcaption,figure,li,main,ol,p,pre,ul,a,abbr,b,bdi,bdo,cite,code,data,time,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,area,audio,map,video,object,canvas,noscript,script,del,ins,caption,colgroup,table,tbody,td,tfoot,th,thead,tr,button,datalist,fieldset,form,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,slot,template,iframe,picture,big'.split(',');
		var stags = 'base,link,meta,hr,br,wbr,img,track,embed,param,source,col,input'.split(',');
		dtags.forEach( (t) => { 
			this.doubleReg(t);
		});
		stags.forEach( (t) => {
			this.singleReg(t);
		});
	}
	
	/* internal methods */

	item(html,a,b,c) {
		var h = '';
		if (html === undefined) html = [];
		if (!Array.isArray(html)) html = [html];
		html.forEach((e)=>{
			if (Array.isArray(e)) {
				h+=this.item(e,a,b,c);
			} else if (typeof e === "function") {
				var s = e(a,b,c);
				if (s === false) {
					return false;
				} else {
					h+=s;
				}
			} else {
				h+=e;
			}
		});
		return h;
	}
	
	attrStr(attr) {
		var a = '';
		Object.keys(attr).forEach( (k) => {
			a += ' '+k;
			if (attr[k] !='') a += '="'+attr[k]+'"';
		});
		return a;
	}

	doubleTag(tag,attr,html) {
		var h = '<'+tag;
		var a = this.attrStr(attr);
		(a.length) ? h += a+'>' : h += '>';
		h += this.item(html,tag);
		h += '</'+tag+'>';
		return h;
	} 
	
	singleTag(tag,attr) {
		var h = '<'+tag;
		var a = this.attrStr(attr);
		(a.length) ? h += a+' />' : h += '>';
		return h;
	}
	
	/* public methods */
	
	doubleReg(tag) {
		this[tag] = function(a) {
			var s=0;
			var attr={};
			if (typeof a === "object") {
				attr = a;
				s = 1;
			}
			var html = Array.prototype.slice.call(arguments,s);
			return this.doubleTag(tag,attr,html);
		}
	}
	
	singleReg(tag) {
		this[tag] = function(a) {
			var attr={};
			if (typeof a === "object") {
				attr = a;
			}
			return this.singleTag(tag,attr);
		}
	}

	doc(html) {
		var h = '';
		if (html!==undefined) h = this.item(html);
		return '<DOCTYPE html>'+h;
	}

	ifElse(cond,htmlIf,htmlElse) {
		if (htmlElse === undefined) htmlElse = '';
		if (!Array.isArray(htmlIf)) htmlIf = [htmlIf];		
		if (cond) return this.item(htmlIf,cond);
		if (!Array.isArray(htmlElse)) htmlElse = [htmlElse];
		return this.item(htmlElse,cond);
	}
	
	forLoop(start,end,html) { 
		var h='';
		html = Array.prototype.slice.call(arguments,2);
		if (start<end) {
			for(var i = start; i<=end; i++) {
				var s = this.item(html,i);
				if (s === false) {
					return h;
				} else {
					h+=s;
				}
			}
		} else {
			for(var i = start; i>=end; i--) {
				var s = this.item(html,i);
				if (s === false) {
					return h;
				} else {
					h+=s;
				}
			}
		}
		return h;
	}
	
	switchCase(val,opts,html,htmlDefault) {
		var usenext = false;
		for (var i = 0; i < opts.length; i++) {
			if( (val == opts[i]) || usenext) {
				if (html[i] == '||') {
					usenext = true;
				} else {
					return this.item(html[i],val)
				}
			}
		}
		if (htmlDefault !== undefined) return item(htmlDefault,val);
		return '';
	}
	
	forEach(vals,html) {
		var h='';
		html = Array.prototype.slice.call(arguments,1);
		if (vals !== undefined) {
			vals.forEach((e,i,a) => {
				h += this.item(html,e,i,a);
			});
		}
		return h;
	}
	
	forIn(obj,html) {
		var h = '';
		html = Array.prototype.slice.call(arguments,1);
		Object.keys(obj).forEach( (k) => {
			h += this.item(html,obj[k]);
		});
		return h;		
	}
	
	whileDo(cond,html) {
		var h = '';
		html = Array.prototype.slice.call(arguments,1);
		while(cond) {
			h += this.item(html,cond);
		}
		return h;
	}

	doWhile(cond,html) {
		var h = '';
		html = Array.prototype.slice.call(arguments,1);
		do {
			h += this.item(html,cond);
		} while(cond);
		return h;
	}
	
	concat(html) {
		html = Array.prototype.slice.call(arguments,0);
		return html.join('');
	}
	
	cmd(func,param) {
		var h = func+'(';
		var v = '';
		var j = ''
		var args = Array.prototype.slice.call(arguments,1);
		args.forEach((e)=>{
			if (typeof e === 'string') {
				v+=j+'\''+e+'\'';
			} else {
				v+=j+e.toString();
			}
			j=',';
		});
		h += v+');';
		return h;
	}

	evt(func,param) {
		var h = func+'(';
		var v = 'event';
		var j = ','
		var args = Array.prototype.slice.call(arguments,1);
		args.forEach((e)=>{
			if (typeof e === 'string') {
				v+=j+'\''+e+'\'';
			} else {
				v+=j+e.toString();
			}
		});
		h += v+');';
		return h;
	}

	css(prop) {
		var a = '';
		Object.keys(prop).forEach( (k) => {
			a += k+':'+prop[k]+';';
		});
		return a;
	}

}

/* interface */
// in client js,  var ht = htflowInit();
// in nodejs, var ht = require('htflow')();

function htflowInit() {
	return new htflowClass;
}

try {
	module.exports = htflowInit;
} catch (e) {}
