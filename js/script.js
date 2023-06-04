// https://api.themoviedb.org/3/movie/550?api_key=971f9e3db8ec34f4cedfb668258d0586
// 91f9e3db8ec34f4cedfb668258d0586
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzFmOWUzZGI4ZWMzNGY0Y2VkZmI2NjgyNThkMDU4NiIsInN1YiI6IjY0N2M3Yzg4Y2Y0YjhiMDE0MThmOWI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJEE_dNqVuc9BiDT8GaNOGL1oBdvmy1dDj5Qc0dUBig
const global = {
    currentPage: window.location.pathname,
};

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
            console.log("Home");
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
