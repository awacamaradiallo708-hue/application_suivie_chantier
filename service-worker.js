<<<<<<< HEAD
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("app-cache").then(function(cache) {
      return cache.addAll([
        "index.html",
        "app.js"
      ]);
    })
  );
=======
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("app-cache").then(function(cache) {
      return cache.addAll([
        "index.html",
        "app.js"
      ]);
    })
  );
>>>>>>> 1e1236a4ec0a87082a0757450538e5d1db7ef17b
});