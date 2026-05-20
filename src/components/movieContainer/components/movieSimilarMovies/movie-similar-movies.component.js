export default class MovieSimilarMovies {
  constructor(similarMovies) {
    this.similarMovies = similarMovies;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'movie-details__similar';

    const heading = document.createElement('h5');
    heading.textContent = 'Similar Movies';
    wrapper.appendChild(heading);

    const text = document.createElement('p');
    text.textContent = this.similarMovies.length
      ? this.similarMovies.map((m) => m.title).join(', ')
      : 'No similar movies found.';
    wrapper.appendChild(text);

    return wrapper;
  }
}
