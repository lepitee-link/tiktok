const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/", // Adjust for GitHub Pages
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "/produk",
];

// Install Event - Cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((error) => {
            console.error("Failed to cache:", url, error);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// Fetch Event - Serve cached files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate Event - Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});
