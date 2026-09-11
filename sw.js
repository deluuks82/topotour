/* Service worker: netwerk eerst, cache als terugval.
   Zo zie je altijd de nieuwste versie en blijft het spel offline werkbaar. */
const CACHE = 'nl-topografie-v3';
const SHELL = [
  './',
  'index.html',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(c => c.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then(r => r || caches.match('index.html')))
  );
});
