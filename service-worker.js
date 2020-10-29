const CACHE_NAME = "pontianak";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/explore.html",
    "/pages/history.html",
    "/pages/creator.html",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/cehuntiau.webp",
    "/img/chaikue.webp",
    "/img/naga.webp",
    "/img/albarra.jpg",
    "/img/sejarah.png",
    'https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/icon.png',
    '/manifest.json'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});