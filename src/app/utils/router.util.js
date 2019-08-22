export default class Router {
  constructor(pages, el) {
    this.pages = pages;
    this.el = el;
    this.appActiveState = '';
    window.onhashchange = this.hashChanged.bind(this);
    this.loadInitialState();
  }

  set activeState(newActiveState) {
    this.appActiveState = newActiveState;
  }

  get activeState() {
    return this.appActiveState;
  }

  loadInitialState() {
    if (!window.location.hash) {
      window.location = '#in-theaters';
    }
    this.hashChanged();
  }

  hashChanged() {
    if (window.location.hash) {
      const routeName = window.location.hash.substr(1);
      this.activeState = routeName;
      this.loadPageForRoute(routeName);
    }
  }

  loadPageForRoute(routeName) {
    const page = this.pages[routeName];
    page.load();
  }
}
