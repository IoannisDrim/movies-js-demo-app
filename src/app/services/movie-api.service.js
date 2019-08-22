import ServiceHelper from './service-helper.service';

export default class MovieAPIService {
  constructor() {
    this.url = 'https://api.themoviedb.org/3/';
    this.apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
    this.endpoints = {
      getNowPlaying: 'movie/now_playing',
      getGenres: 'genre/movie/list',
      getMovieTrailer: 'movie/{movie_id}/videos',
      getMovieReviews: 'movie/{movie_id}/reviews',
      getSimilarMovies: 'movie/{movie_id}/similar',
      searchMovie: 'search/movie'
    };
    this.serviceHelper = new ServiceHelper();
  }

  getNowPlaying(page) {
    const serviceURL = `${this.url + this.endpoints.getNowPlaying}?api_key=${this.apiKey}&page=${page}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  searchMovie(term, page = 1) {
    const serviceURL = `${this.url + this.endpoints.searchMovie}?api_key=${this.apiKey}&page=${page}&query=${encodeURI(term)}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getMovieGenres() {
    const serviceURL = `${this.url + this.endpoints.getGenres}?api_key=${this.apiKey}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getMovieTrailer(movieId) {
    const replacedEndpoint = this.endpoints.getMovieTrailer.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url + replacedEndpoint}?api_key=${this.apiKey}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getMovieReviews(movieId) {
    const replacedEndpoint = this.endpoints.getMovieReviews.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url + replacedEndpoint}?api_key=${this.apiKey}&page=1`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getSimilarMovies(movieId) {
    const replacedEndpoint = this.endpoints.getSimilarMovies.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url + replacedEndpoint}?api_key=${this.apiKey}&page=1`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }
}
