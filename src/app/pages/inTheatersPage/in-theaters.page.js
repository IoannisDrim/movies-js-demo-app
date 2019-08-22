import MovieAPIService from '../../services/movie-api.service';
import MovieContainerComponent from '../../components/movieContainer/movie-container.component';
import * as inTheatersTemplate from './in-theaters.page.html';
import './in-theaters.page.css';

export default class InTheatersPage {
  constructor() {
    this.inTheatersTemplate = inTheatersTemplate;
    this.movieService = new MovieAPIService();
    this.movieServicePage = 1;
    this.getInTheaterMovies();
    this.inTheatersMovies = [];
    this.moviesContainer = new MovieContainerComponent('inTheatersPage');
  }

  render() {
    return this.inTheatersTemplate;
  }

  afterRender() {
    this.loadContent();
    this.addFetchScrollContainerDataListener();
  }

  loadContent() {
    this.moviesContainerTemplate = document.querySelector('#moviesContainerComponent');
    this.moviesContainerTemplate.innerHTML = this.moviesContainer.render();
    this.moviesContainer.afterRender();
  }

  /* Fetches movies from server and updates component's data */
  getInTheaterMovies() {
    // TODO: fix loader component
    document.getElementById('containerLoader').classList.remove('d-none');

    this.movieService.getNowPlaying(this.movieServicePage)
      .then((success) => {
        this.inTheatersMovies = [...success.results];
        if (this.inTheatersMovies.length && success.total_results > 0) {
          this.moviesContainer.movies = this.inTheatersMovies;
        }
        // TODO: fix loader component
        document.getElementById('containerLoader').classList.add('d-none');
      }, () => {
        document.getElementById('containerLoader').classList.add('d-none');
        document.getElementById('modal-error-msg').innerHTML = 'Could not fetch movies';
        // $('#errorModal').modal();
      });
  }

  /* Listens infiniteScroll util and fetches more data if triggered */
  addFetchScrollContainerDataListener() {
    document.addEventListener('fetchScrollContainerData_inTheatersPage', () => {
      this.movieServicePage += 1;
      this.getInTheaterMovies();
    }, false);
  }
}
