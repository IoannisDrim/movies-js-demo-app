import {ServiceHelper} from '../services';

export default class MovieAPIService {
  constructor() {
    this.url = process.env.MOVIES_API;
    this.apiKey = process.env.MOVIES_API_KEY;
    this.endpoints = {
      getNowPlaying: 'movie/now_playing',
      getMovieTrailer: 'movie/{movie_id}/videos',
      getMovieReviews: 'movie/{movie_id}/reviews',
      getSimilarMovies: 'movie/{movie_id}/similar',
    };
    this.serviceHelper = new ServiceHelper();
  }

  getNowPlaying(page) {
    const serviceURL = `${this.url}${this.endpoints.getNowPlaying}?api_key=${this.apiKey}&page=${page}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getMovieTrailer(movieId) {
    const replacedEndpoint = this.endpoints.getMovieTrailer.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url}${replacedEndpoint}?api_key=${this.apiKey}`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getMovieReviews(movieId) {
    const replacedEndpoint = this.endpoints.getMovieReviews.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url}${replacedEndpoint}?api_key=${this.apiKey}&page=1`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }

  getSimilarMovies(movieId) {
    const replacedEndpoint = this.endpoints.getSimilarMovies.replace(/{movie_id}/g, movieId);
    const serviceURL = `${this.url}${replacedEndpoint}?api_key=${this.apiKey}&page=1`;
    return this.serviceHelper.returnPromise('GET', serviceURL);
  }
}
