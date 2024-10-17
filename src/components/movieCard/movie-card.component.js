import * as movieCardTemplate from './movie-card.component.html';
import './movie-card.component.scss';

export default class MovieCardComponent {
  constructor(movieEntity, movieCardContainer, onShowMoreClicked) {
    this.movieCardTemplate = movieCardTemplate;
    this.movie = movieEntity;
    this.movieCardContainer = movieCardContainer;
    this.onShowMoreClicked = onShowMoreClicked;
    this.render();
  }

  render() {
    const movieCardComponent = document
      .createRange()
      .createContextualFragment(this.getContextualFragment()).firstChild;
    this.movieCardContainer.appendChild(movieCardComponent);
    this.addShowMoreHandler(this.movie.id);
  }

  getContextualFragment() {
    return new Function('movie', `return \`${this.movieCardTemplate.default}\`;`)(this.movie);
  }

  addShowMoreHandler(cardId) {
    const button = document.getElementById(`showMoreButton_${cardId}`);
    if (!button) return;
    button.onclick = () => {
      this.onShowMoreClicked(cardId, button);
    };
  }
}
