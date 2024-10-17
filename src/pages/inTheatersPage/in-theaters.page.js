import {MovieAPIService} from '../../services';
import {Modal, Loader, MovieContainer} from '../../components';
import * as inTheatersTemplate from './in-theaters.page.html';
import './in-theaters.page.scss';

export default class InTheatersPage {
  constructor() {
    this.movieService = new MovieAPIService();
    this.loader = Loader;
    this.moviesContainer = new MovieContainer('inTheatersPage');
    this.modal = Modal;
    this.inTheatersTemplate = inTheatersTemplate;
    this.movieServicePage = 1;
    this.inTheatersMovies = [];
    this.fetchScrollContainerDataListener = this.scrollListener.bind(this);
    this.getInTheaterMovies();
    this.publicAccesibleId = 'inTheatersPage';
  }

  render() {
    return document.createRange().createContextualFragment(this.inTheatersTemplate.default);
  }

  unmount() {
    document.removeEventListener(
      'fetchScrollContainerData_inTheatersPage',
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
    this.moviesContainerTemplate = document.querySelector('#moviesContainerComponent');
    this.moviesContainerTemplate.appendChild(this.moviesContainer.render());
    this.moviesContainer.afterRender();
  }

  /* Fetches movies from server and updates component's data */
  getInTheaterMovies() {
    this.loader.showLoader();

    this.movieService
      .getNowPlaying(this.movieServicePage)
      .then((success) => {
        this.inTheatersMovies = [...success.results];
        if (this.inTheatersMovies.length && success.total_results > 0) {
          this.moviesContainer.movies = this.inTheatersMovies;
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
    this.getInTheaterMovies();
  }

  /* Listens infiniteScroll util and fetches more data if triggered */
  addFetchScrollContainerDataListener() {
    document.addEventListener(
      'fetchScrollContainerData_inTheatersPage',
      this.fetchScrollContainerDataListener.bind(this),
      false,
    );
  }

  getPublicAccessibleId() {
    return this.publicAccesibleId;
  }
}
