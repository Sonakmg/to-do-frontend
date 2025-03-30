const CACHE_NAME = 'productivity-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon16.png',
  '/icon32.png',
  '/icon64.png',
  '/icon192.png',
  '/icon512.png',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .catch(error => {
            console.error('Error caching resources:', error);
          });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
                  .catch(error => {
                    console.error('Error caching response:', error);
                  });
              });
            return response;
          })
          .catch(error => {
            console.error('Error fetching resource:', error);
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
}); 