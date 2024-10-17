export default class Router {
  constructor(pages, defaultRoute) {
    this.pages = pages;
    this.defaultRoute = defaultRoute;
    this.appActiveState = '';
    this.appPrevActiveState = '';
  }

  set activeState(newActiveState) {
    this.appActiveState = newActiveState;
  }

  get activeState() {
    return this.appActiveState;
  }

  enableRouter() {
    this.loadInitialState();
    window.onhashchange = this.hashChanged.bind(this);
  }

  loadInitialState() {
    const locationHash = window.location.hash;
    if (!locationHash) {
      history.replaceState(undefined, undefined, `#${this.defaultRoute}`);
    }
    this.appPrevActiveState = locationHash.substring(1);
    this.hashChanged();
  }

  hashChanged() {
    let routeName = window.location.hash.substring(1);
    const routeToLoad = !this.pages[routeName] ? 'not-found' : routeName;

    if (this.appPrevActiveState !== routeName) {
      const page = this.pages[this.appPrevActiveState] ?? this.pages['not-found'];
      page.unmount && page.unmount();
      this.appPrevActiveState = routeName;
    }

    this.activeState = routeName;
    this.loadPageForRoute(routeToLoad);
  }

  loadPageForRoute(routeName) {
    const page = this.pages[routeName];
    page.init();
  }
}
