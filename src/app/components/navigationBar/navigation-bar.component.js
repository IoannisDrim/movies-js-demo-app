import * as navigationBarTemplate from './navigation-bar.component.html';
import './navigation-bar.component.css';

export default class NavigationBarComponent {
  constructor(router) {
    this.router = router;
    this.activeNavItemClassName = 'active-header-link';
    this.activeState = '';
    this.navigationBarTemplate = navigationBarTemplate;
  }

  render() {
    return this.navigationBarTemplate;
  }

  afterRender() {
    this.navigationBarContainer = document.querySelector('#header-nav');
    this.activeState = this.router.activeState;
    this.setActiveLink();
    this.initOnNavigationItemClickedHandler();
  }

  setActiveLink() {
    document.querySelector(`[href="#${this.activeState}"]`).classList.add('active-header-link');
  }

  initOnNavigationItemClickedHandler() {
    this.navigationBarContainer.addEventListener('mouseup', (event) => {
      if (Object.values(event.target.classList).indexOf('menu-link') > -1) {
        Array.from(this.navigationBarContainer.getElementsByClassName(this.activeNavItemClassName))
          .forEach(elem => elem.classList.remove(this.activeNavItemClassName));
        event.target.classList.add(this.activeNavItemClassName);
      }
    });
  }
}
