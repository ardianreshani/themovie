const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    const {results} = await fetchAPData("movie/popular");
    console.log(results);
    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
                ? ` 
                <img
                     src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"/>
              `
                : `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
              />
            `
        }
         
        </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                 <small class="text-muted">${movie.release_date}</small>
                </p>
            </div>
            `;
        document.querySelector("#popular-movies").appendChild(div);
    });
}
// Fetch data ftom TMDB API
async function fetchAPData(endpoint) {
    const API_KEY = "971f9e3db8ec34f4cedfb668258d0586";
    const API_URL = "https://api.themoviedb.org/3/";
    const response = await fetch(
        `${API_URL}${endpoint}/?api_key={API_KEY}&language=en-US`,
        {
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzFmOWUzZGI4ZWMzNGY0Y2VkZmI2NjgyNThkMDU4NiIsInN1YiI6IjY0N2M3Yzg4Y2Y0YjhiMDE0MThmOWI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJEE_dNqVuc9BiDT8GaNOGL1oBdvmy1dDj5Qc0dUBig",
            },
        }
    );

    const data = await response.json();
    return data;
}
fetchAPData("movie");
// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        if (link.getAttribute("href") === global.currentPage) {
            link.classList.add("active");
        }
    });
}

// Init app
function init() {
    // Router
    switch (global.currentPage) {
        case "/":
            displayPopularMovies();
            break;
        case "/shows.html":
            console.log("Shows");
            break;
        case "/movie-details.html":
            console.log("Movies details");
            break;
        case "/tv-details.html":
            console.log("tv details");
            break;
        case "/tv-details.html":
            console.log("tv details");
            break;
        case "/search.html":
            console.log("Search");
            break;
    }
    highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init);
