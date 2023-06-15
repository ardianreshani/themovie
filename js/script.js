const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    const {results} = await fetchAPData("movie/popular");
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
async function displayPopularShows() {
    const {results} = await fetchAPData("tv/popular");
    results.forEach((show) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <a href="show-details.html?id=${show.id}">
        ${
            show.poster_path
                ? ` 
                <img
                     src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.title}"/>
              `
                : `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="show Title"
              />
            `
        }
         
        </a>
            <div class="card-body">
                <h5 class="card-title">${show.title}</h5>
                <p class="card-text">
                 <small class="text-muted">${show.release_date}</small>
                </p>
            </div>
            `;
        document.querySelector("#popular-shows").appendChild(div);
    });
}

// Display Movie Details
async function displayMoiveDetails() {
    const movieId = window.location.search.split("=")[1];
    const movie = await fetchAPData(`/movie/${movieId}`);

    // overlay for background image
    displayBackgorundImage("movie", movie.backdrop_path);
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((item) => `<li>${item.name} </li>`).join("")}
            </ul>
            <a href="${
                movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
         
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
                movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
                movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime: </span> ${
                movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span>  ${
                movie.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
              .map((item) => `<span>${item.name} </span>`)
              .join(", ")}</div>
        </div>
     `;
    document.querySelector("#movie-details").appendChild(div);
}

// Display Show Details
async function displayShowDetails() {
    const showId = window.location.search.split("=")[1];
    const show = await fetchAPData(`/tv/${showId}`);

    // overlay for background image
    displayBackgorundImage("tv", show.backdrop_path);
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="details-top">
          <div>
          ${
              show.poster_path
                  ? ` 
                <img
                     src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.title}"/>
              `
                  : `
                <img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="show Title"
              />
            `
          }
          </div>
          <div>
            <h2>${show.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map((item) => `<li>${item.name} </li>`).join("")}
            </ul>
            <a href="${
                show.homepage
            }" target="_blank" class="btn">Visit show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>show Info</h2>
          <ul>
         
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
                show.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
                show.revenue
            )}</li>
            <li><span class="text-secondary">Runtime: </span> ${
                show.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span>  ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
              .map((item) => `<span>${item.name} </span>`)
              .join(", ")}</div>
        </div>
     `;
    document.querySelector("#show-details").appendChild(div);
}

// Fetch data ftom TMDB API
async function fetchAPData(endpoint) {
    const API_KEY = "971f9e3db8ec34f4cedfb668258d0586";
    const API_URL = "https://api.themoviedb.org/3/";
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzFmOWUzZGI4ZWMzNGY0Y2VkZmI2NjgyNThkMDU4NiIsInN1YiI6IjY0N2M3Yzg4Y2Y0YjhiMDE0MThmOWI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJEE_dNqVuc9BiDT8GaNOGL1oBdvmy1dDj5Qc0dUBig",
        },
    });

    const data = await response.json();
    hideSpinner();
    return data;
}

function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show");
}
// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        if (link.getAttribute("href") === global.currentPage) {
            link.classList.add("active");
        }
    });
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display Backdrop on Detail page
function displayBackgorundImage(type, path) {
    const overlayDiv = document.createElement("div");
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;
    overlayDiv.style.backgroundPosition = "center";
    overlayDiv.style.backgroundRepeat = "no-repeat";
    overlayDiv.style.height = "100vh";
    overlayDiv.style.width = "100vw";
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.zIndex = "-1";
    overlayDiv.style.opacity = "0.1";
    if (type === "movie") {
        document.querySelector("#movie-details").appendChild(overlayDiv);
    } else {
        document.querySelector("#show-details").appendChild(overlayDiv);
    }
}
// Init app
function init() {
    // Router
    switch (global.currentPage) {
        case "/":
            displayPopularMovies();
            break;
        case "/index.html":
            displayPopularMovies();
            break;
        case "/shows.html":
            console.log("Shows");
            break;
        case "/movie-details.html":
            disShowDetails();
            break;
        case "/tv-details.html":
            displayShowDetails();
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
