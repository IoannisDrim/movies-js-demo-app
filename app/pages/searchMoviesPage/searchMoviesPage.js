import ComponentLoader from '../../utils/componentLoader.js';
import MovieAPI from '../../services/movieApi.js';

let movieService = new MovieAPI;

class SearchMoviesPage extends ComponentLoader {

	constructor(appComponents) {
		super(appComponents, 'searchMoviesPage');
		this.term = '';
		this.data = [];
		this.loadComponents();
		this.loadComponentData(this.data);
		this.addInputChangeListener();
		this.addFetchScrollContainerDataListener();
	}

	/*Handles user's input*/
	addInputChangeListener() {
		document.getElementById('searchMovieInput').addEventListener('input', function(event){
			if ( event.target.value.length > 2 ) {
				this.term = event.target.value;
				this.searchMovies();
			}
			else {
				this.controller.clearContainer();
			}
		}.bind(this));
	}

	/*Listens infiniteScroll util and fetces more data if triggered*/
	addFetchScrollContainerDataListener() {
		document.addEventListener('fetchScrollContainerData_searchMoviesPage', function(event){
	    	this.searchMovies(event.detail.page, false);
	    }.bind(this));
	}

	/*Makes call to fetch movies from server and updates componen's data*/
	searchMovies(page = 1, newSearch = true) {
		document.getElementById("containerLoader").classList.remove("d-none");
		movieService.searchMovie(this.term, page)
			.then(function(success){
				if ( newSearch ) {
					this.controller.updateDataAndClearContainer(JSON.parse(success).results);
				}
				else {
					this.controller.updateData(JSON.parse(success).results);
				}
				document.getElementById("containerLoader").classList.add("d-none");
				
			}.bind(this), function(){
				document.getElementById("containerLoader").classList.add("d-none");
				document.getElementById("modal-error-msg").innerHTML = 'Could not fetch movies'
				$("#errorModal").modal();
			})
	}


}

export default SearchMoviesPage;