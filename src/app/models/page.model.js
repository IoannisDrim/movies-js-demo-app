export default class Page {
  constructor(controller, pageContainer) {
    this.Controller = controller;
    this.pageContainer = pageContainer;
    this.page = null;
  }

  load() {
    this.page = new this.Controller();
    return this.show();
  }

  show() {
    this.pageContainer.innerHTML = this.page.render();
    this.page.afterRender();
  }
}
