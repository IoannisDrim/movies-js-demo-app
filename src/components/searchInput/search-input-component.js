import {PerformanceUtils} from '../../utils';
import * as searchInputTemplate from './search-input-component.html';
import './search-input-component.scss';

export default class SearchInputComponent {
  constructor(parentContext, searchCallback) {
    this.performanceUtils = new PerformanceUtils();
    this.parentContext = parentContext;
    this.searchCallback = searchCallback;
    this.searchInputTemplate = searchInputTemplate;
  }

  render() {
    return document.createRange().createContextualFragment(this.searchInputTemplate.default);
  }

  afterRender() {
    this.addInputChangeListener();
  }

  /* Handles user's input */
  addInputChangeListener() {
    const cancelDebounceOnSmallInput = (args) => args[0].target.value.length <= 2;
    document.getElementById('searchMovieInput').addEventListener(
      'input',
      this.performanceUtils.debounce(
        (event) => {
          if (event.target.value.length > 2) {
            this.searchCallback.apply(this.parentContext, [true, event.target.value]);
          } else {
            this.searchCallback.call(this.parentContext, false);
          }
        },
        1000,
        cancelDebounceOnSmallInput,
      ),
    );
  }
}
