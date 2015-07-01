try:
	from urllib.parse import urlparse
	from urllib.parse import quote
	from urllib.request import pathname2url
except ImportError:
	from urllib import urlparse
	from urllib import quote
	from urllib import pathname2url
import re

endpoint = 'http://sizeifyb.sjc.io'

def badURL():
	return endpoint + '/error?code=400' 

def urlIsValid(u):
	e = urlparse(endpoint)
	isParadoxical = (e.netloc == u.netloc)
	isWellFormed = (u.scheme is not None and u.netloc is not None and u.path is not None)
	return (isWellFormed and not isParadoxical)

def resizeStringIsValid(resizeto):
	pat = re.compile("^([whslpbgc]\\d{1,4}|\\d{1,4}x\\d{1,4}|original|big)$")
	return ( pat.match(resizeto) is not None )

def url(sourceurl,resizeto):
	u = urlparse(sourceurl)
	safe_path = pathname2url(u.path.lstrip('/'));
	if not urlIsValid(u) or not resizeStringIsValid(resizeto):
		return badURL()
	else:
		reversehost = ".".join(reversed(u.netloc.split('.')))
		encodedpath = quote(safe_path,"")
		s = [ endpoint, u.scheme, reversehost, resizeto, encodedpath ]
		return "/".join(s)
