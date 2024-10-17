import * as reviewTemplate from './movie-reviews.component.html';

export default class MovieReviews {
  constructor(reviews, movieCardId) {
    this.reviews = reviews;
    this.movieCardId = movieCardId;
    this.reviewTemplate = reviewTemplate;
    this.reviewsWrapper = document.getElementById(`reviews_${this.movieCardId}`);
  }

  mount() {
    const reviewComponent = document
      .createRange()
      .createContextualFragment(this.reviewTemplate.default);
    this.reviewsWrapper.appendChild(reviewComponent);
    this.afterMount();
  }

  afterMount() {
    this.setReviews();
  }

  setReviews() {
    if (this.reviews?.length) {
      this.reviews.forEach((review) => {
        const reviewSection = document.createElement('div');
        const reviewAuthorSpan = document.createElement('span');
        const reviewBodySpan = document.createElement('span');

        reviewSection.className = 'scroll-container__review-div';
        reviewAuthorSpan.textContent = `${review.author} : `;
        reviewAuthorSpan.className = 'scroll-container__review-div__auth';
        reviewBodySpan.textContent = `${review.content}`;
        reviewBodySpan.className = 'scroll-container__review-div__content';

        reviewSection.appendChild(reviewAuthorSpan);
        reviewSection.appendChild(reviewBodySpan);
        this.reviewsWrapper.querySelector('#reviewsDiv').appendChild(reviewSection);
      });
    } else {
      this.reviewsWrapper.querySelector('#reviewsNotFound').textContent = 'No reviews found';
    }
  }
}
