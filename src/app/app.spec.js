import MovieRamaApp from './app';
import LocaleStorageMock from '../unit-tests/__mocks__/LocalStorageMock';
import MovieApiServiceMock from '../unit-tests/__mocks__/MovieApiServiceMock';

describe('MovieRamaApp', () => {
  let app = '';
  let loadContentSpy = '';

  beforeEach(() => {
    global.localStorage = new LocaleStorageMock();
    global.localStorage.clear();
    loadContentSpy = spyOn(MovieRamaApp.prototype, 'loadContent');
    loadContentSpy.and.callFake(() => { });
    app = new MovieRamaApp();
  });

  test('app should exist', () => {
    expect(app).toBeTruthy();
  });

  test('should call loadCommonUsedData correctly', () => {
    const fetchMovieGenres = jest.spyOn(app, 'fetchMovieGenres');
    app.loadCommonUsedData();
    expect(fetchMovieGenres).toHaveBeenCalledTimes(1);
  });

  test('should call loadContent correctly', () => {
    const renderSpy = spyOn(app.navigationBarComponent, 'render').and.callFake(() => '<span>test</span>');
    const afterRenderSpy = spyOn(app.navigationBarComponent, 'afterRender').and.callFake(() => { });
    loadContentSpy.and.callThrough();
    document.body.innerHTML = '<div>'
      + '  <header></header>'
      + '</div>';
    app.loadContent();
    expect(document.querySelector('header').innerHTML).toEqual('<span>test</span>');
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(afterRenderSpy).toHaveBeenCalledTimes(1);
  });

  test('should call fetchMovieGenres correctly - existing localeStorage item', () => {
    global.localStorage.setItem('movieGenres', '[drama, comedy]');
    const spy = spyOn(app.movieApiService, 'getMovieGenres');
    const actual = app.fetchMovieGenres();
    expect(actual).toEqual(undefined);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('should call fetchMovieGenres correctly - no existing localeStorage item', () => {
    // let mock = new MovieApiServiceMock();
    // let spy = spyOn(app.movieApiService, 'getMovieGenres').and.callFake(() => mock.getMovieGenres());
    // app.fetchMovieGenres();
    // expect(global.localStorage.getItem('movieGenres')).toEqual('[drama, comedy]');
  });
});
