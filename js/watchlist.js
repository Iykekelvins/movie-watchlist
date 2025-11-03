const mainEl = document.querySelector('main');

const watchlist = JSON.parse(localStorage.getItem('movie-watchlist'));

let movie;

if (watchlist.length > 0) {
	renderWatchList();
}

let newWatchlist = [];

for (let item of watchlist) {
	newWatchlist.push(item);
}

function renderWatchList(moviesData = watchlist) {
	const movieList = document.createElement('ul');
	movieList.classList.add('container', 'movie-list');

	movieList.innerHTML = movieList.innerHTML = moviesData
		.map((movie) => {
			const findMovie = watchlist.find((item) => item.imdbID === movie.imdbID);

			return `
      <li class="movie">
					<div class="movie-top">
            <img src="${movie.Poster}" alt="${movie.Title} Poster" />
					  <h2>${movie.Title}</h2>
						<button class="view-movie" data-movieid=${movie.imdbID}>View movie</button>
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

function toggleWatchlist(imdbID) {
	const findMovie = newWatchlist.find((item) => item.imdbID === imdbID);

	if (findMovie) {
		newWatchlist = newWatchlist.filter((item) => item.imdbID !== imdbID);
	} else {
		newWatchlist.unshift(movie);
	}

	localStorage.setItem('movie-watchlist', JSON.stringify(newWatchlist));

	if (newWatchlist.length === 0) {
		mainEl.innerHTML = `
	    <div class="empty-state watchlist-empty">
				<p>Your watchlist is looking a little empty...</p>
				<a href="/index.html">
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.125 5.625C10.125 5.00368 9.62132 4.5 9 4.5C8.37868 4.5 7.875 5.00368 7.875 5.625V7.875H5.625C5.00368 7.875 4.5 8.37868 4.5 9C4.5 9.62132 5.00368 10.125 5.625 10.125H7.875V12.375C7.875 12.9963 8.37868 13.5 9 13.5C9.62132 13.5 10.125 12.9963 10.125 12.375V10.125H12.375C12.9963 10.125 13.5 9.62132 13.5 9C13.5 8.37868 12.9963 7.875 12.375 7.875H10.125V5.625Z"
							fill="#363636" />
					</svg>

					Let&apos;s add some movies!</a
				>
			</div>
	    `;
	} else {
		renderWatchList(newWatchlist);
	}
}

function renderMovie() {
	const findMovie = newWatchlist.find((item) => item.imdbID === movie.imdbID);

	document.getElementById('modal-inner').innerHTML = `
	<div class="movie-info">
					<img src="${movie.Poster}" alt="${movie.Title} Poster" />

					<div class="movie-info-right">
						<div class="movie-rating">
							<h2>${movie.Title}</h2>
							<p>
								<svg
								width="12"
								height="11"
								viewBox="0 0 12 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4.86276 0.518241C5.08727 -0.172742 6.06483 -0.172743 6.28934 0.51824L7.09152 2.98709C7.19193 3.2961 7.47989 3.50532 7.80481 3.50532H10.4007C11.1273 3.50532 11.4293 4.43504 10.8416 4.86209L8.74142 6.38792C8.47856 6.5789 8.36856 6.91743 8.46897 7.22644L9.27115 9.69529C9.49566 10.3863 8.7048 10.9609 8.11702 10.5338L6.01689 9.00799C5.75402 8.817 5.39808 8.817 5.13521 9.00799L3.03508 10.5338C2.4473 10.9609 1.65644 10.3863 1.88095 9.69529L2.68313 7.22645C2.78354 6.91743 2.67354 6.5789 2.41068 6.38792L0.31055 4.86209C-0.277235 4.43504 0.0248458 3.50532 0.751388 3.50532H3.34729C3.67221 3.50532 3.96017 3.2961 4.06058 2.98709L4.86276 0.518241Z"
									fill="#FEC654" />
							</svg>
							
							${movie.imdbRating}</p>
						</div>

						<div class="movie-details">
							<p>${movie.Runtime}</p>
							<p>${movie.Genre}</p>
							<button
							data-imdbid=${movie.imdbID}
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
						</div>

						<div class="movie-plot">
							<p>
							${movie.Plot}
							</p>
						</div>
					</div>
					<button id="close-modal" class="close-modal"><i class="fa-solid fa-circle-xmark"></i></button>
				</div>
	`;
}

async function getMovieDetails(imdbID) {
	const res = await fetch(`http://www.omdbapi.com?apikey=5cb2898e&i=${imdbID}`);

	const data = await res.json();

	return data;
}

document.addEventListener('click', async (e) => {
	if (e.target.dataset.imdbid) {
		toggleWatchlist(e.target.dataset.imdbid);

		if (movie) {
			renderMovie();
		}
	} else if (e.target.dataset.movieid) {
		const data = await getMovieDetails(e.target.dataset.movieid);
		movie = data;
		document.getElementById('movie-modal').style.opacity = 1;
		document.getElementById('movie-modal').style.pointerEvents = 'all';

		renderMovie();
	} else if (e.target.id === 'close-modal') {
		document.getElementById('movie-modal').style.opacity = 0;
		document.getElementById('movie-modal').style.pointerEvents = 'none';

		setTimeout(() => {
			movie = null;
		}, 500);
	}
});
