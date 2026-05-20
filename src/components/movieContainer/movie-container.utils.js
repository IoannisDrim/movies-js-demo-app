export const convertMovieResponseDtoToMovie = (movieResponseDto, movieGenres) => {
  return {
    ...movieResponseDto,
    vote_average: Math.round(movieResponseDto.vote_average),
    genres: movieResponseDto.genre_ids.reduce((acc, id) => {
      const genre = movieGenres.find((g) => g.id === id);
      if (genre) acc.push(genre.name);
      return acc;
    }, []),
  };
};
