const CACHE = "content-v1"; 
const OFFLINE = "/offline.html"; 

const AUTO_CACHE = [
	OFFLINE,
	"/",
	"/serviceworker.js",

	"/js/assignment.js",
	"/js/assignments.js",
	"/js/bootstrap.js",
	"/js/calendar.js",
	"/js/common.js",
	"/js/courses.js",
	"/js/jquery-calendar.js",
	"/js/jquery.js",
	"/js/pace.js",
	"/js/people.js",
	"/js/popover.js",
	"/js/stream.js",
	"/js/test.js",
	"/js/tests.js",
	"/css/bootstrap.css",
	"/css/calendar.css",
	"/css/class.css",
	"/css/error.css",
	"/css/info.css",
	"/css/login.css",
	"/css/main.css",
	"/css/pace.css",
	"/css/sans.ttf",

	"/images/gstatic.jpg",
	"/images/infoOne.png",
	"/images/infoTwo.png",
	"/images/infoThree.png",
	"/images/profilePic.png",
	"/manifest.json",
	"/logo.png",
	"/apple-touch-icon.png",
	"favicon.ico",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(AUTO_CACHE))
			.then(self.skipWaiting())
	);
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter((cacheName) => CACHE !== cacheName);
			})
			.then((unusedCaches) => {
				console.log("DESTROYING CACHE", unusedCaches.join(","));
				return Promise.all(
					unusedCaches.map((unusedCache) => {
						return caches.delete(unusedCache);
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener("fetch", (event) => {
	if (
		!event.request.url.startsWith(self.location.origin) ||
		event.request.method !== "GET"
	) {
		return void event.respondWith(fetch(event.request));
	}

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				caches.open(CACHE).then((cache) => {
					cache.put(event.request, response);
				});
				return response.clone();
			})
			.catch((_err) => {
				return caches.match(event.request).then((cachedResponse) => {
					if (cachedResponse) {
						return cachedResponse;
					}

					return caches.open(CACHE).then((cache) => {
						const offlineRequest = new Request(OFFLINE);
						return cache.match(offlineRequest);
					});
				});
			})
	);
});
