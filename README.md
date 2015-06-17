# sizeify-client

Official clients for Sizeify B, an improved image resizing service

## What is Sizeify?

Sizeify is an image resizing service. It takes the URL of an image, and a code representing how it should be resized. It then caches and serves the image effiently from Edge locations.

## How do you use sizeify?

There are two ways to call sizeify:

```javascript
sizeify($endpoint,$imageUrl,$resizeCode)
```

or:

```javascript
sizeify($imageUrl,$resizeCode)
```

where `$endpoint` is something like *http://sizeifyb.sjc.io* and `$imageUrl` is a fully qualified absolute URL like *http://www.linux.org/images/linux_org.png*, and `$resizeCode` is like:

Example  | What it does
------------- | -------------
w200  | resizes the width to 200, preserving aspect ratio
h150  | resizes the height to 200, preserving aspect ratio
50x75	| sizes the width to 50, and height to 75 (destroying aspect ratio)
l500	| resizes the image along it's longest dimension to 500.
s300	| resizes the image along it's shortest dimension to 300.
p110	| creates a square 110x110. White padding is used to maintain aspect ratio
b110	| same, but with black padding
g110	| same, but with gray padding

## What are the various endpoints?

Endpoint | Origin Server | Feature
--------- | ------------ | -------
sizeifyb.sjc.io	| sizeify.origin.b.sjc.io | Default endpoint. medium compression
sizeifyb-lowres.sjc.io	| sizeify.origin.cq.50.b.sjc.io | Low res
sizeifyb-hq.sjc.io	| sizeify.origin.cq.100.b.sjc.io	| High res
sizeifyb-snow.sjc.io	| sizeify.origin.snow.b.sjc.io	| Medium compression. PNGs with trasparency are given a white background.

## Architecture

Depending on the amount of compression you want, you can use one of several endpoints, as described here. The red images represent CDN distributions, and they are the official endpoints. The orange squares describe the origin servers. The fourth enpoint is suitable for testing. It bypasses the CDN altogether and does no caching.

<img src="sizeify.architecture.jpg" alt="sizeify architecture" width="364" />
