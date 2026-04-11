const CACHE_NAME = 'chantier-v12';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'logo_des_entrepris.PNG',
  'https://img.icons8.com/color/192/evergreen-tree.png',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS) {
        try {
          const request = new Request(url, {
            // On n'utilise plus no-cors pour les scripts afin d'éviter les réponses opaques
            // qui cassent le chargement des scripts avec l'attribut crossorigin
            mode: url.startsWith('http') ? 'cors' : 'same-origin',
            cache: 'reload'
          });
          
          const response = await fetch(request);
          if (response.ok) {
            await cache.put(url, response);
          } else {
            console.warn(`ServiceWorker: Ressource ignorée (Statut ${response.status}): ${url}`);
          }
        } catch (err) {
          console.warn(`ServiceWorker: Erreur réseau pour ${url}:`, err);
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