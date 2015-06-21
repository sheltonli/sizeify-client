"use strict";

var anchor = {};
Object.defineProperty(anchor,'href',{
	"set": function(name){
		this.narf = 'barf';
		this.hrefx = name;
	}
});

var document = {
	createElement: function(tagname){
		var el;
		switch (tagname) {
			case 'a':
			el = anchor;
			break;
		}
		return el;
	}
};

var a = document.createElement('a');

console.log(a);

a.href = 'knife';

console.log(a);