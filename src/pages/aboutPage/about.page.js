import * as aboutTemplate from './about.page.html';
import './about.page.scss';

export default class AboutPage {
  constructor() {
    this.aboutTemplate = aboutTemplate;
    this.publicAccesibleId = 'aboutPage';
  }

  render() {
    return document.createRange().createContextualFragment(this.aboutTemplate.default);
  }

  getPublicAccessibleId() {
    return this.publicAccesibleId;
  }
}
