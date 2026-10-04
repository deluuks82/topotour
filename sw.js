/* Topo Tour service worker
   Verhoog VERSION bij elke update, dan ruimt de browser de oude cache op. */
const VERSION = 'topotour-v2';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  /* De pagina zelf: eerst het netwerk (altijd de nieuwste versie),
     de cache alleen als je offline bent. */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put('index.html', copy));
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  /* Iconen en manifest: eerst de cache, dat is sneller. */
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
