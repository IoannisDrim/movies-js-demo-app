import {Router} from '../index';

window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    hash: '',
    writable: true,
  },
  writable: true,
});

Object.defineProperty(window, 'history', {
  value: {
    replaceState: (_, __, hash) => (window.location.hash = hash),
  },
  writable: true,
});

describe('RouterUtil', () => {
  const pages = {
    'in-theaters': {
      init: jest.fn(),
      unmount: jest.fn(),
    },
    page2: {
      init: jest.fn(),
      unmount: jest.fn(),
    },
    'not-found': {
      init: jest.fn(),
      unmount: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.location.hash = '';
  });

  it('should set active state correctly', () => {
    const router = new Router(pages, 'in-theaters');
    router.activeState = 'page1';
    expect(router.appActiveState).toBe('page1');
  });

  it('should load the initial state when no hash is present', () => {
    const router = new Router(pages, 'in-theaters');
    router.enableRouter();
    expect(window.location.hash).toBe('#in-theaters');
  });

  it('should load the correct page when url changes', () => {
    const router = new Router(pages, 'in-theaters');
    router.enableRouter();
    window.location.hash = '#page2';
    router.hashChanged();
    expect(pages['in-theaters'].unmount).toHaveBeenCalled();
    expect(pages['page2'].init).toHaveBeenCalled();
    expect(router.activeState).toBe('page2');
  });

  it('should load not found page if wrong url is entered', () => {
    const router = new Router(pages, 'in-theaters');
    router.enableRouter();
    window.location.hash = '#whatever';
    router.hashChanged();
    expect(pages['not-found'].init).toHaveBeenCalled();
    expect(router.activeState).toBe('whatever');
  });
});
