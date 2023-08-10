const RANDOM_USER_CACHE = "random-user-cache";
const RANDOM_APPLIANCE_CACHE = "random-appliance-cache";

/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  // In this case, we're not pre-caching anything, so just ensure the service worker installs immediately.
  event.waitUntil(self.skipWaiting());
});

async function handleRandomUserRequest(request) {
  try {
    const networkResponse = await fetch(request);
    const data = await networkResponse.clone().json();

    const userId = data.results[0].id.value;

    const cache = await caches.open(RANDOM_USER_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      const cachedData = await cachedResponse.json();
      const existingUser = cachedData.results.find(
        (user) => user.id.value === userId
      );

      if (!existingUser) {
        cachedData.results.push(data.results[0]);
        await cache.put(request, new Response(JSON.stringify(cachedData)));
      }
    } else {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (e) {
    return getRandomUserFromCache();
  }
}

// Function to handle fetching and caching for random-data-api.com
async function handleRandomDataApiRequest(request) {
  const cache = await caches.open(RANDOM_APPLIANCE_CACHE);
  const cachedResponse = await cache.match(request);
  try {
    const networkResponse = await fetch(request);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (e) {
    return cachedResponse;
  }
}

async function handleRandomUserImageRequest(request) {
  const cache = await caches.open(RANDOM_USER_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  await cache.put(request, networkResponse.clone());

  return networkResponse;
}

async function getRandomUserFromCache() {
  const cache = await caches.open(RANDOM_USER_CACHE);
  const cachedResponse = await cache.match("https://randomuser.me/api/");

  return cachedResponse;
}

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === "https://randomuser.me") {
    if (requestUrl.pathname === "/api/") {
      event.respondWith(handleRandomUserRequest(event.request));
    } else if (requestUrl.pathname.startsWith("/api/portraits/")) {
      event.respondWith(handleRandomUserImageRequest(event.request));
    }
  } else if (
    requestUrl.origin === "https://random-data-api.com" &&
    requestUrl.pathname.startsWith("/api/v2/appliances")
  ) {
    event.respondWith(handleRandomDataApiRequest(event.request));
  }
});

self.addEventListener("activate", (event) => {
  var cacheWhitelist = [RANDOM_USER_CACHE, RANDOM_APPLIANCE_CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
