import * as modalTemplate from './modal.html';
import './modal.scss';

let instance;

class Modal {
  constructor() {
    if (instance) {
      throw new Error('New modal instance cannot be created!!');
    }

    instance = this;
    this.modal = modalTemplate;
    this.render();
  }

  render() {
    document.getElementsByTagName('body')[0].appendChild(this.createModalComponent());
    document.getElementById('modalCloseBtn').onclick = this.close.bind(this);
    document.getElementById('modal').classList.replace('modal--visible', 'hidden');
  }

  open(title, body) {
    document.getElementById('modal').classList.replace('hidden', 'modal--visible');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMsg').textContent = body;
  }

  close() {
    document.getElementById('modal').classList.replace('modal--visible', 'hidden');
  }

  createModalComponent() {
    const template = document.createElement('template');
    template.innerHTML = this.modal.default;
    return template.content.cloneNode(true);
  }
}

let modalInstance = Object.freeze(new Modal());
export default modalInstance;
