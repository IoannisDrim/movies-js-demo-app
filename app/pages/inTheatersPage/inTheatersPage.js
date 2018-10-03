import ComponentLoader from '../../utils/componentLoader.js';
import MovieAPI from '../../services/movieApi.js';

let movieService = new MovieAPI;

class InTheatersPage extends ComponentLoader {

	constructor(appComponents) {
		super(appComponents, 'inTheatersPage');
		this.controller = null;
		this.loadComponents();
		this.getInTheaterMovies();
		this.addFetchScrollContainerDataListener();
	}

	/*Fetches movies from server and updates componen's data*/
	getInTheaterMovies(pageLoaded = 1, firstCall = true) {
		document.getElementById("containerLoader").classList.remove("d-none");
		movieService.getNowPlaying(pageLoaded)
			.then(function(success){
				if ( firstCall ) {
					this.loadComponentData(JSON.parse(success).results);
				}
				else {
					this.controller.updateData(JSON.parse(success).results);
				}
				document.getElementById("containerLoader").classList.add("d-none");
			}.bind(this),function(error){
				console.log(error)
				document.getElementById("containerLoader").classList.add("d-none");
				document.getElementById("modal-error-msg").innerHTML = 'Could not fetch movies'
				$("#errorModal").modal();
			})
	}

	/*Listens infiniteScroll util and fetces more data if triggered*/
	addFetchScrollContainerDataListener() {
	    document.addEventListener('fetchScrollContainerData_inTheatersPage', function(event){
	    	this.getInTheaterMovies(event.detail.page, false);
	    }.bind(this), false);
	}

}

export default InTheatersPage;