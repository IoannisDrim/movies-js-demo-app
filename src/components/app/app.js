import {Router} from '../../utils';
import {InTheatersPage, AboutPage, NotFoundPage} from '../../pages';
import {Modal, Page, NavigationBar} from '../index';

export default class MovieRamaApp {
  constructor() {
    this.mainPageContainer = document.querySelector('main');
    this.appRouter = new Router(
      {
        'in-theaters': new Page(InTheatersPage, this.mainPageContainer),
        about: new Page(AboutPage, this.mainPageContainer),
        'not-found': new Page(NotFoundPage, this.mainPageContainer),
      },
      'in-theaters',
    );
    this.navigationBarComponent = new NavigationBar(this.appRouter);
    this.modal = Modal;
    this.loadContent();
  }

  loadContent() {
    this.appRouter.enableRouter();
    document.querySelector('header').appendChild(this.navigationBarComponent.render());
    this.navigationBarComponent.afterRender();
  }
}
