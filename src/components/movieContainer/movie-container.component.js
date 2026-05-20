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
    this.infiniteScrollUtil = undefined;
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

  showSkeletons() {
    const count = this.getCardsPerRow();
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-card';
      skeleton.setAttribute('aria-hidden', 'true');
      this.movieCardContainer.appendChild(skeleton);
    }
  }

  hideSkeletons() {
    this.movieCardContainer?.querySelectorAll('.skeleton-card').forEach((el) => el.remove());
  }

  getCardsPerRow() {
    const card = this.movieCardContainer.querySelector('.movie-card');
    if (!card) return 4;
    const style = getComputedStyle(card);
    const cardOuterWidth =
      card.getBoundingClientRect().width +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);
    return Math.max(1, Math.floor(this.movieCardContainer.clientWidth / cardOuterWidth));
  }

  updateMoviesView() {
    this.hideSkeletons();
    if (this.fetchedMovies.length) {
      this.movieCardContainer.contains(this.noResultsDiv) &&
        this.movieCardContainer.removeChild(this.noResultsDiv);

      const isFirstBatch = !this.movieCardContainer.querySelector('.movie-card');

      this.fetchedMovies.forEach((movieResponseDto, index) => {
        const movie = convertMovieResponseDtoToMovie(movieResponseDto);
        new MovieCard(movie, this.movieCardContainer, this.onShowMore.bind(this));

        if (isFirstBatch && index === 0) {
          const lcpImg = this.movieCardContainer.querySelector('.movie-card__image');
          if (lcpImg) {
            lcpImg.removeAttribute('loading');
            lcpImg.setAttribute('fetchpriority', 'high');
          }
        }

        const myIcon = new Image();
        myIcon.src = RateIcon;
        myIcon.width = 25;
        myIcon.height = 25;
        myIcon.alt = '';
        document.getElementById(`card_rate_${movieResponseDto.id}`)?.appendChild(myIcon);
      });
    } else {
      this.movieCardContainer.replaceChildren();
      this.movieCardContainer.appendChild(this.noResultsDiv);
    }
  }

  async onShowMore(movieCardId, movieTitle) {
    this.setShowMoreLoading(movieCardId, true);
    try {
      const [trailer, reviews, similar] = await Promise.all([
        this.movieService.getMovieTrailer(movieCardId).catch(() => null),
        this.movieService.getMovieReviews(movieCardId).catch(() => null),
        this.movieService.getSimilarMovies(movieCardId).catch(() => null),
      ]);
      this.modal.open(movieTitle, this.buildDetailsContent(trailer, reviews, similar));
    } catch {
      this.modal.open('Attention', 'An error occurred, we could not fetch movie details.');
    } finally {
      this.setShowMoreLoading(movieCardId, false);
    }
  }

  buildDetailsContent(trailer, reviews, similar) {
    const container = document.createElement('div');
    container.className = 'movie-details';
    container.appendChild(new MovieTrailer(trailer?.results?.[0]?.key ?? null).render());
    container.appendChild(new MovieReviews(reviews?.results ?? []).render());
    container.appendChild(new MovieSimilarMovies(similar?.results ?? []).render());
    return container;
  }

  setShowMoreLoading(movieCardId, isLoading) {
    const showMoreButton = document.getElementById(`showMoreButtonText_${movieCardId}`);
    const showMoreLoader = document.getElementById(`showMoreLoader_${movieCardId}`);
    showMoreLoader.classList.toggle('hidden');
    showMoreButton.style.visibility = isLoading ? 'hidden' : 'visible';
  }
}
