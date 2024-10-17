/* Listens infiniteScroll util and fetches more data if triggered */
export const addFetchScrollContainerDataListener = (increaseMovieServicePage, searchMovies) => {
  const previousMovieSearchTerm = '';

  return () => {
    document.addEventListener('fetchScrollContainerData_searchMoviesPage', () => {
      increaseMovieServicePage();
      searchMovies(true, previousMovieSearchTerm);
    });
  };
};
