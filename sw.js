const CACHE_NAME = 'passly-v4-auto';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// 1. Instalar y activar de inmediato sin esperar
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
});

// 2. Borrar cualquier caché vieja y tomar control de la PWA al instante
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 3. Primero internet; si falla (offline), usa la caché. Ignora peticiones de Firebase.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('googleapis.com') || url.includes('firebase') || url.includes('gstatic.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
