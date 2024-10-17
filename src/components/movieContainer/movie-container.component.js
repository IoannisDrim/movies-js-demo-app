import {InfiniteScrollUtil} from '../../utils';
import {MovieCard, Modal} from '../../components';
import {MovieAPIService} from '../../services';
import {RateIcon} from '../../assets';
import {MovieTrailer, MovieReviews, MovieSimilarMovies} from './components';
import {convertMovieResponseDtoToMovie} from './movie-container.utils';
import * as moviesContainerTemplate from './movie-container.component.html';
import './movie-container.component.scss';

export default class MovieContainerComponent {
  constructor(parentId) {
    this.movieService = new MovieAPIService();
    this.modal = Modal;
    this.moviesContainerTemplate = moviesContainerTemplate;
    this.fetchedMovies = [];
    this.parentId = parentId;
    this.movieGenres = localStorage.getItem('movieGenres')
      ? JSON.parse(localStorage.getItem('movieGenres'))
      : [];
    this.infiniteScrollUtil = undefined;
    this.resetDetailsDataInLocalStorage();
    this.setNoResultsSection();
  }

  set movies(newMovies) {
    this.fetchedMovies = newMovies;
    this.updateMoviesView();
  }

  render() {
    return document.createRange().createContextualFragment(this.moviesContainerTemplate.default);
  }

  unmount() {
    this.infiniteScrollUtil.removeScrollEventListener();
  }

  afterRender() {
    this.movieCardContainer = document.querySelector('#scrollContainer');
    this.infiniteScrollUtil = new InfiniteScrollUtil(this.parentId, this.movieCardContainer);
    this.updateMoviesView();
  }

  setNoResultsSection() {
    this.noResultsDiv = document.createElement('div');
    this.noResultsDiv.classList.add('scroll-container__no-results-section');
    this.noResultsDiv.textContent = 'No movies loaded yet...';
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
      this.movieCardContainer.contains(this.noResultsDiv) &&
        this.movieCardContainer.removeChild(this.noResultsDiv);
      this.fetchedMovies.forEach((movieResponseDto) => {
        const movie = convertMovieResponseDtoToMovie(movieResponseDto, this.movieGenres);
        new MovieCard(movie, this.movieCardContainer, this.onShowMore.bind(this));

        const myIcon = new Image();
        myIcon.src = RateIcon;
        myIcon.width = 25;
        document.getElementById(`card_rate_${movieResponseDto.id}`)?.appendChild(myIcon);
      });
    } else {
      this.movieCardContainer.replaceChildren();
      this.movieCardContainer.appendChild(this.noResultsDiv);
    }
  }

  async onShowMore(movieCardId) {
    if (!localStorage.getItem(`movieDetails_${movieCardId}`)) {
      await this.loadAdditionalMovieData(movieCardId);
      return;
    }

    this.toggleCardExpansion(movieCardId);
  }

  /* Waits all calls to be completed in order to render data through calling all relative functions */
  async loadAdditionalMovieData(movieCardId) {
    this.setShowMoreLoading(movieCardId, true);
    const fetchExtraInfoRequests = [
      await this.movieService.getMovieTrailer(movieCardId).catch(() => false),
      await this.movieService.getMovieReviews(movieCardId).catch(() => false),
      await this.movieService.getSimilarMovies(movieCardId).catch(() => false),
    ];
    Promise.all(fetchExtraInfoRequests)
      .then((values) => {
        this.setTrailerTemplate(values[0], movieCardId);
        this.setReviewsTemplate(values[1], movieCardId);
        this.setSimilarMoviesTemplate(values[2], movieCardId);
        this.toggleCardExpansion(movieCardId);
        localStorage.setItem(`movieDetails_${movieCardId}`, 'true');
      })
      .catch(() => {
        this.modal.open(
          'Attention',
          'An error occurred, we could not fetch movie details. Please try again later',
        );
      })
      .finally(() => {
        this.setShowMoreLoading(movieCardId, false);
      });
  }

  setShowMoreLoading(movieCardId, isLoading) {
    const showMoreButton = document.getElementById(`showMoreButtonText_${movieCardId}`);
    const showMoreLoader = document.getElementById(`showMoreLoader_${movieCardId}`);
    showMoreLoader.classList.toggle('hidden');
    showMoreButton.style.visibility = isLoading ? 'hidden' : 'visible';
  }

  setTrailerTemplate(trailers, movieCardId) {
    new MovieTrailer(trailers.results[0].key, movieCardId).mount();
  }

  setReviewsTemplate(reviews, movieCardId) {
    new MovieReviews(reviews.results, movieCardId).mount();
  }

  setSimilarMoviesTemplate(similarMovies, movieCardId) {
    new MovieSimilarMovies(similarMovies.results, movieCardId).mount();
  }

  /* Handles the animation of expanding and collapsing component */
  toggleCardExpansion(movieCardId) {
    const movieCardExpandDiv = document.getElementById(`expand_${movieCardId}`);
    const shouldExpand = movieCardExpandDiv.classList.contains('hidden');

    movieCardExpandDiv.classList.toggle('hidden');
    document
      .getElementById(`cardOverview_${movieCardId}`)
      .classList.toggle('card__overview--expanded');
    document.getElementById(`cardFooter_${movieCardId}`).classList.toggle('card__footer--expanded');
    document.getElementById(`showMoreButtonText_${movieCardId}`).textContent = shouldExpand
      ? 'Show less'
      : 'Show more';
    shouldExpand
      ? (this.movieCardContainer.scrollTop += document.querySelector(
          `div[data-wrapper="measuringWrapper_${movieCardId}"]`,
        ).clientHeight)
      : document.getElementById(`card_${movieCardId}`).scrollIntoView({behavior: 'smooth'});
  }
}
