var CACHE_NAME = "pwasub2";
var urlsToCache = [
    "/", 
    "/index.html",
    "/manifest.json",
    "/nav.html",
    "/pages/home.html",
    "/pages/teams.html", 
    "/js/main.js",
    "/js/api.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/nav.js",
    "/js/idb.js",
    "/js/db-controller.js",
    "/img/soccer-ball.png",
    "/img/notif.png",
    "/img/propic.jpg",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/favorit.html",
    
];
 
self.addEventListener("install", function(event) {
  console.log("ServiceWorker: Menginstall..");
 
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});



self.addEventListener('push', event => {
    var body;
    if(event.data){
        body = event.data.text();
    } else {
        body = 'Push message no playload'
    }
    var options = {
        body: body,
        icon: 'img/notif.png',
        vibrate: [100,50,100],
        data:{
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
