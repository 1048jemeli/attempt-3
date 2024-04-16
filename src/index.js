let url = 'http://localhost:3002/films';
const listHolder = document.getElementById('films');
const elementToStyle = document.getElementById('films');
elementToStyle.style.color = 'green';
document.addEventListener('DOMContentLoaded', () => {
    const firstFilmItem = document.querySelector('.film.item');
    if (firstFilmItem) {
        firstFilmItem.remove();
    }
    fetchMovies(url);
});
document.addEventListener('load', handleLoad);
document.addEventListener('beforeunload', handleBeforeUnload);
function handleLoad() {
  alert('Page has finished loading!');
}
function handleBeforeUnload() {
  return 'Are you sure you want to leave this page?';
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    let reviewText = document.getElementById('reviewText').value.trim();
    let rating = document.getElementById('ratingInput').value;

    if (reviewText === '' || rating === '') {
        event.preventDefault();
        alert('Please enter both a review and a rating.');
        return false;
    }
});
// Create fetch function
function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                displayMovie(movie);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovie(movie) {
    const li = document.createElement('li');
    li.style.cursor = "pointer";
    li.textContent = movie.title.toUpperCase();
    listHolder.appendChild(li);
    addClickEvent();
}

function addClickEvent() {
    const children = listHolder.children;

    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('click', () => {
            fetch(`${url}/${i+1}`)
                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket';
                    setUpMovieDetails(movie);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        });
    }
}
function setUpMovieDetails(childMovie) {
    const preview = document.getElementById('poster');
    preview.src = childMovie.poster;

    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = childMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${childMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = childMovie.description;
    const showTime = document.querySelector('#showtime');
    showTime.textContent = childMovie.showtime;
    const tickets = document.querySelector('#ticket-num');
    tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}

const btn = document.getElementById('buy-ticket');

btn.addEventListener('click', function (e) {
    let remTickets = parseInt(document.querySelector('#ticket-num').textContent, 10);
    e.preventDefault();
    if (remTickets > 0) {
        document.querySelector('#ticket-num').textContent = remTickets - 1;
    } else if (remTickets === 0) {
        btn.textContent = 'Sold Out';
    }
}); 
const button = document.getElementById('delete');
function deleteMovie(movieItem) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            const movieItem = document.querySelector('films');
            if (movieItem) {
                movieItem.remove();
            }
        } else {
            console.error('Failed to delete movie:', response.status);
        }
    })
    .catch(error => console.error('Error deleting movie:', error));
}

