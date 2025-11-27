const CACHE_NAME = 'senior-easy-v2.1';
const urlsToCache = [
  '/senior-easy-app/',
  '/senior-easy-app/index.html',
  '/senior-easy-app/manifest.json',
  '/senior-easy-app/icons/icon-192.png',
  '/senior-easy-app/icons/icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Instalacja Service Worker
self.addEventListener('install', function(event) {
  console.log('Service Worker instalowany');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Otwarta cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktywacja i czyszczenie starej cache
self.addEventListener('activate', function(event) {
  console.log('Service Worker aktywowany');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Usuwanie starej cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptowanie requestów
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Zwróć z cache lub wykonaj request sieciowy
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
