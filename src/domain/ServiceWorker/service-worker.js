import log from 'domain/log';

const { assets } = global.serviceWorkerOption;
const CACHE_NAME = (new Date()).toISOString();
const assetsToCache = [...assets, './'].map((path) => new URL(path, global.location).toString());

self.addEventListener('install', (event) => {
  if (! PRODUCTION) {
    log.debug('[SW] Install event');
  }

  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(assetsToCache))
      .then(() => {
        if (! PRODUCTION) {
          log.debug('Cached assets: main', assetsToCache);
        }
      })
      .catch((error) => {
        log.error(error);
        throw error;
      }),
  );
});

self.addEventListener('activate', (event) => {
  if (! PRODUCTION) {
    log.debug('[SW] Activate event');
  }

  event.waitUntil(
    global.caches
      .keys()
      .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => {
        // Delete the caches that are not the current one.
        if (cacheName.indexOf(CACHE_NAME) === 0) {
          return null;
        }

        return global.caches.delete(cacheName);
      }))),
  );
});

self.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting();
        self.clients.claim();
      }
      break;
    default:
      break;
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    if (! PRODUCTION) {
      log.debug(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (! PRODUCTION) {
      log.debug(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

  const resource = global.caches.match(request)
    .then((response) => {
      if (response) {
        if (! PRODUCTION) {
          log.debug(`[SW] fetch URL ${requestUrl.href} from cache`);
        }

        return response;
      }

      // Load and cache known assets.
      return fetch(request)
        .then((responseNetwork) => {
          if (! responseNetwork || ! responseNetwork.ok) {
            if (! PRODUCTION) {
              log.debug(`[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                responseNetwork.status} ${responseNetwork.type}`);
            }

            return responseNetwork;
          }

          if (! PRODUCTION) {
            log.debug(`[SW] URL ${requestUrl.href} fetched`);
          }

          const responseCache = responseNetwork.clone();

          global.caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseCache))
            .then(() => {
              if (! PRODUCTION) {
                log.debug(`[SW] Cache asset: ${requestUrl.href}`);
              }
            });

          return responseNetwork;
        })
        .catch(() => {
          // User is landing on our page.
          if (event.request.mode === 'navigate') {
            return global.caches.match('./');
          }

          return null;
        });
    });

  event.respondWith(resource);
});
