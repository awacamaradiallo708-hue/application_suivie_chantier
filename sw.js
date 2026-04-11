const CACHE_NAME = 'chantier-v3';
const CACHE_NAME = 'chantier-v4';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'https://via.placeholder.com/192.png?text=Chantier'
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://via.placeholder.com/192.png?text=Chantier',
  'https://via.placeholder.com/512.png?text=Chantier'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});