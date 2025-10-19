/*
    -----------------------------------------------
    ----------  /jquery.antonydev.tech/  ----------
    ----------  /service-worker.js  ---------------
    -----------------------------------------------
*/


//  -----  Cambiar esta versión al actualizar la app  -----
const CACHE_VERSION = 'v4';

const CACHE_NAME = `antonydevtech-cache-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json', //  -----  asegurarnos de cachear el manifest  -----
    '/src/main.js',
    '/src/styles/normalize.css',
    '/src/styles/reset.css',
    '/src/styles/layout/layout.css',
    '/src/styles/layout/layout-header.css',
    '/src/styles/layout/layout-navbar.css',
    '/src/styles/layout/layout-main.css',
    '/src/styles/layout/layout-footer.css',
    '/assets/manifest/jquery-logo-128x128.png',
    '/assets/manifest/jquery-logo-512x512.png'
];



//  ----- Instalación del Service Worker -----
self.addEventListener('install', event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );

    self.skipWaiting(); // fuerza al SW a activarse inmediatamente

});



//  ----- Activación del Service Worker -----
self.addEventListener('activate', event => {

    event.waitUntil(
        
        caches
            .keys()
            .then(keys => {
                
                //  -----  Filtra las claves que no son la versión actual del caché  -----
                const oldCaches = keys.filter(key => key !== CACHE_NAME);

                //  -----  Elimina los cachés antiguos  -----
                return Promise.all(oldCaches.map(key => caches.delete(key)));
        })
    );

    //  -----  Toma el control de todas las páginas sin esperar reload  -----   
    self.clients.claim();

});


// self.addEventListener('activate', event => {

//     event.waitUntil(

//         caches

//             .keys()

//             .then(keys => 

//                 Promise.all(

//                     keys.map(key => 

//                         key !== CACHE_NAME ? caches.delete(key) : null))
//         )

//     );

//     self.clients.claim();  //  -----  toma el control de las páginas abiertas  -----

// });



//  ----- Fetch: intercepta las peticiones para usar cache si hay -----
self.addEventListener('fetch', event => {

    event.respondWith(

        caches

            .match(event.request)

            .then(response => {

                if (response)
                    return response;

                //  -----  Si no está en cache, fetch normal  -----
                return fetch(event.request).then(fetchResponse => {

                    //  -----  Opcional: actualizar cache dinámicamente  -----
                    if (event.request.url.startsWith(self.location.origin)) {

                        caches
                            .open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, fetchResponse.clone());
                            });
                    }

                    return fetchResponse;
                });
            })

            .catch(() => {

                //  -----  Fallback: si falla el fetch (por ejemplo en rutas SPA o offline)  -----
                if (event.request.mode === 'navigate')
                    return caches.match('/index.html');

            })

    );

});
