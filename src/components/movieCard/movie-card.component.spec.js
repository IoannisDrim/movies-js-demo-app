import MovieCardComponent from './movie-card.component';

const mockMovie = {
  title: 'UnitTest',
  release_date: '10/10/2010',
  genres: ['drama', 'comedy'],
};

jest.mock('./movie-card.component.html', () => {
  return '${movie.title} was released at ${movie.release_date} with genres: ${movie.genres.join(", ")}';
});

describe('MovieCardComponent', () => {
  it('should render correctly', () => {
    const movieCardComponent = new MovieCardComponent(mockMovie, document.createElement('div'));
    expect(movieCardComponent.movieCardContainer).toBeTruthy();
    expect(movieCardComponent.movie).toEqual(mockMovie);
  });

  it('should replace placeholders correctly', () => {
    const container = document.createElement('div');
    const movieCardComponent = new MovieCardComponent(mockMovie, container);

    expect(movieCardComponent.movieCardContainer.innerHTML).toEqual(
      'UnitTest was released at 10/10/2010 with genres: drama, comedy',
    );
  });
});
