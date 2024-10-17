import NavigationBarComponent from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let router = {
    activeState: 'in-theaters',
  };

  it('should render correctly', async () => {
    const navigationBarComponent = new NavigationBarComponent(router);
    document.body.appendChild(navigationBarComponent.render());
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('should set active link correctly', () => {
    const navigationBarComponent = new NavigationBarComponent(router);
    document.body.appendChild(navigationBarComponent.render());
    navigationBarComponent.afterRender();
    expect(document.querySelector('.active-header-link').getAttribute('href')).toBe('#in-theaters');
    navigationBarComponent.unmount();
  });

  it('should set active link correctly', () => {
    const navigationBarComponent = new NavigationBarComponent(router);
    document.body.appendChild(navigationBarComponent.render());
    navigationBarComponent.afterRender();
    expect(document.querySelector('.active-header-link').getAttribute('href')).toBe('#in-theaters');
    navigationBarComponent.unmount();
  });

  it('should change active link on url changes', () => {
    const navigationBarComponent = new NavigationBarComponent(router);
    document.body.appendChild(navigationBarComponent.render());
    navigationBarComponent.afterRender();

    navigationBarComponent.router.activeState = 'search-movies';
    window.dispatchEvent(new Event('hashchange'));

    expect(document.querySelector('.active-header-link').getAttribute('href')).toBe(
      '#search-movies',
    );
    navigationBarComponent.unmount();
  });

  // describe('render', () => {
  //   it('should return a document fragment', () => {
  //     const fragment = navigationBarComponent.render();
  //     expect(fragment).toBeInstanceOf(DocumentFragment);
  //   });
  // });
  //
  // describe('afterRender', () => {
  //   beforeEach(() => {
  //     document.body.innerHTML = '<div id="headerNav"></div><div id="logo"></div>';
  //   });
  //
  //   it('should set the navigationBarContainer', () => {
  //     navigationBarComponent.afterRender();
  //     expect(navigationBarComponent.navigationBarContainer).toBeDefined();
  //   });
  //
  //   it('should set the activeState', () => {
  //     navigationBarComponent.afterRender();
  //     expect(navigationBarComponent.activeState).toBe(router.activeState);
  //   });
  //
  //   it('should call setActiveLink', () => {
  //     const setActiveLinkSpy = jest.spyOn(navigationBarComponent, 'setActiveLink');
  //     navigationBarComponent.afterRender();
  //     expect(setActiveLinkSpy).toHaveBeenCalledTimes(1);
  //   });
  //
  //   it('should call initiateLocationChangedListener', () => {
  //     const initiateLocationChangedListenerSpy = jest.spyOn(navigationBarComponent, 'initiateLocationChangedListener');
  //     navigationBarComponent.afterRender();
  //     expect(initiateLocationChangedListenerSpy).toHaveBeenCalledTimes(1);
  //   });
  //
  //   it('should append the CameraIcon to the logo element', () => {
  //     navigationBarComponent.afterRender();
  //     const logoElement = document.getElementById('logo');
  //     expect(logoElement.children.length).toBe(1);
  //   });
  // });
  //
  // describe('initiateLocationChangedListener', () => {
  //   it('should add a hashchange event listener', () => {
  //     const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  //     navigationBarComponent.initiateLocationChangedListener();
  //     expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  //     expect(addEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
  //   });
  // });
});
