let isCacheSupported = 'caches' in window;
console.log(isCacheSupported);

let cacheName = 'testCacheName';
let aboutPageUrl = 'about.html';

// Creating/Initializing a cache
caches.open(cacheName).then( cache => {
    // Creating an item to cache using add()
    cache.add(aboutPageUrl).then( () => {
        console.log('About page contents are cached.');
    });
});

// Adding multiple items to cache using addAll()
let allUrls = ['about.html', 'contact.html'];
caches.open(cacheName).then( cache => {
  cache.addAll(allUrls).then( () => {
        console.log('All pages are cached.');
  });
});

// put() method adds a key/value pair to current cache object. Using put, we need to manually fetch
// the request and set the value
fetch(aboutPageUrl).then( response => {
    return caches.open(cacheName).then( cache => {
       return cache.put(aboutPageUrl, response);
    });
});

// Retrieving from a cache
caches.open(cacheName).then( cache => {
    cache.match(aboutPageUrl).then( aboutPage => {
       console.log(aboutPage);
    });
});