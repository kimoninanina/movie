// Initial Values
const INITIAL_SEARCH_VALUE = 'spiderman';
const log = console.log;

// Selecting elements from the DOM
const moviesContainer = document.querySelector('#movies-container');
const moviesSearchable = document.querySelector('#movies-searchable');

function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}" id=${id} onclick="movieClicked(this)">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

// function createIframe(video) {
//     const videoKey = (video && video.key) || 'No key found!!!';
//     const iframe = document.createElement('iframe');
//     iframe.src = `http://www.youtube.com/embed/${videoKey}`;
//     iframe.width = 360;
//     iframe.height = 315;
//     iframe.allowFullscreen = true;
//     return iframe;
// }

// function insertIframeIntoContent(video, content) {
//     const videoContent = document.createElement('div');
//     const iframe = createIframe(video);

//     videoContent.appendChild(iframe);
//     content.appendChild(videoContent);
// }


// // function createVideoTemplate(data) {
// //     const content = this.content;
// //     content.innerHTML = '<p id="content-close">X</p>';
    
// //     const videos = data.results || [];

// //     if (videos.length === 0) {
// //         content.innerHTML = `
// //             <p id="content-close">X</p>
// //             <p>No Trailer found for this video id of ${data.id}</p>
// //         `;
// //         return;
// //     }

// //     for (let i = 0; i < 4; i++) {
// //         const video = videos[i];
// //         insertIframeIntoContent(video, content);
// //     }
// // }

function createSectionHeader(title) {
    const header = document.createElement('h2');
    header.innerHTML = title;

    return header;
}


function renderMovies(data) {
    const moviesBlock = generateMoviesBlock(data);
    const header = createSectionHeader(this.title);
    moviesBlock.insertBefore(header, moviesBlock.firstChild);
    moviesContainer.appendChild(moviesBlock);
}



function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'section');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = MOVIE_DB_IMAGE_ENDPOINT + poster_path;
    
            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}



// Inserting section before content element
function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const template = `
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = template;
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}



// Click on any movies
// Event Delegation
// document.onclick = 
function movieClicked(event) {
    // log('Event: ', event);
    // const { tagName, id } = event.target;
    // if (tagName.toLowerCase() === 'img') {
    //     const movieId = event.target.dataset.movieId;
    //     const section = event.target.parentElement.parentElement;
    //     const content = section.nextElementSibling;
    //     content.classList.add('content-display');
    //     getVideosByMovieId(movieId, content);
    // }
    const movieId = event.id;
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_DB_API}&language=en-US`)
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            console.error("error!");
        }
    })
    .then((targetMovie) => {
        putInfoToCard(targetMovie);
    });

return;


    // if (id === 'content-close') {
    //     const content = event.target.parentElement;
    //     content.classList.remove('content-display');
    // }
}

function putInfoToCard(movie) {
    const background = document.getElementById('background');
    background.style.display = "block";
    console.log(movie);

    const movieContext = document.getElementById("div2");
    movieContext.innerHTML = `
    <h3>${movie.original_title}</h3>
    <p>${movie.overview}</p>`

    
}

 function closeTab() {
     const background = document.getElementById('background');
     background.style.display = "none";
 }

// Initialize the search
getTopRatedMovies();
searchPopularMovie();
getTrendingMovies();
searchUpcomingMovies();


// function showMovies(movies) {
//     // clear main
//     main.innerHTML = "";

//     movies.forEach((movie) => {
//         const { poster_path, title, overview } = movie;

//         const movieEl = document.createElement("div");
//         movieEl.classList.add("movie");

//         movieEl.innerHTML = `
//             <img
//                 src="${IMGPATH + poster_path}"
//                 alt="${title}"
//             />
//             <div class="movie-info">
//                 <h3>${title}</h3>
//                 <span class="${getClassByRate(
//                     vote_average
//                 )}">${vote_average}</span>
//             </div>
//             <div class="overview">
//                 <h3>Overview:</h3>
//                 ${overview}
//             </div>
//         `;

//         main.appendChild(movieEl);
//     });
// }