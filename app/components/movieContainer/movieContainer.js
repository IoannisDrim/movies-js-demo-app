import InfiniteScroll from '../../utils/infiniteScroll.js';
import ComponentLoader from '../../utils/componentLoader.js';
import MovieCardComponent from '../movieCard/movieCard.js';

class MovieContainer extends InfiniteScroll {

	constructor(appComponents, caller, data = []) {
		let cID = "scroll-container";
		super(caller, cID);
		this.containerID = cID;
		this.data = data;
		this.movieCardComponent = new MovieCardComponent(cID);
		this.componentLoader = new ComponentLoader(appComponents);
		this.genresData = JSON.parse(localStorage.getItem('genres'));
		this.importMovieCardTemplate();
		this.addEventListener();
	}

	updateData(data) {
		this.data = data;
		this.updateView();
	}

	updateDataAndClearContainer(data) {
		this.data = data;
		this.clearContainer();
		this.updateView();
	}

	/*Emptys container*/
	clearContainer() {
		while (this.scrollContainer.firstChild) {
		    this.scrollContainer.removeChild(this.scrollContainer.firstChild);
		}
	}

	/*Replaces all component's placeholders with data fetched from server*/
	updateView() {
		let movies = this.data;
		let genres = [];
		let releaseDate = null;
		let averageVotePrecentage = 0;
		
		for (var i = 0; i < movies.length; i++) {

			genres = this.genresData.genres.filter(function(genre){
				return  movies[i].genre_ids.includes(genre.id); 
			})
			.map(function(genre){
				return genre.name;
			});

			releaseDate = new Date(movies[i].release_date);

			averageVotePrecentage = movies[i].vote_average * 10;

			let viewHtml = this.elementAsText;
			let listHTML = '';
			listHTML += viewHtml.replace(/{{title}}/g, movies[i].title)
								.replace(/{{overview}}/g, movies[i].overview)
								.replace(/{{poster_path}}/g, 'https://image.tmdb.org/t/p/w500/' + movies[i].poster_path)
								.replace(/{{genres}}/g, genres.join(', '))
								.replace(/{{vote_average}}/g, movies[i].vote_average)
								.replace(/{{style}}/g, 'style="width:'+ averageVotePrecentage + '%"' )
								.replace(/{{uniqueId}}/g, movies[i].id )
								.replace(/{{release_date}}/g, releaseDate.getFullYear() );
								

			this.scrollContainer.appendChild(document.createRange().createContextualFragment(listHTML).firstChild);
		}
	}	

	supplyMoreData(data) {
		this.scroll.fetchMoreData(data);
	}

	/*Fetches HTML of MovieCard component to fill container*/
	importMovieCardTemplate() {
		this.componentLoader.includeHTML('movieCard')
			.then(function(success){
				this.elementAsText = success
				this.updateView();
			}.bind(this), function(){

			})
	}

	/*Listens click event on "show more button"*/
	addEventListener() {
		document.getElementById(this.containerID).addEventListener('click', function(event) {
			if (  event.target.id.indexOf('showMoreBtn') >=0 ) {
				this.movieCardComponent.handleShowMoreButtonClick(event);			
			}
		}.bind(this));
	}

}

export default MovieContainer;