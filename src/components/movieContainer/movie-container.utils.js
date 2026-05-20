export const convertMovieResponseDtoToMovie = (movieResponseDto) => ({
  ...movieResponseDto,
  vote_average: Math.round(movieResponseDto.vote_average),
});
