const mainEl = document.querySelector('main');

const watchlist = JSON.parse(localStorage.getItem('movie-watchlist'));

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

if (watchlist.length > 0) {
	renderWatchList();
}

let newWatchlist = [];

for (let item of watchlist) {
	newWatchlist.push(item);
}

function toggleWatchlist(imdbID) {
	newWatchlist = newWatchlist.filter((item) => item.imdbID !== imdbID);

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

document.addEventListener('click', (e) => {
	if (e.target.dataset.imdbid) {
		toggleWatchlist(e.target.dataset.imdbid);
	}
});
