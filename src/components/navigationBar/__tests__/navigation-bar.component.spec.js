import NavigationBarComponent from '../navigation-bar.component';

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
});
