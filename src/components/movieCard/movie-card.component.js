import * as movieCardTemplate from './movie-card.component.html';
import './movie-card.component.scss';
import {escapeHtml} from '../../utils';

export default class MovieCardComponent {
  constructor(movieEntity, movieCardContainer, onShowMoreClicked) {
    this.movieCardTemplate = movieCardTemplate;
    this.movie = movieEntity;
    this.movieCardContainer = movieCardContainer;
    this.onShowMoreClicked = onShowMoreClicked;
    this.render();
  }

  render() {
    const fragment = document.createRange().createContextualFragment(this.getSafeHtml());
    this.setPosterFallback(fragment);
    this.movieCardContainer.appendChild(fragment);
    this.addShowMoreHandler(this.movie.id);
  }

  getSafeHtml() {
    const {id, title, poster_path, vote_average} = this.movie;
    const tokens = {
      'movie.id': id,
      'movie.title': escapeHtml(title),
      'movie.poster_path': escapeHtml(poster_path),
      'movie.vote_average': vote_average,
    };
    return this.movieCardTemplate.default.replace(
      /\{\{\s*([\w.]+)\s*\}\}/g,
      (_, key) => tokens[key] ?? '',
    );
  }

  setPosterFallback(fragment) {
    const img = fragment.querySelector('.card__image');
    if (!img) return;
    img.onerror = () => {
      img.style.visibility = 'hidden';
      img.onerror = null;
    };
  }

  addShowMoreHandler(cardId) {
    const button = document.getElementById(`showMoreButton_${cardId}`);
    if (!button) return;
    button.onclick = () => {
      this.onShowMoreClicked(cardId, this.movie.title);
    };
  }
}
