import {CameraIcon} from '../../assets';
import * as navigationBarTemplate from './navigation-bar.component.html';
import './navigation-bar.component.scss';

export default class NavigationBarComponent {
  constructor(router) {
    this.router = router;
    this.activeNavItemClassName = 'active-header-link';
    this.activeState = '';
    this.navigationBarTemplate = navigationBarTemplate;
  }

  render() {
    return document.createRange().createContextualFragment(this.navigationBarTemplate.default);
  }

  afterRender() {
    this.navigationBarContainer = document.querySelector('#headerNav');
    this.activeState = this.router.activeState;
    this.setActiveLink();
    this.initiateLocationChangedListener();

    const myIcon = new Image();
    myIcon.src = CameraIcon;
    myIcon.width = 40;

    document.getElementById('logo').appendChild(myIcon);
  }

  initiateLocationChangedListener() {
    addEventListener('hashchange', () => {
      this.activeState = this.router.activeState;
      this.setActiveLink();
    });
  }

  setActiveLink() {
    this.removeActiveLinkClassFromMenuItems();
    document
      .querySelector(`[href="#${this.activeState}"]`)
      .classList.add(this.activeNavItemClassName);
  }

  removeActiveLinkClassFromMenuItems() {
    Array.from(
      this.navigationBarContainer.getElementsByClassName(this.activeNavItemClassName),
    ).forEach((elem) => elem.classList.remove(this.activeNavItemClassName));
  }
}
