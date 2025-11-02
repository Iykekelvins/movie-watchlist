const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mainEl = document.querySelector('main');

let movies = [];
let watchlist = [];

function toggleWatchlist(imdbID) {
	const movie = movies.find((movie) => movie.imdbID === imdbID);
	const findMovie = watchlist.find((item) => item.imdbID === movie.imdbID);

	if (findMovie) {
		watchlist = watchlist.filter((item) => item.imdbID !== imdbID);
	} else {
		watchlist.unshift(movie);
	}

	localStorage.setItem('movie-watchlist', JSON.stringify(watchlist));

	renderMovieList();
}

function renderMovieList() {
	const movieList = document.createElement('ul');
	movieList.classList.add('container', 'movie-list');

	movieList.innerHTML = movieList.innerHTML = movies
		.map((movie) => {
			const findMovie = watchlist.find((item) => item.imdbID === movie.imdbID);

			return `
      <li class="movie">
					<div class="movie-top">
            <img src="${movie.Poster}" alt="${movie.Title} Poster" />
					  <h2>${movie.Title}</h2>
          </div>
					<button
            data-imdbid = "${movie.imdbID}"
              >
              ${
								!findMovie
									? `<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z"
										fill="#111827" />
								</svg>`
									: `
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5 7C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H11C11.5523 9 12 8.55229 12 8C12 7.44772 11.5523 7 11 7H5Z" fill="#111827"/>
              </svg>
                `
							}
								${!findMovie ? 'Watchlist' : 'Remove'}
						</button>
				</li>
    `;
		})
		.join('');

	mainEl.innerHTML = '';
	mainEl.append(movieList);
}

searchForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const searchInputValue = searchInput.value;
	const apiKey = '5cb2898e';

	if (!searchInputValue) return;

	const res = await fetch(
		`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInputValue}`
	);
	const data = await res.json();

	if (data.Error === 'Movie not found!') {
		mainEl.innerHTML = `
    <div class="empty-state">
      <p>Unable to find what you’re looking for. Please try another search.</p>
    </div>
    `;
	} else {
		movies = data.Search;
		renderMovieList();
	}
});

document.addEventListener('click', (e) => {
	if (e.target.dataset.imdbid) {
		toggleWatchlist(e.target.dataset.imdbid);
	}
});
