export default class Page {
  constructor(controller, pageContainer) {
    this.controller = controller;
    this.pageContainer = pageContainer;
    this.component = null;
  }

  init() {
    this.component = new this.controller();
    return this.mount();
  }

  mount() {
    this.pageContainer.appendChild(this.component.render());
    this.component.afterRender && this.component.afterRender();
  }

  unmount() {
    if (!this.component) return;

    this.component.unmount && this.component.unmount();
    this.pageContainer.removeChild(document.getElementById(this.component.getPublicAccessibleId()));
  }
}
