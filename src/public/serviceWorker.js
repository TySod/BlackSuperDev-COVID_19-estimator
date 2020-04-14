
const staticCovid = 'superdev-estimator';
const assets = [
  '/',
  '../index.html',
  '/css/style.css',
  '../Estimator.js'

];

document.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCovid).then((cache) => cache.addAll(assets))
  );
});

document.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => res || fetch(fetchEvent.request))
  );
});
