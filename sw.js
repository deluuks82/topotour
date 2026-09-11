/* Service worker voor https://deluuks82.github.io/topotour/
 *
 * Strategie: netwerk eerst, cache als terugval.
 * - Online zie je altijd de versie die op GitHub staat.
 * - De pagina zelf wordt met 'reload' opgehaald, zodat hij nooit uit de
 *   browsercache of de CDN van GitHub komt. Je hoeft dus niets aan dit
 *   bestand te veranderen als je het spel bijwerkt: gewoon uploaden.
 * - Offline werkt het spel door uit de cache van het laatste bezoek.
 */
const CACHE = 'topotour';
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
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(request, response) {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then(c => c.put(request, copy)).catch(() => {});
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // De pagina: altijd verplicht verversen, anders zie je na een update
  // tot tien minuten nog de oude versie via de cache van GitHub Pages.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request.url, { cache: 'reload' })
        .then(r => store(request, r))
        .catch(() => caches.match(request).then(r => r || caches.match('index.html')))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(r => store(request, r))
      .catch(() => caches.match(request))
  );
});
