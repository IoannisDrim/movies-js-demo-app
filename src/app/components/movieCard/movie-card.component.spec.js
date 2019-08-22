import MovieCardComponent from './movie-card.component';

describe('MovieCardComponent', () => {
  let movieCardComponent = '';
  const mockMovie = {
    data: {
      title: 'UnitTest',
      release_date: '10/10/2010'
    },
    genres: 'drama, comedy'
  };
  const mockTemplate = `${mockMovie.data.title} was released at ${mockMovie.data.release_date} with genres: ${mockMovie.genres}`;

  beforeEach(() => {
    movieCardComponent = new MovieCardComponent(mockMovie);
    movieCardComponent.movieCardTemplate = mockTemplate;
  });

  test('should exist', () => {
    expect(movieCardComponent).toBeTruthy();
    expect(movieCardComponent.movie).toEqual(mockMovie);
  });

  test('should render correctly', () => {
    const actual = movieCardComponent.render();
    expect(actual).toEqual('UnitTest was released at 10/10/2010 with genres: drama, comedy');
  });
});
