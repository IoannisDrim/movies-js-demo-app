export const convertMovieResponseDtoToMovie = (movieResponseDto, movieGenres) => {
  const movieGenresReducer = (accumulator, currentValue) => {
    const genre = movieGenres.find((genre) => genre.id === currentValue);
    if (genre?.id === currentValue) accumulator.push(`<div class="chip">${genre.name}</div>`);
    return accumulator;
  };

  return {
    ...movieResponseDto,
    vote_average: Math.round(movieResponseDto.vote_average),
    genres: movieResponseDto.genre_ids.reduce(movieGenresReducer, []),
  };
};
