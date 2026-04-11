const CACHE_NAME = 'chantier-v10';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'logo_des_entrepris.PNG', // Nom de fichier corrigé
  'https://img.icons8.com/color/192/tree.png',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Tente de mettre en cache chaque ressource individuellement
      // pour éviter qu'une seule erreur ne fasse échouer toute l'installation.
      // Gère les ressources locales et externes différemment.
      for (let url of ASSETS) {
        // Pour les ressources externes, on essaie un fetch sans CORS pour la mise en cache
        // Cela peut aider à contourner certains blocages de Tracking Prevention,
        // mais la ressource ne sera pas "opaque" et ne pourra pas être inspectée.
        // Pour les ressources locales, on utilise cache.add pour un contrôle plus strict.
        try {
          if (url.startsWith('http')) {
            const response = await fetch(url, { mode: 'no-cors' });
            if (response.ok || response.type === 'opaque') { // Vérifie si la réponse est OK ou opaque
              await cache.put(url, response);
            } else {
              console.warn(`ServiceWorker: Échec de récupération pour ${url} (statut: ${response.status})`);
            }
          } else {
            // Pour les ressources locales, on utilise add pour un contrôle plus strict
            await cache.add(new Request(url, { cache: 'reload' }));
          }
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