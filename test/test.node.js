var sizeify = require('../js/sizeify.js'),
	colors = require('colors'),
	groups = require('./groups.json');

function processGroup(group){
	var r;
	if ('endpoint' in group) {
		r = sizeify(group.endpoint,group.source,group.resizeto);
	} else {
		r = sizeify(group.source,group.resizeto);	
	}
	return r;
};

groups.forEach(function(group,i){
	try {
		var p = processGroup(group);
		console.log(i+1 + '.	' + p.green);
	} catch(e) {
		//throw new Error(e);
		console.error(i+1 + '.	' + e.toString().red);
	}
});