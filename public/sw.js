const cacheName = "v1";

//call install event
self.addEventListener("install", (e) => {
  console.log("installed");
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
