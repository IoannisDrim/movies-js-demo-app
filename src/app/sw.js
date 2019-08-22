// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
importScripts('serviceworker-cache-polyfill.js');

// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
this.addEventListener('install', (event) => {
  // We pass a promise to event.waitUntil to signal how
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then((cache) => {
      // And add resources to it
      cache.addAll([
        './',
        'index.html',
        'main.js',
        'app.css',
        'app.js',
        'components/movieCard/movie-card.component.css',
        'components/movieCard/movie-card.component.js',
        'components/movieCard/movie-card.component.html',
        'components/movieContainer/movie-container.component.css',
        'components/movieContainer/movie-container.component.js',
        'components/movieContainer/movie-container.component.html',
        'components/navigationBar/navigation-bar.component.html',
        'components/navigationBar/navigation-bar.component.js',
        'pages/inTheatersPage/in-theaters.page.css',
        'pages/inTheatersPage/in-theaters.page.js',
        'pages/inTheatersPage/in-theaters.page.html',
        'pages/searchMoviesPage/search-movies.page.css',
        'pages/searchMoviesPage/search-movies.page.js',
        'pages/searchMoviesPage/search-movies.page.html',
        'models/page.model.js',
        'utils/infinite-scroll.util.js',
        'utils/performance.utils.js',
        'utils/router.util.js',
        'services/movie-api.service.js',
        'services/service-helper.service.js'
      ]);
    })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
this.addEventListener('load', (event) => {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then((response) => {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});
