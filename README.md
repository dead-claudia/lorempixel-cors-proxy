# lorempixel CORS Proxy

This provides a simple proxy for [lorempixel](http://lorempixel.com). It's very specific on the size it returns to save bandwidth and memory.

It's written to deal with a very specific demo I created for the Mithril docs, to avoid CORS errors while embedding a lorempixel call into a [flems](https://flems.io). It's not very general, and at the time of writing only supports literally `http://lorempixel.com/300/300` and nothing else.

I started out using [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/), but rapidly hit the rate limit as lorempixel is made to not cache its results and that service enforces a cap of 200 requests per hour per origin, obviously not useful for my purposes. I still enforce a moderately strict limit tied to IP, but not so sharp as to not work within my constraints. I also reject anything not originating from `https://*.flems.io`, to strongly dissuade general use.

If you want a general-purpose proxy, you can (and should) look elsewhere.

### License

It's under the [Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0). See LICENSE.md for a copy of this license.
