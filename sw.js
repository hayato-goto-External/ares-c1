/* 版を上げるとキャッシュが入れ替わる。中身を更新したらこの数字を増やす */
const VERSION = 'v3';
const CACHE = 'ares-c1-' + VERSION;
const ASSETS = [
  "./index.html",
  "./cards.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./note/new-101.html",
  "./note/new-102.html",
  "./note/new-103.html",
  "./note/new-104.html",
  "./note/new-105.html",
  "./note/new-106.html",
  "./note/old-101.html",
  "./note/old-102.html",
  "./note/old-103.html",
  "./note/old-104.html",
  "./note/old-105.html",
  "./fig/21-AM-e-38.webp",
  "./fig/21-AM-e-39.webp",
  "./fig/21-AM-q-38.webp",
  "./fig/21-AM-q-39.webp",
  "./fig/21-PM-e-36.webp",
  "./fig/21-PM-e-40.webp",
  "./fig/21-PM-q-36.webp",
  "./fig/21-PM-q-40.webp",
  "./fig/22-AM-e-38.webp",
  "./fig/22-AM-e-39.webp",
  "./fig/22-AM-q-38.webp",
  "./fig/22-AM-q-39.webp",
  "./fig/22-PM-e-28.webp",
  "./fig/22-PM-e-40.webp",
  "./fig/22-PM-q-28.webp",
  "./fig/23-AM-e-38.webp",
  "./fig/23-AM-e-39.webp",
  "./fig/23-AM-q-38.webp",
  "./fig/23-AM-q-39.webp",
  "./fig/24-AM-e-16.webp",
  "./fig/24-AM-e-17.webp",
  "./fig/24-AM-e-39.webp",
  "./fig/24-AM-e-46.webp",
  "./fig/24-AM-q-16.webp",
  "./fig/24-AM-q-17.webp",
  "./fig/24-AM-q-3.webp",
  "./fig/24-AM-q-39.webp",
  "./fig/24-AM-q-40.webp",
  "./fig/24-AM-q-42.webp",
  "./fig/24-AM-q-46.webp",
  "./fig/25-AM-e-16.webp",
  "./fig/25-AM-e-17.webp",
  "./fig/25-AM-e-39.webp",
  "./fig/25-AM-e-43.webp",
  "./fig/25-AM-e-46.webp",
  "./fig/25-AM-e-47.webp",
  "./fig/25-AM-q-16.webp",
  "./fig/25-AM-q-17.webp",
  "./fig/25-AM-q-3.webp",
  "./fig/25-AM-q-35.webp",
  "./fig/25-AM-q-39.webp",
  "./fig/25-AM-q-40.webp",
  "./fig/25-AM-q-42.webp",
  "./fig/25-AM-q-43.webp",
  "./fig/25-AM-q-46.webp",
  "./fig/25-AM-q-47.webp",
  "./fig/25-PM-e-43.webp",
  "./fig/25-PM-q-49.webp"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* キャッシュ優先。オフラインでも開けるようにする */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
