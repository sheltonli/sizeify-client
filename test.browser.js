;(function(window,undefined){
	"use strict";
	var uniqueId = function(){
		var prefix = 'U';
		var rand = Math.random().toString(16).replace(/\W/g,'').toUpperCase();
		var now = window.performance.now().toString(16).replace(/\W/g,'').toUpperCase();
		return [prefix,now,rand].join('');
	};
	var groups = [
		{
			"source": "http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg",
			"resizeto": "w400",
			"expect": "an image of chuck norris 400px wide"
		},
		{
			"source": "http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg",
			"resizeto": "h400",
			"expect": "an image of chuck norris 400px in height"
		},
		{
			"source": "http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg",
			"resizeto": "p200",
			"expect": "a square image of chuck norris, 200px, padded with white"
		},
		{
			"source": "http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg",
			"resizeto": "w10001",
			"expect": "an error, because resizeto is too large"
		},
		{
			"source": "http://www.zerohedge.com/sites/default/files/images/user5/imageroot/2015/05/obama%20buffett%20medal_0.jpg",
			"resizeto": "w450",
			"expect": "an image of Buffet and Obama, width 450"
		},
		{
			"source": "http://www.zerohedge.com/sites/default/files/images/user5/imageroot/2015/05/obama%20buffett%20medal_0.jpg",
			"resizeto": "c450",
			"expect": "an image of Buffet and Obama, cropped"
		},
		{
			"source": "http://www.zerohedge.com/sites/default/files/images/user5/imageroot/2015/05/obama%20buffett%20medal_0.jpg",
			"resizeto": "b450",
			"expect": "an image of Buffet and Obama, padded black"
		},
		{
			"source": "http://img1.wikia.nocookie.net/__cb20120811205503/adventuretimewithfinnandjake/images/f/fc/S4_E18_Finn_weird.PNG",
			"resizeto": "w333",
			"expect": "a PNG, width 333"
		},
		{
			"source": "http://img1.wikia.nocookie.net/__cb20120811205503/adventuretimewithfinnandjake/images/f/fc/S4_E18_Finn_weird.PNG",
			"resizeto": "w555",
			"expect": "a PNG, width 555"
		},
		{
			"source": "http://img1.wikia.nocookie.net/__cb20120811205503/adventuretimewithfinnandjake/images/f/fc/S4_E18_Finn_weird.PNG",
			"resizeto": "w1111",
			"expect": "a PNG, width 1111"
		},
		{
			"endpoint": "http://sizeifyb.sjc.io",
			"source": "http://upload.wikimedia.org/wikipedia/commons/6/66/Alpha-P4S4_3D_spacefill.png",
			"resizeto": "w700",
			"expect": "an PNG with alpha"
		},		
		{
			"endpoint": "http://sizeifyb-snow.sjc.io",
			"source": "http://upload.wikimedia.org/wikipedia/commons/6/66/Alpha-P4S4_3D_spacefill.png",
			"resizeto": "p350",
			"expect": "an PNG with alpha, but rendered with white BG"
		},
		{
			"source": "http://sizeify.passthru.b.sjc.io/http/net.nocookie.wikia.img1/w777/__cb20120811205503%2Fadventuretimewithfinnandjake%2Fimages%2Ff%2Ffc%2FS4_E18_Finn_weird.PNG",
			"resizeto": "w1111",
			"expect": "an error, because you cannot sizeify a sizeify URL"
		},
		{
			"source": "http://www.swmania.com/data/MetaMirrorCache/xen.001phone.cn_UploadFiles_Files_6_8_985_324_000000.jpg.pagespeed.ic.L8X_cKFQpE%E2%80%8B.webp",
			"resizeto": "w300",
			"expect": "a WEBP file, width 300 (not supported so error)"
		},
		{
			"source": "http://iet.jrc.ec.europa.eu/energyefficiency/sites/energyefficiency/files/images/organisation/part_logo_superu.gif",
			"resizeto": "w300",
			"expect": "a Super U gif, width 300"
		},
		{
			"source": "http://iet.jrc.ec.europa.eu/energyefficiency/sites/energyefficiency/files/images/organisation/part_logo_superu.gif",
			"resizeto": "g300",
			"expect": "a Super U gif, gray padded 300"
		},
		{
			"source": "http://iet.jrc.ec.europa.eu/energyefficiency/sites/energyefficiency/files/images/organisation/part_logo_superu.gif",
			"resizeto": "c300",
			"expect": "a Super U gif, cropped at 300"
		}
	];
	var getImageProps = function(ev){
		var r = {
			ts: ev.timestamp,
			width: this.width,
			height: this.height,
			src: this.src
		};
		this.parentNode.querySelector('.imgprops').innerHTML = JSON.stringify(r,null,"  ");
	};
	var container = document.body;
	document.title = 'testing sizeify';
	document.getElementsByTagName('h1')[0].innerHTML = document.title;
	groups.forEach(function(group,i){
		var div = document.querySelector('#template').cloneNode(true);
		if ('endpoint' in group) {
			group.surl = sizeify(group.endpoint,group.source,group.resizeto);
		} else {
			group.surl = sizeify(group.source,group.resizeto);	
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
})(window);