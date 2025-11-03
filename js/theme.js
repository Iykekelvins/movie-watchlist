let mode = 'light';
let modeFromLocalStorage = localStorage.getItem('movie-theme');

const html = document.querySelector('html');
const toggle = document.getElementById('toggle');

if (modeFromLocalStorage) {
	mode = modeFromLocalStorage;
	html.classList.add(mode);
}

if (html.classList.contains('dark')) {
	localStorage.setItem('movie-theme', 'dark');

	toggle.innerHTML = `
    	<button class="toggle" id="toggle">
				<i class="fa-regular fa-sun"></i>
				<span>Light mode</span>
			</button>
    `;
} else {
	localStorage.setItem('movie-theme', 'light');

	toggle.innerHTML = `
    	<button class="toggle" id="toggle">
				<i class="fa-regular fa-moon"></i>
				<span>Dark mode</span>
			</button>
    `;
}

toggle.addEventListener('click', (e) => {
	html.classList.toggle('dark');

	if (html.classList.contains('dark')) {
		localStorage.setItem('movie-theme', 'dark');

		toggle.innerHTML = `
    	<button class="toggle" id="toggle">
				<i class="fa-regular fa-sun"></i>
				<span>Light mode</span>
			</button>
    `;
	} else {
		localStorage.setItem('movie-theme', 'light');

		toggle.innerHTML = `
    	<button class="toggle" id="toggle">
				<i class="fa-regular fa-moon"></i>
				<span>Dark mode</span>
			</button>
    `;
	}
});
