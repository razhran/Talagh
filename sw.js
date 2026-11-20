// Talagh service worker v4: prefer fresh source files to prevent stale app.js errors.
const CACHE = 'talagh-v4';
const STATIC = ['./', './index.html', './assets/style.css', './assets/talagh.css', './assets/icon.svg', './js/app.js', './js/db.js', './js/engine.js', './data/words.json', './manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(
  caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())
));
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('talagh-') || k.startsWith('vocablab-')).filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  const sourceFile = request.mode === 'navigate' || /\.(?:js|css|html|json|webmanifest)$/.test(url.pathname);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (sourceFile) {
      try {
        const response = await fetch(request, {cache:'no-store'});
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        return (await cache.match(request)) || Response.error();
      }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) { return Response.error(); }
  })());
});
