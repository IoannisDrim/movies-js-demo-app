import InTheatersPage from './pages/inTheatersPage/in-theaters.page';
import SearchMoviesPage from './pages/searchMoviesPage/search-movies.page';
import NavigationBarComponent from './components/navigationBar/navigation-bar.component';
import Router from './utils/router.util';
import MovieAPIService from './services/movie-api.service';
import Page from './models/page.model';
import './app.css';
import './components/navigationBar/navigation-bar.component.html';

export default class MovieRamaApp {
  constructor() {
    this.mainPageContainer = document.querySelector('main');
    this.movieApiService = new MovieAPIService();
    this.appRouter = new Router(
      {
        '#': new Page(InTheatersPage, this.mainPageContainer),
        'in-theaters': new Page(InTheatersPage, this.mainPageContainer),
        'search-movies': new Page(SearchMoviesPage, this.mainPageContainer)
      }
    );
    this.navigationBarComponent = new NavigationBarComponent(this.appRouter);
    this.loadContent();
    this.loadCommonUsedData();
  }

  loadContent() {
    document.querySelector('header').innerHTML = this.navigationBarComponent.render();
    this.navigationBarComponent.afterRender();
  }

  loadCommonUsedData() {
    this.fetchMovieGenres();
  }

  /* Fetches Genres from server.If genres are fetched once then they are saved
   in local storage and service is not called again */
  fetchMovieGenres() {
    if (localStorage.getItem('movieGenres')) {
      return;
    }

    this.movieApiService.getMovieGenres()
      .then((success) => {
        localStorage.setItem('movieGenres', JSON.stringify(success.genres));
      }, () => {
        document.getElementById('modal-error-msg').innerHTML = 'Could not fetch movieGenres';
        //$('#myModal').modal();
      });
  }
}
