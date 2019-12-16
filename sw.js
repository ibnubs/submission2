var CACHE_NAME = 'BOLAV1';

var urlsToCache = [
    '/', 
    '/index.html',
    '/nav.html',
    '/manifest.json',
    '/js/api.js',
    '/js/nav.js',
    '/js/materialize.min.js',
    '/js/materialize.min.js',
    '/js/idb.js',
    '/js/db-controller.js',
    '/img/propic.jpg',
    '/img/notif.png',
    '/img/soccer-ball.png',
    '/pages/about.html',
    '/pages/contact.html',
    '/pages/favorit.html',
    '/pages/home.html',
    '/pages/match.html',
    '/css/materialize.min.css',
    '/css/style.css'

];

self.addEventListener('install', event => {
    console.log('ServiceWorker: Menginstall..');
    event.waitUntil(
        caches.open(CACHE_NAME).then( cache => {
            console.log('ServiceWorker: Membuka cache..');
            return cache.addAll(urlsToCache);
        })
    );
    return self.skipWaiting();
});


// fungsi untuk menggunakan aset dari cache agar bisa digunakan offline
self.addEventListener('fetch', event => {
    var baseUrl = 'https://api.football-data.org/v2/';
    if (event.request.url.indexOf(baseUrl) > -1 ) {
        event.respondWith(
            caches.match(event.request).then( (response) => {
                console.log('ServiceWorker: Menarik data: ', event.request.url);
                if (response) {
                    console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
                    return response;
                }
                console.log(
                    'ServiceWorker: Memuat aset dari server: ',
                    event.request.url
                );
                return fetch(event.request);
            })
        );        
    }

});



// Function digunakan untuk mendelete chace jika dilakukan update

self.addEventListener('activate',event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('on active')
                        console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});


// self.addEventListener('push', event => {
//     var body;
//     if(event.data){
//         body = event.data.text();
//     } else {
//         body = 'Push message no playload'
//     }
//     var options = {
//         body: body,
//         icon: 'img/notif.png',
//         vibrate: [100,50,100],
//         data:{
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };
//     event.waitUntil(
//         self.registration.showNotification('Push Notification', options)
//     );
// });
