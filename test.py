import sizeify

print sizeify.url('http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg','w450')
print sizeify.url('http://iet.jrc.ec.europa.eu/energyefficiency/sites/energyefficiency/files/images/organisation/part_logo_superu.gif','c500')
print sizeify.url('http://sizeifyb-lowres.sjc.io','xxxx')
print ' ** now changing endpoints **'
sizeify.endpoint = 'http://sizeifyb-hq.sjc.io'
print sizeify.url("http://sizeifyb-highres.sjc.io/http/net.nocookie.wikia.img1/w777/__cb20120811205503%2Fadventuretimewithfinnandjake%2Fimages%2Ff%2Ffc%2FS4_E18_Finn_weird.PNG","w300")
print sizeify.url("http://hdwallpapersfit.com/wp-content/uploads/2015/01/cool-chuck-norris-wallpapers-american-actor.jpg","b320")