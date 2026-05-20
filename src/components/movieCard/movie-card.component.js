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
    this.setGenres(fragment);
    this.setPosterFallback(fragment);
    this.movieCardContainer.appendChild(fragment);
    this.addShowMoreHandler(this.movie.id);
  }

  getSafeHtml() {
    const {id, title, poster_path, vote_average, overview} = this.movie;
    const tokens = {
      'movie.id': id,
      'movie.title': escapeHtml(title),
      'movie.poster_path': escapeHtml(poster_path),
      'movie.vote_average': vote_average,
      'movie.overview': escapeHtml(overview),
    };
    return this.movieCardTemplate.default.replace(
      /\{\{([\w.]+)\}\}/g,
      (_, key) => tokens[key] ?? '',
    );
  }

  setGenres(fragment) {
    const container = fragment.querySelector(`#genres_${this.movie.id}`);
    if (!container) return;
    this.movie.genres.forEach((name) => {
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = name;
      container.appendChild(chip);
    });
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
      this.onShowMoreClicked(cardId, button);
    };
  }
}
