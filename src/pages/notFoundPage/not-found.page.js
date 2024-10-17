import * as notFoundTemplate from './not-found.page.html';
import './not-found.page.scss';

export default class NotFoundPage {
  constructor() {
    this.notFoundPageTemplate = notFoundTemplate;
    this.publicAccesibleId = 'notFoundPage';
  }

  render() {
    return document.createRange().createContextualFragment(this.notFoundPageTemplate.default);
  }

  getPublicAccessibleId() {
    return this.publicAccesibleId;
  }
}
