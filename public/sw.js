const cacheName = "v1";
// let cachedFiles = ["app.html", "/css/app.css", "/app.js"];

//call install event
self.addEventListener("install", (e) => {
  console.log("installed");
  //   e.waitUntil(
  //     caches
  //       .open(cacheName)
  //       .then((cache) => {
  //         console.log("caching files");
  //         cache.addAll(cachedFiles);
  //       })
  //       .then(() => self.skipWaiting())
  //   );
});
//call activate event
self.addEventListener("activate", (e) => {
  console.log("activated");

  //remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//call fetch event
self.addEventListener("fetch", (e) => {
  console.log("fetching cache");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //clone response
        const siteClone = res.clone();
        //open cache
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, siteClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
