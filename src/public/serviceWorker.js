
const staticCovid = "superdev-estimator";
const assets = [
  "/",
  "../index.html",  
  "/css/style.css",
  "../Estimator.js",
  
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticCovid).then(cache => {
      console.log("opened cache");
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
