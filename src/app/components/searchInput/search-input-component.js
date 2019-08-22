import PerformanceUtils from '../../utils/performance.utils';
import * as searchInputTemplate from './search-input-component.html';
import './search-input-component.css';

export default class SearchInputComponent {
  constructor(parentContext, searchCallback) {
    this.parentContext = parentContext;
    this.searchInputTemplate = searchInputTemplate;
    this.searchCallback = searchCallback;
    this.performanceUtils = new PerformanceUtils();
  }

  render() {
    return this.searchInputTemplate;
  }

  afterRender() {
    this.addInputChangeListener();
  }

  /* Handles user's input */
  addInputChangeListener() {
    const shouldCancelFunc = args => args[0].target.value.length <= 2;
    document.getElementById('searchMovieInput').addEventListener('input', this.performanceUtils.debounce((event) => {
      // this.moviesContainer.movies = [];
      if (event.target.value.length > 2) {
        // this.movieSearch = event.target.value;
        this.searchCallback.apply(this.parentContext, [true, event.target.value]);
      } else {
        this.searchCallback.call(this.parentContext, false);
      }
    }, 1000, shouldCancelFunc));
  }
}
