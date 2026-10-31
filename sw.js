// UniFind-UCC - FINAL Service Worker - Matches new criteria
// Brand: Purple #7C3AED + Orange #F97316 + Vendor name + badge + main photo rule

const CACHE_NAME = 'unifind-ucc-v4-final';
const urlsToCache = [
  './',
  './index.html',
  './vendor.html',
  './product.html',
  './product-detail.html',
  './post-product.html',
  './login.html',
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install - cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('UniFind: Caching v4');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate - clean old cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('UniFind: Deleting old cache', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Network first, then cache (for fresh listings + vendor badge)
self.addEventListener('fetch', event => {
  // Don't cache Firebase - always fresh for products, vendorName, verification
  if (event.request.url.includes('firestore') || 
      event.request.url.includes('firebase') ||
      event.request.url.includes('googleapis') ||
      event.request.url.includes('gstatic')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, resClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});