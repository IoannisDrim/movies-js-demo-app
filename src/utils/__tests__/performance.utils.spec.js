import PerformanceUtils from '../performance.utils';

describe('PerformanceUtil', () => {
  const performanceUtils = new PerformanceUtils();

  it('should debounce correctly', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const debounceFunc = performanceUtils.debounce(mockFunc, 500);

    for (let i = 0; i < 100; i++) {
      debounceFunc();
    }

    jest.runAllTimers();

    expect(mockFunc).toBeCalledTimes(1);
  });

  it('should throttle correctly', () => {
    jest.useFakeTimers();
    const mockFunc = jest.fn();
    const throttleFunc = performanceUtils.throttle(mockFunc, 50);

    for (let i = 0; i < 100; i++) {
      throttleFunc();
    }

    jest.runAllTimers();

    expect(mockFunc).toBeCalledTimes(2);
  });
});
