#!/usr/bin/env node
"use strict";
var sizeify = require('./sizeify.js'),
	byline = require('byline'),
	nomnom = require('nomnom'),
	introspect = require('./package.json'),
	opts;

if (process.stdin.isTTY) {
	opts = nomnom.option('endpoint', {
      abbr: 'e',
      flag: false,
      default: sizeify.endpoint,
      help: 'The sizeify endpoint (defaults to '+sizeify.endpoint+')'
   })
   .option('imageurl', {
      abbr: 'i',
      help: 'JSON file with tests to run'
   })
   .option('version', {
   	  abbr: 'v',
      flag: true,
      help: 'print version and exit',
      callback: function() {
         return "version " + introspect.version;
      }
   })
   .parse();
   console.log(opts);
} else {
	process.stdin.setEncoding('utf8');
	var stream = byline.createStream(process.stdin);
	stream.on('readable', function() {
		var inline, outline, outchannel;
		while (null !== (inline = stream.read())) {
			try {
				outline = sizeify(inline,'p555');
				outchannel = process.stdout;
			} catch(e) {
				outline = "Sizeify Client " + e.toString();
				outchannel = process.stderr;
			}
			outchannel.write(outline + "\n");
		}
	});
	process.stdin.on('end', function() {
		//	end of input. do some tear-down
	});
}
