const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/tiktok/", // Adjust for GitHub Pages
  "/tiktok/index.html",
  "/tiktok/logo192.png",
  "/tiktok/logo512.png",
  "/tiktok/manifest.json",
  "/tiktok/produk",
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
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open("image-cache").then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
          );
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
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

const DATA_CACHE_NAME = "data-barang-cache-v1";
const DATA_URL = "/data/dataBarang.json";

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "sync-data-barang") {
    event.waitUntil(checkForDataUpdate());
  }
});

async function checkForDataUpdate() {
  const cache = await caches.open(DATA_CACHE_NAME);
  const cachedResponse = await cache.match(DATA_URL);
  const cachedData = cachedResponse ? await cachedResponse.json() : null;

  const networkResponse = await fetch(DATA_URL);
  const networkData = await networkResponse.json();

  if (JSON.stringify(cachedData) !== JSON.stringify(networkData)) {
    await cache.put(DATA_URL, networkResponse.clone());

    // Kirim notifikasi jika ada perubahan
    self.registration.showNotification("Update Produk!", {
      body: "Ada produk baru, cek sekarang!",
      icon: "/tiktok/logo192.png",
      badge: "/tiktok/logo192.png",
    });
  }
}
