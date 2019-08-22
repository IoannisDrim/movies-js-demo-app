import * as movieCardTemplate from './movie-card.component.html';
import './movie-card.component.css';

export default class MovieCardComponent {
  constructor(movieEntity) {
    this.movieCardTemplate = movieCardTemplate;
    this.movie = movieEntity;
  }

  render() {
    return new Function('movie', `return \`${this.movieCardTemplate}\`;`)(this.movie);
  }
}
