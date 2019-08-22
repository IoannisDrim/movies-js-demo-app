import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import MovieRamaApp from './app';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', {
    scope: './'
  });
}

new MovieRamaApp();
