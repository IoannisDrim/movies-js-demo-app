import PerformanceUtils from './performance.utils';

export default class InfiniteScrollUtil {
  constructor(parentId, scrollContainer) {
    this.parentId = parentId;
    this.scrollContainer = scrollContainer;
    this.performanceUtils = new PerformanceUtils();
    this.addScrollEventListener();
  }

  /* Watches on scroll event and informs parent throufh event emit, to fetch more data if user scrolled to the end of page */
  addScrollEventListener() {
    this.scrollContainer.addEventListener('scroll', this.performanceUtils.throttle(() => {
      if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight - 500) {
        document.dispatchEvent(new CustomEvent(`fetchScrollContainerData_${this.parentId}`));
      }
    }, 500));
  }
}
