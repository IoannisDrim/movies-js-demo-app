import * as trailerTemplate from './movie-trailer.component.html';

export default class MovieTrailer {
  constructor(trailer, movieCardId) {
    this.trailer = trailer;
    this.movieCardId = movieCardId;
    this.trailerTemplate = trailerTemplate;
    this.trailerWrapper = document.getElementById(`trailer_${this.movieCardId}`);
    this.youtubeURL = 'https://www.youtube.com/embed/';
  }

  mount() {
    const trailerComponent = document
      .createRange()
      .createContextualFragment(this.trailerTemplate.default);
    this.trailerWrapper.appendChild(trailerComponent);
    this.afterMount();
  }

  afterMount() {
    this.setTrailer();
  }

  setTrailer() {
    if (this.trailer) {
      this.trailerWrapper.querySelector('iframe').src = `${this.youtubeURL}${this.trailer}`;
    } else {
      this.trailerWrapper.getElementById('trailerNotFound').textContent = 'No trailer found.';
      this.trailerWrapper.querySelector('iframe').setAttribute('class', 'hidden');
    }
  }
}
