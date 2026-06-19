const CACHE_NAME = 'aix-en-trott-v5';
const APP_SHELL = [
  '/',
  '/planner',
  '/sorties',
  '/carte',
  '/recharge',
  '/conseils',
  '/a-propos',
  '/offline.html',
  '/manifest.webmanifest',
  '/favicon-32.png',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-192-maskable.png',
  '/icon-512-maskable.png',
  '/logo-horizontal.png',
  '/logo-emblem-mini.png',
  '/logo-mark.svg',
  '/og-image.png',
  '/og-image.svg',
  '/ads.txt',
];

const STATIC_DESTINATIONS = new Set(['style', 'script', 'image', 'font', 'manifest']);

function isCacheableResponse(response) {
  return response.ok && (response.type === 'basic' || response.type === 'default');
}

async function putInCache(request, response) {
  if (!isCacheableResponse(response)) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return putInCache(request, response);
  } catch {
    return (await caches.match(request)) || (await caches.match('/')) || caches.match('/offline.html');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => putInCache(request, response))
    .catch(() => null);

  return cached || networkPromise || caches.match('/offline.html');
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  return putInCache(request, response);
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (STATIC_DESTINATIONS.has(event.request.destination)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request));
});
