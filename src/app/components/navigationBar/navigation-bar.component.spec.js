import NavigationBarComponent from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let navigationBarComponent = '';
  let setActiveLinkSpy = '';
  let initOnNavigationItemClickedHandlerSpy = '';
  const mockRouter = {
    activeState: '#in-theaters'
  };

  beforeEach(() => {
    setActiveLinkSpy = spyOn(NavigationBarComponent.prototype, 'setActiveLink');
    initOnNavigationItemClickedHandlerSpy = spyOn(NavigationBarComponent.prototype, 'initOnNavigationItemClickedHandler');
    setActiveLinkSpy.and.callFake(() => { });
    initOnNavigationItemClickedHandlerSpy.and.callFake(() => { });
    navigationBarComponent = new NavigationBarComponent(document.createElement('div'), mockRouter);
  });

  test('should exist', () => {
    expect(navigationBarComponent).toBeTruthy();
  });

  test('should render correctly', () => {
    navigationBarComponent.navigationBarTemplate = '<span>Test</span>';
    const actual = navigationBarComponent.render();
    expect(actual).toEqual('<span>Test</span>');
  });

  test('should afterRender correctly', () => {
    document.body.innerHTML = '<nav id="header-nav">Test</nav>';
    navigationBarComponent.afterRender();
    const expectedElement = document.createElement('nav');
    expectedElement.setAttribute('id', 'header-nav');
    expectedElement.innerHTML = 'Test';
    expect(navigationBarComponent.navigationBarContainer).toEqual(expectedElement);
    expect(initOnNavigationItemClickedHandlerSpy).toHaveBeenCalledTimes(1);
    expect(setActiveLinkSpy).toHaveBeenCalledTimes(1);
  });

  test('should setActiveLink correctly', () => {
    document.body.innerHTML = '<div>'
      + '  <a href="#in-theaters" class="menu-link">Now in Theaters</a>'
      + '</div>';
    navigationBarComponent.activeState = 'in-theaters';
    setActiveLinkSpy.and.callThrough();
    navigationBarComponent.setActiveLink();
  });

  test('should initOnNavigationItemClickedHandler correctly', () => {
    initOnNavigationItemClickedHandlerSpy.and.callThrough();
    navigationBarComponent.navigationBarContainer = document.createElement('nav');
    navigationBarComponent.navigationBarContainer.innerHTML = '  <a href="#in-theaters" class="menu-link active-header-link">Now in Theaters</a>'
      + '  <a href="#search-movies" class="menu-link">Now in Theaters</a>';
    navigationBarComponent.activeNavItemClassName = 'active-header-link';
    navigationBarComponent.initOnNavigationItemClickedHandler();
    navigationBarComponent.navigationBarContainer.querySelector('[href="#search-movies"]').dispatchEvent(new Event('mouseup', { bubbles: true, cancelable: false }));
    expect(navigationBarComponent.navigationBarContainer.querySelector('[href="#in-theaters"]').classList.contains('active-header-link')).toBeFalsy();
    expect(navigationBarComponent.navigationBarContainer.querySelector('[href="#search-movies"]').classList.contains('active-header-link')).toBeTruthy();
  });
});
