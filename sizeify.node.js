var document = require('create-element-basic');
var window = module.exports;

;(function(window,document,undefined){
	"use strict";
	var SIZEIFY_ENDPOINT = 'http://sizeifyb.sjc.io';
	/**
	 * @description - creates a global function called sizeify
	 * @argument - string - url - the URL of the source image
	 * @argument - string - resizeto - the special code that indicates desired image dimensions
	 * @returns - string - a url pointing to the resized image, or an error if one of the arguments was malformed
	 **/
	var urlIsSane = function(url){
		var reg = /^http[s]?:\/\/[\w\-_\.]+\/.*/;
		var r = reg.test(url);
		return r;
	};
	var resizetoIsSane = function(resizeto){
		var reg = /^[whlspbgc]\d{1,4}|\d{1,4}x\d{1,4}$/;
		var r = reg.test(resizeto);
		return r;
	};
	var main = function(url,resizeto){
		var parser, r;
		if (urlIsSane(url) && resizetoIsSane(resizeto)) {
			parser = document.createElement('a');
			parser.href = url;
			r = SIZEIFY_ENDPOINT
				+ '/'
				+ parser.protocol.replace(':','')
				+ '/'
				+ parser.hostname.split('.').reverse().join('.')
				+ '/'
				+ resizeto
				+ '/'
				+ encodeURIComponent( parser.pathname.replace(/^\//,'') + parser.search );
			return r;
		} else {
			throw new Error('Insane arguments');
		}
	};
	main.endpoint = function(newendpoint){
		if ( typeof newendpoint === "undefined" ) {
			return SIZEIFY_ENDPOINT;
		} else {
			SIZEIFY_ENDPOINT = newendpoint;
			return this;
		}
	};
})(window,document);
