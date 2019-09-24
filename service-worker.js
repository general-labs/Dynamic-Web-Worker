// Basic Service Worker Implementation
self.addEventListener('fetch', function (event) {
  //console.log("Fetching URLS: ", event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          //console.log("[CACHE_HIT] cache", event.request.url);
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});
