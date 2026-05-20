import MovieCardComponent from './movie-card.component';

const mockMovie = {
  id: 1,
  title: 'UnitTest',
  poster_path: '/test.jpg',
  vote_average: 8,
};

jest.mock(
  './movie-card.component.html',
  () =>
    '<div id="card_{{movie.id}}"><span id="title_{{movie.id}}">{{movie.title}}</span><button id="showMoreButton_{{movie.id}}"></button></div>',
);

describe('MovieCardComponent', () => {
  it('should render correctly', () => {
    const container = document.createElement('div');
    const movieCardComponent = new MovieCardComponent(mockMovie, container);
    expect(movieCardComponent.movieCardContainer).toBeTruthy();
    expect(movieCardComponent.movie).toEqual(mockMovie);
  });

  it('should render title via safe token replacement', () => {
    const container = document.createElement('div');
    new MovieCardComponent(mockMovie, container);
    expect(container.querySelector('#title_1').textContent).toBe('UnitTest');
  });

  it('should HTML-escape title to prevent injection', () => {
    const container = document.createElement('div');
    const xssMovie = {...mockMovie, title: '<script>alert(1)</script>'};
    new MovieCardComponent(xssMovie, container);
    expect(container.querySelector('#title_1').textContent).toBe('<script>alert(1)</script>');
    expect(container.innerHTML).not.toContain('<script>');
  });

  it('should pass title to the show-more callback', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const callback = jest.fn();
    new MovieCardComponent(mockMovie, container, callback);
    document.getElementById('showMoreButton_1').click();
    expect(callback).toHaveBeenCalledWith(1, 'UnitTest');
    document.body.removeChild(container);
  });
});
