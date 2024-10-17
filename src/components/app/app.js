import {Router} from '../../utils';
import {MovieAPIService} from '../../services';
import {InTheatersPage, SearchMoviesPage, NotFoundPage} from '../../pages';
import {Modal, Page, NavigationBar} from '../index';

export default class MovieRamaApp {
  constructor() {
    this.mainPageContainer = document.querySelector('main');
    this.movieApiService = new MovieAPIService();
    this.appRouter = new Router(
      {
        'in-theaters': new Page(InTheatersPage, this.mainPageContainer),
        'search-movies': new Page(SearchMoviesPage, this.mainPageContainer),
        'not-found': new Page(NotFoundPage, this.mainPageContainer),
      },
      'in-theaters',
    );
    this.navigationBarComponent = new NavigationBar(this.appRouter);
    this.modal = Modal;
    this.loadCommonUsedData().then(() => this.loadContent());
  }

  loadContent() {
    this.appRouter.enableRouter();
    document.querySelector('header').appendChild(this.navigationBarComponent.render());
    this.navigationBarComponent.afterRender();
  }

  async loadCommonUsedData() {
    await this.fetchMovieGenres();
  }

  /* Fetches Genres from server.If genres are fetched once then they are saved
   in local storage and service is not called again */
  async fetchMovieGenres() {
    if (localStorage.getItem('movieGenres')) return;

    try {
      const success = await this.movieApiService.getMovieGenres();
      localStorage.setItem('movieGenres', JSON.stringify(success.genres));
    } catch {
      this.modal.open('Attention!', 'An Error occurred, we could not fetch movie genres');
    }
  }
}
