export default class InfiniteScrollUtil {
  constructor(parentId, scrollContainer) {
    this.parentId = parentId;
    this.scrollContainer = scrollContainer;
    this.scrollEventListener = this.scrollListener.bind(this);
    this.addScrollEventListener();
  }

  removeScrollEventListener() {
    this.scrollContainer.removeEventListener('scroll', this.scrollEventListener);
  }

  scrollListener() {
    if (
      this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >=
      this.scrollContainer.scrollHeight - 400
    ) {
      document.dispatchEvent(new CustomEvent(`fetchScrollContainerData_${this.parentId}`));
    }
  }

  addScrollEventListener() {
    this.scrollContainer.addEventListener('scroll', this.scrollEventListener);
  }
}
