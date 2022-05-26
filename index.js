const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const moviesList = document.getElementById('moviesList');
const watchlist = document.getElementById('watchlist');
const watchlistMovies = document.getElementById('favorites');
const openWatchlistBtn = document.getElementById('favorites_btn')

function addToWatchlist(movieIDkey, movieID) {
  const items = document.querySelectorAll('path');
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.addEventListener('click', fn => {
      if (localStorage.length == 0) {
        fn.target.closest('path').classList.add('ddd');
        localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML);
      } else {
        for (let i = -1; i <= localStorage.length; i++) {
          if (localStorage.key(i) !== movieIDkey.textContent) {
            fn.target.closest('path').classList.add('ddd');
            localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML);
          } else {
            localStorage.removeItem(movieIDkey.innerHTML, movieID.innerHTML);
            fn.target.closest('path').classList.remove('ddd');
          }
        }
      }
    });
  }
};

async function searchMovies() {
  // Hide default elements
  if (moviesList.children) {
    const { children } = moviesList;
    const childrenArr = Array.prototype.slice.call(children);
    childrenArr.forEach(child => child.remove());
  }

  const res = await fetch(
    `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=d1075702`,
  );
  const data = await res.json();

  if (data.Response == 'False') {
    alert(data.Error);
  }

  const movies = data.Search;
  movies.forEach(async movie => {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d1075702`,
    );
    const moviesListData = await response.json();

    const movieID = moviesListData.imdbID;
    const movieIDkey = `${moviesListData.imdbID}key`;
    const watchlistBtnKey = `${moviesListData.imdbID}watchlistBtn`;

    moviesList.innerHTML += `
      <div class="swiper-slide" id="slide">
          <div class="card" id=${movieID}>

              <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
              <span class="card-title">${moviesListData.Title}</span>
              <img src=${moviesListData.Poster} class="card-poster" />


              <div class="card-header">
                <div class="card-info">
                  <span class="card-year">${moviesListData.Year}</span>
                  <button class="card-btn-favorietes" id="${watchlistBtnKey}""><svg class="like" viewBox="0 0 612 792" width="100%" height="100%"><path d="M562.413,284.393c-9.68,41.044-32.121,78.438-64.831,108.07L329.588,542.345l-165.11-149.843 c-32.771-29.691-55.201-67.076-64.892-108.12c-6.965-29.484-4.103-46.14-4.092-46.249l0.147-0.994 c6.395-72.004,56.382-124.273,118.873-124.273c46.111,0,86.703,28.333,105.965,73.933l9.061,21.477l9.061-21.477 c18.958-44.901,61.694-73.922,108.896-73.922c62.481,0,112.478,52.27,119,125.208C566.517,238.242,569.379,254.908,562.413,284.393z"/></svg></button>
                </div>
              </div>

              <div class="card-rating">
                <img src="images/star-icon.png" class="star-icon" />
                <span>${moviesListData.imdbRating}</span>
              </div>
  
          </div>
      </div>
          `;

          const d = document.getElementById(watchlistBtnKey)
          console.log(d, movieID, movieIDkey)
          console.log(addToWatchlist)
          d.addEventListener('click', function() {
            console.log('11111')
            //  addToWatchlist(movieIDkey, movieID);
             
            })


    if(localStorage.length){
      for (let i = 0; i <= localStorage.length; i++) {
        const getLocalStorage = localStorage.getItem(localStorage.key(i));
        const storageMovies = getLocalStorage.slice(26, 38);
        const items = document.querySelectorAll('.card');
        for (let j = 0; j < items.length; j++) {
          const item = items[j];
          if (item.childNodes[1].id == storageMovies) {
            const likes = item.querySelectorAll('path');
            for (let x = 0; x <= likes.length; x++) {
              const like = likes[x];
              like.classList.add('ddd');
            }
          }
        }
      }
    }


  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', searchMovies);
}

document.addEventListener('DOMContentLoaded', () => {
  searchInput.value = 'marvel';
  searchMovies();
  searchInput.value = '';
});



function showWatchlist() {
  if (watchlist.style.display === 'block') {
    watchlistMovies.innerHTML = '';
    history.go(-1);
    watchlist.style.display = 'none';
  } else {
    history.pushState(null, null, '#favorites');
    for (let i = 0; i < localStorage.length; i++) {
      const getLocalStorage = localStorage.getItem(localStorage.key(i));
      // Display every key's value to the watchlist
      watchlistMovies.innerHTML += `<div class="card">${getLocalStorage}</div>`;
    }
    const watchlistBtn = document.querySelectorAll(
      '#favorites .card-btn-favorietes',
    );
    watchlistBtn.forEach(el => {
      el.style.backgroundColor = '#F2DD92';
    });
    watchlist.style.display = 'block';
  }
};


openWatchlistBtn.addEventListener('click', showWatchlist);