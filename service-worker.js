const CACHE_NAME = "planpal-cache-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "icon.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("🗂 Caching app shell");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log("🧹 Clearing old cache");
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
