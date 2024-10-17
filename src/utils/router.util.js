export default class Router {
  constructor(pages) {
    this.pages = pages;
    this.appActiveState = '';
    this.appPrevActiveState = '';
    window.onhashchange = this.hashChanged.bind(this);
  }

  set activeState(newActiveState) {
    this.appActiveState = newActiveState;
  }

  get activeState() {
    return this.appActiveState;
  }

  enableRouter() {
    this.loadInitialState();
  }

  loadInitialState() {
    if (!window.location.hash) {
      window.location = '#in-theaters';
    }
    this.appPrevActiveState = 'in-theaters';
    this.hashChanged();
  }

  hashChanged() {
    if (window.location.hash) {
      const routeName = window.location.hash.substring(1);

      if (this.appPrevActiveState !== routeName) {
        const page = this.pages[this.appPrevActiveState];
        page.unmount && page.unmount();
        this.appPrevActiveState = routeName;
      }

      this.activeState = routeName;
      this.loadPageForRoute(routeName);
    }
  }

  loadPageForRoute(routeName) {
    const page = this.pages[routeName];
    page.init();
  }
}
