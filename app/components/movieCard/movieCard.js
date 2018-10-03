import MovieAPI from '../../services/movieApi.js';

class MovieCardComponent {

	constructor(containerID) {
		this.containerID = containerID;
		this.expandElement = '';
		this.movieService = new MovieAPI;
	}

	/*Dicides if additional data should be loaded or if component should collapse*/
	handleShowMoreButtonClick(event) {

		let id = event.target.id.slice(event.target.id.indexOf('_')+1);
		let elmnt = document.getElementById('moreInfo_'+ id);
		if ( document.getElementById('expand_'+ id).clientHeight ) {
			this.resetView(id);
			this.collapseExpandAnimation(id, event);
		}
		else {
			this.loadAdditionalData(id,elmnt,event);
		}
		
	}

	/*Clears data from previous load*/
	resetView(id) {
		document.getElementById('trailer-video_'+id).src = '';
		document.getElementById('trailer-not-found_'+id).innerHTML = '';
		while (document.getElementById('reviews-ul_'+id).firstChild) {
		    document.getElementById('reviews-ul_'+id).removeChild(document.getElementById('reviews-ul_'+id).firstChild);
		}
		document.getElementById('reviews-not-found_'+id).innerHTML = '';
		document.getElementById('similar-movies-span_'+id).textContent = '';
		document.getElementById('similar-movies-not-found_'+id).innerHTML = '';
	}

	/*Handles the animation of expandind and collapsing component*/
	collapseExpandAnimation(id, event) {
		var expandDiv = document.getElementById('expand_'+ id);
	    if (expandDiv.clientHeight) {
	    	expandDiv.style.height = 0;
	    	event.target.innerHTML = 'Show more <i id="fa-plus_' + id + '" class="fas fa-plus"></i>';
	    	document.getElementById(this.containerID).scrollTop -= expandDiv.clientHeight;
	    } else {
	    	event.target.innerHTML = 'Show less <i class="fas fa-minus"></i>';
      		var wrapper = document.querySelector('div[data-wrapper="measuringWrapper_'+ id +'"]');
      		expandDiv.style.height = wrapper.clientHeight/10 + 2 +"rem";
      		document.getElementById(this.containerID).scrollTop += wrapper.clientHeight;
	    }
	}

	/*Waits all calls to be completed in order to render data thtrough calling all relative functions*/
	loadAdditionalData(id,elmnt,event) {
		document.getElementById('fa-plus_'+ id).classList.add("extra-info-loader");
		let promises = [this.movieService.getMovieTrailer(id), this.movieService.getMovieReviews(id), this.movieService.getSimilarMovies(id)];
		Promise.all(promises.map((promise,i) =>
			promise.catch(err=>{
				err.index = i;
        		throw err;
			})
		)).then(values => {
			this.getMovieDetails(id,elmnt,event, values[0]);
			this.getReviews(id,values[1]);
			this.getSimilarMovies(id,values[2]);
			this.collapseExpandAnimation(id, event);
		},err =>{
			document.getElementById('fa-plus_'+ id).classList.remove("extra-info-loader");
			switch (err.index) {
				case 0:
					document.getElementById('trailer-video_'+id).setAttribute("class", "d-none");
					document.getElementById('trailer-not-found_'+id).innerHTML = 'No trailer found.';
				case 1:
					document.getElementById('reviews-not-found_'+id).innerHTML = 'No reviews found';
				case 2:
					document.getElementById('similar-movies-not-found_'+id).innerHTML = 'No similar movies found';
			}
		});
	}

	/*Shows trailer data*/
	getMovieDetails(id,elmnt,event, success) {
		let videos = JSON.parse(success);
		let key = '';

		videos.results.forEach(function(video){
			if ( video.type === 'Trailer' ) {
				key = video.key;
			}
		});

		if ( key ) {
			document.getElementById('trailer-video_'+id).src = 'https://www.youtube.com/embed/' + key;
		}
		else {
			document.getElementById('trailer-video_'+id).setAttribute("class", "d-none");
			document.getElementById('trailer-not-found_'+id).innerHTML = 'No trailer found.';
		}
	}

	/*Shows reviews data*/
	getReviews(id, success) {
		let reviews = JSON.parse(success);
		if ( reviews.results.length === 0 ) {
			document.getElementById('reviews-not-found_'+id).innerHTML = 'No reviews found';
			return;
		}
		for ( var i=0; i<2; i++ ) {
			var li = document.createElement("LI");
			var t = document.createTextNode(reviews.results[i].author + ' : ' + reviews.results[i].content);
			li.appendChild(t);
			document.getElementById('reviews-ul_'+id).appendChild(li);
		}
	}

	/*Shows similar movies data*/
	getSimilarMovies(id, success) {
		let similarMovies = JSON.parse(success);
		if ( !similarMovies.results.length ) {
			document.getElementById('similar-movies-not-found_'+id).innerHTML = 'No similar movies found';
			return;
		}
		let titles = [];
		similarMovies.results.forEach(function(movie){
			titles.push(movie.title);
		});
		document.getElementById('similar-movies-span_'+id).textContent = titles.join(', ');
	}

}

export default MovieCardComponent;