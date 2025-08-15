const cacheName = "DefaultCompany-AR_Portal-0.1.0";
const contentToCache = [
    "Build/62bacedae637cf8323226876a81ce823.loader.js",
    "Build/3b777f44e9b93b8a55f9771a6f12ea5c.framework.js",
    "Build/fd1102c1d77fc5cc9bd4ee1a231e83e8.data",
    "Build/45f3925d39e744af6fa31eb4c683f9a0.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
