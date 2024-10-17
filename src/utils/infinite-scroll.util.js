import {PerformanceUtils} from './index';

export default class InfiniteScrollUtil {
  constructor(parentId, scrollContainer) {
    this.parentId = parentId;
    this.scrollContainer = scrollContainer;
    this.performanceUtils = new PerformanceUtils();
    this.scrollEventListener = this.scrollListener.bind(this);
    this.addScrollEventListener();
  }

  removeScrollEventListener() {
    this.scrollContainer.removeEventListener('scroll', this.scrollEventListener);
  }

  scrollListener() {
    if (
      this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >=
      this.scrollContainer.scrollHeight - 800
    ) {
      document.dispatchEvent(new CustomEvent(`fetchScrollContainerData_${this.parentId}`));
    }
  }

  /* Watches on scroll event and informs parent through event emit, to fetch more data if user scrolled to the end of page */
  addScrollEventListener() {
    this.scrollContainer.addEventListener(
      'scroll',
      this.performanceUtils.throttle(this.scrollEventListener, 500),
    );
  }
}
