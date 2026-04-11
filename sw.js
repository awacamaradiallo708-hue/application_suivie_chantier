const CACHE_NAME = 'chantier-v9';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'logo.png',
  'https://img.icons8.com/color/192/tree.png',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS) {
        try {
          // On utilise Request avec cache: 'reload' pour forcer la récupération fraîche
          await cache.add(new Request(url, { cache: 'reload' }));
        } catch (err) {
          console.warn('ServiceWorker: Échec de mise en cache pour ' + url, err);
        }
      }
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