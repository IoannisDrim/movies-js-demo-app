import MovieContainer from './components/movieContainer/movieContainer.js';
import MovieCard from './components/movieCard/movieCard.js';
import MovieAPI from './services/movieApi.js';
import Router from './utils/router.js';
import Page from './models/Page.js';
import InTheatersPage from './pages/inTheatersPage/inTheatersPage.js'
import SearchMoviesPage from './pages/searchMoviesPage/searchMoviesPage.js'

const movieRamaApp = function() {

	const movieService = new MovieAPI;
	const appComponents = {
		movieContainer : {
			html: '/components/movieContainer/movieContainer.html',
			ctrl: MovieContainer
		},
		movieCard: {
			html: '/components/movieCard/movieCard.html',
			ctrl: MovieCard
		}
	}

	this.init = function(){
		this.loadPrerequests();
		this.initNavBar();
		this.initRouter();
	}

	/*Initiallizes application router*/
	this.initRouter = function() {
		new Router(
			{
				inTheaters: new Page('./pages/inTheatersPage/inTheatersPage.html', InTheatersPage, appComponents),
				searchMovies: new Page('./pages/searchMoviesPage/searchMoviesPage.html', SearchMoviesPage, appComponents ),
				'#': new Page('./pages/inTheatersPage/inTheatersPage.html', InTheatersPage, appComponents),
			},
			document.querySelector('main')
		);
	}

	this.loadPrerequests = function() {
		this.getGenres();
	}

	/*Fetches Genres from server.If gernes are fetced once then they are saved in local storage and service is not called again*/
	this.getGenres = function() {

		if ( localStorage.getItem('genres') ) {
			return;
		}

		movieService.getGenres()
			.then(function(success){
				localStorage.setItem('genres', success);
			}, function(){
				document.getElementById("modal-error-msg").innerHTML = 'Could not fetch genres'
				$("#myModal").modal();
			});
	}

	/*Finds the page loaded and sets active the relevant link. Is used for page refresh*/
	this.initNavBar = function () {
		if ( window.location.hash.length ) {
			document.querySelector('[href="' + window.location.hash + '"]').classList.add('active-header-link');
		}
		else {
			document.querySelector('[href="#inTheaters"]').classList.add('active-header-link');
		}
		this.addNavBarEventHandler();
	}

	/*Marks as active the link that user clicked*/
	this.addNavBarEventHandler = function() {
		document.getElementById('header-nav').addEventListener('click', function(event){
			if ( event.target.className === 'menu-link' ) {
				var current = document.getElementsByClassName('active-header-link');
				for ( var i=0; i<current.length; i++ ) {
					current[i].classList.remove('active-header-link');
				}
		    	event.target.classList.add('active-header-link');
			}
		});
	}
	
}

window.onload = new movieRamaApp().init();