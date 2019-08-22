import MovieAPIService from '../../services/movie-api.service';
import MovieContainerComponent from '../../components/movieContainer/movie-container.component';
import SearchInputComponent from '../../components/searchInput/search-input-component';
import './search-movies.page.css';
import * as searchMoviesTemplate from './search-movies.page.html';

export default class SearchMoviesPage {
  constructor() {
    this.searchMoviesTemplate = searchMoviesTemplate;
    this.movieService = new MovieAPIService();
    this.movieServicePage = 1;
    this.previousMovieSearchTerm = '';
    this.moviesContainer = new MovieContainerComponent('searchMoviesPage');
    this.searchInputComponent = new SearchInputComponent(this, this.searchMovies);
  }

  render() {
    return this.searchMoviesTemplate;
  }

  afterRender() {
    this.loadContent();
    this.addFetchScrollContainerDataListener();
  }

  loadContent() {
    // Render movie container component
    this.moviesContainerTemplate = document.querySelector('#moviesContainerComponent');
    this.moviesContainerTemplate.innerHTML = this.moviesContainer.render();
    this.moviesContainer.afterRender();
    // Render search input component
    this.searchInputTemplate = document.getElementById('searchInputComponent');
    this.searchInputTemplate.innerHTML = this.searchInputComponent.render();
    this.searchInputComponent.afterRender();
  }

  searchMovies(makeCall, searchTerm) {
    if (this.previousMovieSearchTerm !== searchTerm) {
      this.movieServicePage = 1;
      this.moviesContainer.movies = [];
    }
    this.previousMovieSearchTerm = searchTerm;

    if (!makeCall) {
      return;
    }

    // TODO: fix loader component
    document.getElementById('containerLoader').classList.remove('d-none');
    this.movieService.searchMovie(searchTerm, this.movieServicePage)
      .then((success) => {
        const moviesFound = success.results;
        if (moviesFound.length && success.total_results > 0) {
          this.moviesContainer.movies = [...success.results];
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
    document.addEventListener('fetchScrollContainerData_searchMoviesPage', () => {
      this.movieServicePage += 1;
      this.searchMovies(true, this.previousMovieSearchTerm);
    });
  }
}
