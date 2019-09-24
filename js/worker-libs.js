/**
 * Helper function to cache URLs
 */

 cacheMyURLs = (urls, key) => {
  console.log("Trying to cache using WW: ");
  var cacheName = key || "didarul_cache";
  if ("caches" in self) {
    for (let u = 0; u < urls.length; u++) {
      caches.match(urls[u]).then(function (response) {
        const request = new Request(urls[u], { mode: "no-cors" }); // cross-origin hack
        return response || fetch(request).then(function (r) {
          caches.open(cacheName).then(function (cache) {
            //console.log("CEHCK CACHE", urls[u]);
            cache.put(request, r);
          });
          return r.clone();
        });
      }).catch(function () {
        //return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }
};

/**
 * Benchmark TEST
 */
verySlowFunction = () => {
  let timeTaken;
  var start = Date.now(); // milliseconds
  var x = 0;
  for (var i = 0; i < 4000000000; i++) {
    x = x + i;
  }
  timeTaken = -(start - Date.now()) / 1000;
  return timeTaken;
}
