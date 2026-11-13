const CACHE_NAME = 'itw-typing-practice-v1';

self.addEventListener('install', (event) => {
  const pageUrl = new URL('./', self.location.href).href;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.add(pageUrl))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('itw-typing-practice-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response.ok) return response;
        return caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, response.clone()).then(() => response));
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const offlinePage = await caches.match(new URL('./', self.registration.scope).href);
          if (offlinePage) return offlinePage;
        }
        return Response.error();
      }),
  );
});
