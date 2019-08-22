import MovieCardComponent from '../movieCard/movie-card.component';
import InfiniteScrollUtil from '../../utils/infinite-scroll.util';
import MovieAPIService from '../../services/movie-api.service';
import PerformanceUtils from '../../utils/performance.utils';
import * as moviesContainerTemplate from './movie-container.component.html';
import './movie-container.component.css';

export default class MovieContainerComponent {
  constructor(parentId) {
    this.moviesContainerTemplate = moviesContainerTemplate;
    this.fetchedMovies = [];
    this.parentId = parentId;
    this.movieGenres = localStorage.getItem('movieGenres') ? JSON.parse(localStorage.getItem('movieGenres')) : [];
    this.movieService = new MovieAPIService();
    this.performanceUtils = new PerformanceUtils();
    // TODO: rethink
    this.resetDetailsDataInLocalStorage();
  }

  render() {
    return this.moviesContainerTemplate;
  }

  afterRender() {
    this.movieCardContainer = document.querySelector('#scroll-container');
    new InfiniteScrollUtil(this.parentId, this.movieCardContainer);
    this.addMovieCardClickOnShowMoreButtonEventListener();
  }

  set movies(newMovies) {
    this.fetchedMovies = newMovies;
    this.updateMoviesView();
  }

  get movies() {
    return this.fetchedMovies;
  }

  resetDetailsDataInLocalStorage() {
    Object.keys(window.localStorage).forEach((key) => {
      if (key.includes('movieDetails_')) {
        localStorage.removeItem(key);
      }
    });
  }

  updateMoviesView() {
    if (this.fetchedMovies.length) {
      // TODO: revisit
      const movieGenresReducer = (accumulator, currentValue) => {
        this.movieGenres.forEach((genre) => {
          if (genre.id === currentValue) {
            accumulator.push(genre.name);
          }
        });
        return accumulator;
      };

      const movieCardComponents = this.fetchedMovies.map((movie) => {
        const movieEntity = {
          data: movie,
          genres: movie.genre_ids.reduce(movieGenresReducer, []).join(', '),
          voteAverageStyle: `style="width:${movie.vote_average * 10}%"`
        };
        return new MovieCardComponent(movieEntity);
      });
      this.renderMovieCards(movieCardComponents);
    } else {
      while (this.movieCardContainer.firstChild) {
        this.movieCardContainer.removeChild(this.movieCardContainer.firstChild);
      }
    }
  }

  renderMovieCards(movieCardComponents) {
    movieCardComponents.forEach((movieCard) => {
      this.movieCardContainer.appendChild(document.createRange().createContextualFragment(movieCard.render()).firstChild);
    });
  }

  // /*Listens click event on "show more button"*/
  addMovieCardClickOnShowMoreButtonEventListener() {
    this.movieCardContainer.addEventListener('mouseup', this.performanceUtils.throttle((event) => {
      if (event.target.id.includes('toggleExpandBtn')) {
        const movieCardId = event.target.id.split('_')[1];
        if (event.target.innerHTML.includes('Show more') && !localStorage.getItem(`movieDetails_${movieCardId}`)) {
          this.loadAdditionalMovieData(movieCardId, event.target);
        } else {
          this.collapseExpandAnimation(movieCardId, event.target);
        }
      }
    }, 1000));
  }

  /* Waits all calls to be completed in order to render data through calling all relative functions */
  async loadAdditionalMovieData(movieCardId, clickedButton) {
    document.getElementById(`fa-loader_${movieCardId}`).classList.add('extra-info-loader');
    const promises = [
      await this.movieService.getMovieTrailer(movieCardId).catch(() => false),
      await this.movieService.getMovieReviews(movieCardId).catch(() => false),
      await this.movieService.getSimilarMovies(movieCardId).catch(() => false)
    ];
    Promise.all(promises)
      .then((values) => {
        this.setTrailerTemplate(values[0], movieCardId);
        this.setReviewsTemplate(values[1], movieCardId);
        this.setSimilarMoviesTemplate(values[2], movieCardId);
        this.collapseExpandAnimation(movieCardId, clickedButton);
        localStorage.setItem(`movieDetails_${movieCardId}`, true);
      })
      .catch(() => {
        // console.log('error', error);
      });
  }

  setTrailerTemplate(trailers, movieCardId) {
    const trailerTemplate = document.importNode(document.getElementById('trailer_template'), true);
    if (trailers && trailers.results.length) {
      trailerTemplate.content.querySelector('iframe').src = `https://www.youtube.com/embed/${trailers.results[0].key}`;
    } else {
      trailerTemplate.content.getElementById('trailer-not-found').textContent = 'No trailer found.';
      trailerTemplate.content.querySelector('iframe').setAttribute('class', 'd-none');
    }
    document.getElementById(`trailer_${movieCardId}`).appendChild(trailerTemplate.content);
  }

  setReviewsTemplate(reviews, movieCardId) {
    const reviewsTemplate = document.importNode(document.getElementById('reviews_template'), true);
    if (reviews && reviews.results.length) {
      const reviewsContainer = reviewsTemplate.content.getElementById('reviews-div');
      reviews.results.forEach((review) => {
        const div = document.createElement('DIV');
        div.className = 'review-div';
        const spanAuth = document.createElement('SPAN');
        spanAuth.textContent = `${review.author} : `;
        spanAuth.className = 'review-div-auth';
        const spanCont = document.createElement('SPAN');
        spanCont.textContent = `${review.content}`;
        spanCont.className = 'review-div-content';
        div.appendChild(spanAuth);
        div.appendChild(spanCont);
        reviewsContainer.appendChild(div);
      });
    } else {
      reviewsTemplate.content.getElementById('reviews-not-found').textContent = 'No reviews found';
    }
    document.getElementById(`reviews_${movieCardId}`).appendChild(reviewsTemplate.content);
  }

  setSimilarMoviesTemplate(similarMovies, movieCardId) {
    const similarMoviesTemplate = document.importNode(document.getElementById('similar_movies_template'), true);
    let similarMoviesString = 'No similar movies found';
    if (similarMovies.results.length) {
      similarMoviesString = similarMovies.results.map(similarMovie => similarMovie.title).join(', ');
    }
    similarMoviesTemplate.content.getElementById('similar-movies-span').textContent = similarMoviesString;
    document.getElementById(`similar_movies_${movieCardId}`).appendChild(similarMoviesTemplate.content);
  }

  /* Handles the animation of expanding and collapsing component */
  collapseExpandAnimation(movieCardId, clickedButton) {
    const wrapper = document.querySelector(`div[data-wrapper="measuringWrapper_${movieCardId}"]`);
    const movieCardExpandDiv = document.getElementById(`expand_${movieCardId}`);
    if (!movieCardExpandDiv.classList.contains('d-none')) {
      movieCardExpandDiv.classList.add('d-none');
      clickedButton.innerHTML = `Show more <i id="fa-loader_${movieCardId}" class="fas fa-plus"></i>`;
      document.getElementById(`card_${movieCardId}`).scrollIntoView({ behavior: 'smooth' });
    } else {
      movieCardExpandDiv.classList.remove('d-none');
      clickedButton.innerHTML = `Show less <i id="fa-loader_${movieCardId}" class="fas fa-minus"></i>`;
      this.movieCardContainer.scrollTop += wrapper.clientHeight;
    }
  }
}
