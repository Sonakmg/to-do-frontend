const CACHE_NAME = 'productivity-pro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon16.png',
  '/icon32.png',
  '/icon64.png',
  '/icon192.png',
  '/icon512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        // Cache each resource individually to handle failures gracefully
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url)
              .then(() => console.log(`Successfully cached ${url}`))
              .catch(error => {
                console.error(`Failed to cache ${url}:`, error);
              })
          )
        );
      })
      .catch(error => {
        console.error('Error opening cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('Service Worker fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          console.log('Found in cache:', event.request.url);
          return response;
        }

        console.log('Not found in cache, fetching:', event.request.url);
        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              console.log('Invalid response:', event.request.url);
              return response;
            }

            console.log('Successfully fetched:', event.request.url);
            // Clone the response because it can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
                  .then(() => console.log('Successfully cached response:', event.request.url))
                  .catch(error => {
                    console.error('Error caching response:', error);
                  });
              })
              .catch(error => {
                console.error('Error opening cache:', error);
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
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        console.log('Found caches:', cacheNames);
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
}); 