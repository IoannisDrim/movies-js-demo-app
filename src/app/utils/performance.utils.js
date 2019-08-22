export default class PerformanceUtils {
  debounce(func, delay, shouldCancelDebounceFunc) {
    let inDebounce;
    // eslint-disable-next-line func-names
    return function () {
      const context = this;
      const args = arguments;
      if (shouldCancelDebounceFunc(args)) {
        func.apply(context, args);
        return;
      }
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }

  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    // eslint-disable-next-line func-names
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
}
