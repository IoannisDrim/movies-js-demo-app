import {MovieAPIService} from '../../services';
import {Modal, Loader, SearchInput, MovieContainer} from '../../components';
import * as searchMoviesTemplate from './search-movies.page.html';
import './search-movies.page.scss';

export default class SearchMoviesPage {
  constructor() {
    this.movieService = new MovieAPIService();
    this.moviesContainer = new MovieContainer('searchMoviesPage');
    this.searchInputComponent = new SearchInput(this, this.searchMovies);
    this.loader = Loader;
    this.modal = Modal;
    this.searchMoviesTemplate = searchMoviesTemplate;
    this.movieServicePage = 1;
    this.previousMovieSearchTerm = '';
    this.fetchScrollContainerDataListener = this.scrollListener.bind(this);
    this.publicAccesibleId = 'searchMoviesPage';
  }

  render() {
    return document.createRange().createContextualFragment(this.searchMoviesTemplate.default);
  }

  unmount() {
    document.removeEventListener(
      'fetchScrollContainerData_searchMoviesPage',
      this.fetchScrollContainerDataListener,
      false,
    );
    this.moviesContainer.unmount();
  }

  afterRender() {
    this.loadContent();
    this.addFetchScrollContainerDataListener();
  }

  loadContent() {
    // Render movie container component
    this.moviesContainerTemplate = document.querySelector('#moviesContainerComponent');
    this.moviesContainerTemplate.appendChild(this.moviesContainer.render());
    this.moviesContainer.afterRender();
    // Render search input component
    this.searchInputTemplate = document.getElementById('searchInputComponent');
    this.searchInputTemplate.appendChild(this.searchInputComponent.render());
    this.searchInputComponent.afterRender();
  }

  searchMovies(makeCall, searchTerm) {
    if (this.previousMovieSearchTerm !== searchTerm) {
      this.movieServicePage = 1;
      this.moviesContainer.movies = [];
    }
    this.previousMovieSearchTerm = searchTerm;

    if (!makeCall) return;

    this.loader.showLoader();

    this.movieService
      .searchMovie(searchTerm, this.movieServicePage)
      .then((success) => {
        const moviesFound = success.results;
        if (moviesFound.length && success.total_results > 0) {
          this.moviesContainer.movies = [...success.results];
        }
      })
      .catch(() => {
        this.modal.open(
          'Attention',
          'An error occurred while loading data, please refresh and try again.',
        );
      })
      .finally(() => {
        this.loader.hideLoader();
      });
  }

  scrollListener() {
    this.movieServicePage += 1;
    this.searchMovies(true, this.previousMovieSearchTerm);
  }

  /* Listens infiniteScroll util and fetches more data if triggered */
  addFetchScrollContainerDataListener() {
    document.addEventListener(
      'fetchScrollContainerData_searchMoviesPage',
      this.fetchScrollContainerDataListener,
    );
  }

  getPublicAccessibleId() {
    return this.publicAccesibleId;
  }
}
