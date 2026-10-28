/* BOLT Steuerung – Service Worker (Offline-Cache)
   Neue Dateien/Icons? Dann CACHE hochzählen (v2 -> v3). */
const CACHE = 'bolt-v6';
const FILES = ['./', 'index.html', 'themes.js', 'fonts.css', 'manifest.json', 'icon.svg',
               'icon-192.png', 'icon-512.png', 'icon-512-maskable.png',
               'fonts/nunito-latin-wght-normal.woff2', 'fonts/fredoka-latin-wght-normal.woff2',
               'fonts/baloo-2-latin-wght-normal.woff2', 'fonts/quicksand-latin-wght-normal.woff2',
               'fonts/press-start-2p-latin-400-normal.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Erst aus dem Cache (schnell, offline), im Hintergrund auffrischen. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      });
      if (hit) { net.catch(() => {}); return hit; }
      return net.catch(() => caches.match('index.html'));
    })
  );
});
