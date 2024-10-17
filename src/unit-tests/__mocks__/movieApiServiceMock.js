export default class MovieApiServiceMock {
  constructor(pass = true) {
    this.pass = pass;
    this.genres = ['drama', 'comedy'];
  }

  getMovieGenres() {
    return new Promise((resolve, reject) => {
      process.nextTick(() => (this.pass ? resolve(this.genres) : reject(new Error('error'))));
    });
  }
}
