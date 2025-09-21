const CACHE_NAME = 'antonydevtech-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/src/main.js',
    '/src/styles/layout/layout.css',
    '/src/styles/layout/layout-header.css',
    '/src/styles/layout/layout-navbar.css',
    '/src/styles/layout/layout-main.css',
    '/src/styles/layout/layout-footer.css',
    '/assets/manifest/jquery-logo-128x128.png',
    '/assets/manifest/jquery-logo-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        )
    );
    self.clients.claim();
});

// Fetch: intercepta las peticiones para usar cache si hay
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
