;(function(win,dom,undefined){
	"use strict";
	var uniqueId = function(){
		var prefix = 'U';
		var rand = Math.random().toString(16).replace(/\W/g,'').toUpperCase();
		var now = window.performance.now().toString(16).replace(/\W/g,'').toUpperCase();
		return [prefix,now,rand].join('');
	};
	var getImageProps = function(ev){
		var r = {
			ts: ev.timestamp,
			width: this.width,
			height: this.height,
			src: this.src
		};
		this.parentNode.querySelector('.imgprops').innerHTML = JSON.stringify(r,null,"  ");
	};
	var getJSON = function(url){
		return new Promise(function(resolve,reject){
			var req = new XMLHttpRequest();
			req.addEventListener('load',resolve);
			req.addEventListener('error',reject);
			req.addEventListener('abort',reject);
			req.open('GET', url, true);
			req.send();
		});
	};
	var barf = function(a,b,c){
		console.error(a,b,c,this);
	};
	var injectRows = function(xhr){
		var groups = JSON.parse(xhr.target.response);
		var container = dom.body;
		dom.title = 'testing sizeify';
		dom.getElementsByTagName('h1')[0].innerHTML = dom.title;
		groups.forEach(function(group,i){
			var div = dom.querySelector('#template').cloneNode(true);
			try {
				if ('endpoint' in group) {
					group.surl = sizeify(group.endpoint,group.source,group.resizeto);
				} else {
					group.surl = sizeify(group.source,group.resizeto);	
				}
			} catch(e) {
				group.surl = sizeify.errorUrl;
			}
			group.id = uniqueId();
			group.n = i+1;
			div.removeAttribute('hidden');
			div.setAttribute('id',group.id);
			div.getElementsByTagName('h2')[0].innerHTML = group.expect;
			div.getElementsByClassName('json')[0].innerHTML = JSON.stringify(group,null,"  ");
			div.getElementsByTagName('img')[0].addEventListener('load',getImageProps);
			div.getElementsByTagName('img')[0].setAttribute('src',group.surl);
			container.appendChild(div);
		});
	};
	getJSON('groups.json').then(injectRows,barf).catch(barf);
})(window,document);