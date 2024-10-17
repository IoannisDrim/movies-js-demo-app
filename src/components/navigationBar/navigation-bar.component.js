import * as navigationBarTemplate from './navigation-bar.component.html';
import './navigation-bar.component.scss';

export default class NavigationBarComponent {
  constructor(router) {
    this.router = router;
    this.activeNavItemClassName = 'active-header-link';
    this.activeState = '';
    this.navigationBarTemplate = navigationBarTemplate;
    this.hashChangedListener = this.onHashChanged.bind(this);
  }

  render() {
    return document.createRange().createContextualFragment(this.navigationBarTemplate.default);
  }

  unmount() {
    document.removeEventListener('hashchange', this.hashChangedListener, false);
  }

  afterRender() {
    this.navigationBarContainer = document.querySelector('#headerNav');
    this.activeState = this.router.activeState;
    this.setActiveLink();
    this.initiateLocationChangedListener();
  }

  initiateLocationChangedListener() {
    addEventListener('hashchange', this.hashChangedListener.bind(this));
  }

  onHashChanged() {
    this.activeState = this.router.activeState;
    this.setActiveLink();
  }

  setActiveLink() {
    this.removeActiveLinkClassFromMenuItems();
    document
      .querySelector(`[href="#${this.activeState}"]`)
      ?.classList.add(this.activeNavItemClassName);
  }

  removeActiveLinkClassFromMenuItems() {
    Array.from(
      this.navigationBarContainer.getElementsByClassName(this.activeNavItemClassName),
    ).forEach((elem) => elem.classList.remove(this.activeNavItemClassName));
  }
}
