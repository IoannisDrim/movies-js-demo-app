import MovieCardComponent from './movie-card.component';

const mockMovie = {
  id: 1,
  title: 'UnitTest',
  release_date: '10/10/2010',
  genres: ['drama', 'comedy'],
  poster_path: '/test.jpg',
  vote_average: 8,
  overview: 'Test overview',
};

jest.mock(
  './movie-card.component.html',
  () =>
    '<div id="card_{{movie.id}}"><span id="title_{{movie.id}}">{{movie.title}}</span><div id="genres_{{movie.id}}"></div></div>',
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

  it('should render genre chips as DOM nodes', () => {
    const container = document.createElement('div');
    new MovieCardComponent(mockMovie, container);
    const chips = container.querySelectorAll('.chip');
    expect(chips).toHaveLength(2);
    expect(chips[0].textContent).toBe('drama');
    expect(chips[1].textContent).toBe('comedy');
  });

  it('should HTML-escape title to prevent injection', () => {
    const container = document.createElement('div');
    const xssMovie = {...mockMovie, title: '<script>alert(1)</script>'};
    new MovieCardComponent(xssMovie, container);
    expect(container.querySelector('#title_1').textContent).toBe('<script>alert(1)</script>');
    expect(container.innerHTML).not.toContain('<script>');
  });
});
