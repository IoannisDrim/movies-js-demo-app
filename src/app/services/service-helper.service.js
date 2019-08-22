export default class ServiceHelper {
  constructor() {
    this.xhr = new XMLHttpRequest();
    this.xhr.responseType = 'json';
  }

  returnPromise(RESTMethod, serviceURL) {
    return new Promise((resolve, reject) => {
      this.xhr.open(RESTMethod, serviceURL);
      this.xhr.onload = () => resolve(this.xhr.status === 200 ? this.xhr.response : reject(this.xhr.statusText));
      this.xhr.onerror = () => reject(this.xhr.statusText);
      this.xhr.send();
    });
  }
}
