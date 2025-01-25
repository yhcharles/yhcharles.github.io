const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    // '/',
    // '/index.html',
    // '/pyscript/core.js',
    // '/pyscript/core.css',
    // '/main.py'
    // Add other assets you want to cache
];

// Cache the files during the install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch and cache files dynamically
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(networkResponse => {
                    // if (event.request.url.includes('/pyodide/')) {
                    //     return caches.open(CACHE_NAME).then(cache => {
                    //         cache.put(event.request, networkResponse.clone());
                    //         return networkResponse;
                    //     });
                    // }
                    return networkResponse;
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});