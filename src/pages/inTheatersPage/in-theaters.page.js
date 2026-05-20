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
    this.isFetching = false;
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

  getInTheaterMovies() {
    this.isFetching = true;
    const isFirstLoad = this.movieServicePage === 1;

    if (isFirstLoad) {
      this.loader.showLoader();
    } else {
      this.moviesContainer.showSkeletons();
    }

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
        this.isFetching = false;
        if (isFirstLoad) {
          this.loader.hideLoader();
        } else {
          this.moviesContainer.hideSkeletons();
        }
      });
  }

  scrollListener() {
    if (this.isFetching) return;
    this.movieServicePage += 1;
    this.getInTheaterMovies();
  }

  addFetchScrollContainerDataListener() {
    document.addEventListener(
      'fetchScrollContainerData_inTheatersPage',
      this.fetchScrollContainerDataListener,
      false,
    );
  }

  getPublicAccessibleId() {
    return this.publicAccesibleId;
  }
}
