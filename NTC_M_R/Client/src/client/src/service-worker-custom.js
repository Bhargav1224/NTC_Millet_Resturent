/* eslint-disable */

console.log('This is custom service worker file');

self.addEventListener('install', (event) => {
  console.log(`This is custom service worker file -> install : ${event}`);
  event.waitUntil(
    caches.open('artist').then((cache) => cache.addAll(['/index.html', '/Fevicon3.png']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log(`This is custom service worker file -> activate : ${event}`);
  // caches.keys().then(function(cacheNames) {
  //   cacheNames.forEach(function(cacheName) {
  // console.log(`Deleting cacheName : ${cacheName}`);
  //     caches.delete(cacheName);
  //   });
  // });
});

self.addEventListener('fetch', (event) => {
  console.log(`This is custom service worker file -> fetch : ${event}`);
});

self.addEventListener('periodicsync', (event) => {
  console.log(`This is custom service worker file -> fetch : ${event}`);
  if (event.tag === 'artist') {
    console.log('Fetching artist in the background!');
    event.waitUntil(fetchAndCacheNews());
  }
});
