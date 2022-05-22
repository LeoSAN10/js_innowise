const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesList = document.getElementById("moviesList");
const movieKey = document.getElementsByClassName("movie-key");
const localStorageKeys = Object.keys(localStorage);

if (searchBtn) {
  searchBtn.addEventListener("click", searchMovies);
}
document.addEventListener("DOMContentLoaded", () => {
  searchInput.value = "marvel";
  searchMovies();
  searchInput.value = "";
});

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

  if(data.Response == 'False'){
    alert(data.Error)
  }

  const movies = data.Search;
  movies.forEach(async (movie) => {
    let response = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d1075702`
    );
    let moviesListData = await response.json();

    const movieID = moviesListData.imdbID;
    const movieIDkey = moviesListData.imdbID + "key";
    const watchlistBtnKey = moviesListData.imdbID + "watchlistBtn";

    moviesList.innerHTML += `
      <div class="swiper-slide" id="slide">
          <div class="card" id=${movieID}>

              <span id=${movieIDkey} class="hide movie-key">${movieIDkey}</span>
              <span class="card-title">${moviesListData.Title}</span>
              <img src=${moviesListData.Poster} class="card-poster" />


              <div class="card-header">
                <div class="card-info">
                  <span class="card-year">${moviesListData.Year}</span>
                  <button class="card-btn-favorietes" id="${watchlistBtnKey}" onclick="addToWatchlist(${movieIDkey}, ${movieID})"><svg class="like" viewBox="0 0 612 792" width="100%" height="100%"><path d="M562.413,284.393c-9.68,41.044-32.121,78.438-64.831,108.07L329.588,542.345l-165.11-149.843 c-32.771-29.691-55.201-67.076-64.892-108.12c-6.965-29.484-4.103-46.14-4.092-46.249l0.147-0.994 c6.395-72.004,56.382-124.273,118.873-124.273c46.111,0,86.703,28.333,105.965,73.933l9.061,21.477l9.061-21.477 c18.958-44.901,61.694-73.922,108.896-73.922c62.481,0,112.478,52.27,119,125.208C566.517,238.242,569.379,254.908,562.413,284.393z"/></svg></button>
                </div>
              </div>

              <div class="card-rating">
                <img src="images/star-icon.png" class="star-icon" />
                <span>${moviesListData.imdbRating}</span>
              </div>
  
          </div>
      </div>
          `;

    initFavs(movieIDkey);
  });
}

function addToWatchlist(movieIDkey, movieID) {
  let items = document.querySelectorAll("path");
  for (let x = 0; x < items.length; x++) {
    var item = items[x];
    item.addEventListener("click", function (fn) {
      if (localStorage.length == 0) {
        localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML);
        console.log("bbb");
        fn.target.closest("path").classList.add("ddd");
      } else {
        for (let i = -1; i <= localStorage.length; i++) {
          if (localStorage.key(i) !== movieIDkey.textContent) {
            // console.log("dddd");
            localStorage.setItem(movieIDkey.innerHTML, movieID.innerHTML);
            fn.target.closest("path").classList.add("ddd");
          } else {
            console.log("aaaa");
            localStorage.removeItem(movieIDkey.innerHTML, movieID.innerHTML);
            fn.target.closest("path").classList.remove("ddd");
          }
        }
      }
    });
  }
}

function initFavs(movieIDkey) {
  // Handle Favorites
  const localStorageKeys = Object.keys(localStorage);

}


// const redirect = document.getElementById('favorites_btn');
// redirect.addEventListener('click', function(e){
//   setLocation("#watchlist.html")
// })

// function setLocation(curLoc){
//   history.pushState({foo: 'bar'}, 'Title', '#/watchlist.html')
//   location.href = curLoc;
//   location.hash = curLoc;
// }

function showContent(link) {  
  
  var cont = document.getElementById('container');  
  var loading = document.getElementById('loading');  

  cont.innerHTML = loading.innerHTML;  

  var http = createRequestObject();  
  if( http )   
  {  
      http.open('get', link);  
      http.onreadystatechange = function ()   
      {  
          if(http.readyState == 4)   
          {  
              cont.innerHTML = http.responseText;  
          }  
      }  
      http.send(null);      
  }  
  else   
  {  
      document.location = link;  
  }  
}  

// создание ajax объекта  
function createRequestObject()   
{  
  try { return new XMLHttpRequest() }  
  catch(e)   
  {  
      try { return new ActiveXObject('Msxml2.XMLHTTP') }  
      catch(e)   
      {  
          try { return new ActiveXObject('Microsoft.XMLHTTP') }  
          catch(e) { return null; }  
      }  
  }  
}  

  