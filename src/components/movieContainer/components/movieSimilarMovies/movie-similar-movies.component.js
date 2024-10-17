import * as similarMoviesTemplate from './movie-similar-movies.component.html';

export default class MovieSimilarMovies {
  constructor(similarMovies, movieCardId) {
    this.similarMovies = similarMovies;
    this.movieCardId = movieCardId;
    this.similarMoviesTemplate = similarMoviesTemplate;
    this.similarMoviesWrapper = document.getElementById(`similar_movies_${this.movieCardId}`);
  }

  mount() {
    const similarMoviesComponent = document
      .createRange()
      .createContextualFragment(this.similarMoviesTemplate.default);
    this.similarMoviesWrapper.appendChild(similarMoviesComponent);
    this.afterMount();
  }

  afterMount() {
    this.setSimilarMovies();
  }

  setSimilarMovies() {
    this.similarMoviesWrapper.querySelector('#similarMoviesSpan').textContent = this.similarMovies
      .length
      ? this.similarMovies.map((similarMovie) => similarMovie.title).join(', ')
      : 'No similar movies found';
  }
}
