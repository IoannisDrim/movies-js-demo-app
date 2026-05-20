export default class MovieTrailer {
  constructor(trailerKey) {
    this.trailerKey = trailerKey;
    this.youtubeURL = 'https://www.youtube.com/embed/';
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'movie-details__trailer';

    const heading = document.createElement('h5');
    heading.textContent = 'Trailer';
    wrapper.appendChild(heading);

    if (this.trailerKey) {
      const iframe = document.createElement('iframe');
      iframe.className = 'movie-details__iframe';
      iframe.src = `${this.youtubeURL}${this.trailerKey}`;
      iframe.width = '100%';
      iframe.height = '315';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.title = 'Movie Trailer';
      wrapper.appendChild(iframe);
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No trailer found.';
      wrapper.appendChild(msg);
    }

    return wrapper;
  }
}
