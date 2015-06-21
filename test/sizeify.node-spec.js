#!/user/local/bin/node

var sizeify = require("../sizeify.node.js");

/*
describe("illegal arguments", function () {

	it("should error out if called with zero args", function () {
		expect(sizeify).toThrow("Wrong number of arguments");
	});
	it("should error out if called with 1 arg", function () {
		expect(sizeify.bind(null,1)).toThrow("Wrong number of arguments");
	});
	it("should error out if called with 4 args", function () {
		expect(sizeify.bind(null,1,2,3,4)).toThrow("Wrong number of arguments");
	});
	it("should error out with Integers as arguments", function () {
		expect(sizeify.bind(null,1,2)).toThrow("not all arguments are strings");
	});
	it("should error out with Booleans as arguments", function () {
		expect(sizeify.bind(null,true,false)).toThrow("not all arguments are strings");
	});
	it("should error out with NULLs as arguments", function () {
		expect(sizeify.bind(null,null,null)).toThrow("not all arguments are strings");
	});
	it('should error out given invalid URLs',function(){
		expect(sizeify.bind(null,'asdf','asdf')).toThrow('bad parameter values');
	});

});
*/

describe("malformed URLs",function(){

	//console.log(sizeify(good_endpoints[0],good_images[0],good_codes[0]));

	it('should return a valid URL given 3 valid inputs',function(){
		var good_endpoints = [
			'http://sizeifyb.sjc.io'
		];
		var good_images = [
			'http://www.linux.org/images/linux.org.png'
		];
		var good_codes = [
			'p350'
		];		
		expect( sizeify(good_endpoints[0],good_images[0],good_codes[0]) ).toMatch(/p350/g);
	});

});