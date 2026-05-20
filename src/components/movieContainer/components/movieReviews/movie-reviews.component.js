export default class MovieReviews {
  constructor(reviews) {
    this.reviews = reviews;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'movie-details__reviews';

    const heading = document.createElement('h5');
    heading.textContent = 'Reviews';
    wrapper.appendChild(heading);

    if (this.reviews.length) {
      this.reviews.forEach((review) => {
        const item = document.createElement('div');
        item.className = 'movie-details__review';

        const author = document.createElement('span');
        author.className = 'movie-details__review-author';
        author.textContent = `${review.author}: `;

        const content = document.createElement('span');
        content.className = 'movie-details__review-content';
        content.textContent = review.content;

        item.appendChild(author);
        item.appendChild(content);
        wrapper.appendChild(item);
      });
    } else {
      const msg = document.createElement('p');
      msg.textContent = 'No reviews found.';
      wrapper.appendChild(msg);
    }

    return wrapper;
  }
}
