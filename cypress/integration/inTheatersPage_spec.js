describe('InTheaters page tests', function() {

  beforeEach(function() {
    cy.visit('/#');
  });

  it('Now in Theaters link should be set to active', function(){
    cy.get('a[href="#inTheaters"]').should('have.class', 'active-header-link');
  });

  it('Movies should be loaded', function() {
    cy.fixture('movie').as('movie');
    cy.server();
    cy.route('**/movie/now_playing*', '@movie').as('getMovies');
    cy.wait('@getMovies').then((xhr) => {
      if( xhr.status === 200 ) {
        cy.get('#scroll-container').should(($inTheaterMovies) => {
          expect($inTheaterMovies).to.have.length.above(0);
        });
      }
    })
  });

  /*FIXME: Should mock service to fail*/
  it('A modal displaying an error message should load if movies fail to load', function() {
    cy.fixture('movie').as('movie');
    cy.server();
    cy.route({
          method: 'GET',
          url: '**/movie/now_playing*',
          status: 404,
          response: {}
    }).as('getMovies');

    cy.wait('@getMovies').then((xhr) => {
      if( xhr.status !== 200 ) {
        cy.get('#scroll-container').should('be.empty');
        cy.get('#errorModalContent').should('be.visible');
        //cy.get('#errorModal').should('be.visible');
      }
    })
  });

  it('Trailer should be loaded when user clicks the "show more" button', function(){
    cy.fixture('movie_video').as('movie_video');
    cy.server();
    cy.route('**/movie/*/videos*','@movie_video').as('getVideos');
    cy.get('.showMoreBtn').first().click({force:true});
    cy.wait('@getVideos').then((xhr) => {
      cy.wait(500);
      cy.get('iframe').first().should("be.visible").should('have.attr', 'src', 'https://www.youtube.com/embed/' + this.movie_video.results[0].key);
      cy.get('span[id^="trailer-not-found_"]').should('be.hidden');
    })
  });

  it('Reviews should be loaded when user clicks the "show more" button', function(){
    cy.fixture('movie_review').as('movie_review');
    cy.server();
    cy.route('**/movie/*/reviews*','@movie_review').as('getReviews');
    cy.get('.showMoreBtn').first().click({force:true});
    cy.wait('@getReviews').then((xhr) => {
      cy.wait(500);
      cy.get('ul[id^="reviews-ul_"] > li').should('have.length', 2).first();
      cy.get('span[id^="reviews-not-found_"]').should('be.hidden');
    })
  });

  it('Similar movies should be loaded when user clicks the "show more" button', function(){
    cy.fixture('movie_similar').as('movie_similar');
    cy.server();
    cy.route('**/movie/*/similar*','@movie_similar').as('getSimilarMovies');
    cy.get('.showMoreBtn').first().click({force:true});
    cy.wait('@getSimilarMovies').then((xhr) => {
      cy.wait(500);
      cy.get('span[id^="similar-movies-span_"]').first().should("contain", this.movie_similar.results[0].title + ', ' + this.movie_similar.results[1].title);
      cy.get('span[id^="similar-movies-not-found_"]').should('be.hidden');
    })
  });

});
