export default class ServiceHelper {
  returnPromise(method, url) {
    return fetch(url, {method}).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    });
  }
}
