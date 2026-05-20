import * as modalTemplate from './modal.html';
import './modal.scss';

let instance;
let previousFocus = null;
let trapFocusHandler = null;

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

  open(title, content) {
    const body = document.getElementById('modalBody');
    body.replaceChildren();

    if (typeof content === 'string') {
      const p = document.createElement('p');
      p.className = 'modal__container__body__msg';
      p.textContent = content;
      body.appendChild(p);
    } else {
      body.appendChild(content);
    }

    previousFocus = document.activeElement;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modal').classList.replace('hidden', 'modal--visible');
    document.getElementById('modalCloseBtn').focus();
    trapFocusHandler = this._trapFocus.bind(this);
    document.addEventListener('keydown', trapFocusHandler);
  }

  close() {
    document.getElementById('modal').classList.replace('modal--visible', 'hidden');
    document.removeEventListener('keydown', trapFocusHandler);
    trapFocusHandler = null;
    previousFocus?.focus();
    previousFocus = null;
  }

  _trapFocus(e) {
    const modal = document.getElementById('modal');
    const focusable = Array.from(
      modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])'),
    ).filter((el) => !el.disabled);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    } else if (e.key === 'Escape') {
      this.close();
    }
  }

  createModalComponent() {
    const template = document.createElement('template');
    template.innerHTML = this.modal.default;
    return template.content.cloneNode(true);
  }
}

let modalInstance = Object.freeze(new Modal());
export default modalInstance;
