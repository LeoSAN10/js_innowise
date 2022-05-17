
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesList = document.getElementById("moviesList");
const movieKey = document.getElementsByClassName("movie-key");
const localStorageKeys = Object.keys(localStorage);
const slider = document.getElementById("swiper")
const pagination = document.getElementById("pagination")


if (searchBtn) {
  searchBtn.addEventListener("click", searchMovies);
}

async function searchMovies() {
  // Hide default elements
  if (moviesList.children) {
    let children = moviesList.children;
    let childrenArr = Array.prototype.slice.call(children);
    childrenArr.forEach((child) => child.remove());
  }

  let res = await fetch(
    `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=d1075702`
  );
  let data = await res.json();

  const movies = data.Search;
  movies.forEach(async (movie) => {
    let response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d1075702`
    );
    let moviesListData = await response.json();

    const summaryPlot = `${moviesListData.Plot.substring(
      0,
      110
    )}`
    console.log(moviesListData);

    // const completePlot = moviesListData.Plot;
    // const longPlot = summaryPlot;
    const movieID = moviesListData.imdbID;
    const movieIDkey = moviesListData.imdbID + "key";
    const watchlistBtnKey = moviesListData.imdbID + "watchlistBtn";
    const removeBtnKey = moviesListData.imdbID + "removeBtn";

    moviesList.innerHTML += `
    <div class="swiper-slide">
                <div class="cards">
                    <div class="card" id=${movieID}>
                        <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
                        <span class="card-title">${moviesListData.Title}</span>
                        <img src=${moviesListData.Poster} class="card-poster" />
                        <div class="card-header">
                            <div class="card-info">
                                <span class="card-year">${moviesListData.Year}</span>
                                <button class="card-btn-favorietes" id="${watchlistBtnKey}" onclick="addToWatchlist(${movieIDkey}, ${movieID}, ${watchlistBtnKey}, ${removeBtnKey})">Watchlist</button>
                            </div>
                            <div class="card-rating">
                                <img src="images/star-icon.png" class="star-icon" />
                                <p>${
                                moviesListData.imdbRating
                                }</p>
                            </div>
                        </div>
                        
                            <button class="card-btn card-watchlist watchlist-btn" id="${watchlistBtnKey}" onclick="addToWatchlist(${movieIDkey}, ${movieID}, ${watchlistBtnKey}, ${removeBtnKey})">Watchlist</button>
                            <button class="card-btn card-watchlist remove-watchlist-btn" id="${removeBtnKey}" onclick="removeFromWatchlist(${movieIDkey}, ${removeBtnKey}, ${watchlistBtnKey}, ${removeBtnKey})">Remove</button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            `;
    displayWatchlistOrRemoveBtn();
  });
}


function displayWatchlistOrRemoveBtn() {
  for (let movie of movieKey) {
    const removeBtnID = movie.id.slice(0, 9) + "removeBtn";
    const removeBtn = document.getElementById(removeBtnID);

    const watchlistBtnID = movie.id.slice(0, 9) + "watchlistBtn";
    const watchlistBtn = document.getElementById(watchlistBtnID);

    localStorageKeys.forEach((key) => {
      if (movie.id === key) {
        removeBtn.style.display = "inline";
        watchlistBtn.style.display = "none";
      }
    });
  }
}

