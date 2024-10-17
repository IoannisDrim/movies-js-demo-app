import './loader.scss';

let instance;

class Loader {
  constructor() {
    if (instance) {
      throw new Error('New loader instance cannot be created!!');
    }

    instance = this;
    this.loader = this.createLoaderComponent();
    this.render();
  }

  render() {
    document.getElementsByTagName('body')[0].appendChild(this.loader);
  }

  showLoader() {
    this.loader.classList.remove('hidden');
  }

  hideLoader() {
    this.loader.classList.add('hidden');
  }

  createLoaderComponent() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.classList.add('hidden');
    return loader;
  }
}

let loaderInstance = Object.freeze(new Loader());
export default loaderInstance;
