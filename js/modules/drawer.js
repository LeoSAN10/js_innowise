import Watchlist from "./watchlist.js"
import Storage from "./localStorage.js"
import { checkAvailability } from "./utils.js"

class Drawer {
  constructor(storage){
    this._storage = storage
  }
  fillHeartsIfInLocalStorage(cards) {
    if (this._storage.getStorageLength()) {
      const keys = this._storage.getAllItems()
      for (let j = 0; j < cards.length; j++) {
        let item = cards[j]
        if (checkAvailability(keys, `${item.id}key`)) {
          item.querySelector('path').classList.add(
            'inWatchlist',
          )
        }
      }
    }
  }

  showMovies(data) {
    data.Search.forEach(async movie => {
      let response = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e668e570`,
      )
      let moviesListData = await response.json()
      const watchlistBtnKey = `${moviesListData.imdbID}watchlistBtn`
      const movieEl = document.createElement('div')
      movieEl.classList.add('swiper-slide')

      movieEl.innerHTML = `
          
              <div class="card" id=${moviesListData.imdbID}>
          
                  <span id=${moviesListData.imdbID} class="hide movie-key">${moviesListData.imdbID}key</span>
                  <span class="card-title">${movie.Title}</span>
                  <img src=${movie.Poster} class="card-poster" />
          
          
                  <div class="card-header">
                    <div class="card-info">
                      <span class="card-year">${movie.Year}</span>
                      <button class="card-btn-favorietes" id="${watchlistBtnKey}watchlistBtn"><svg class="like" viewBox="0 0 612 792" width="100%" height="100%"><path d="M562.413,284.393c-9.68,41.044-32.121,78.438-64.831,108.07L329.588,542.345l-165.11-149.843 c-32.771-29.691-55.201-67.076-64.892-108.12c-6.965-29.484-4.103-46.14-4.092-46.249l0.147-0.994 c6.395-72.004,56.382-124.273,118.873-124.273c46.111,0,86.703,28.333,105.965,73.933l9.061,21.477l9.061-21.477 c18.958-44.901,61.694-73.922,108.896-73.922c62.481,0,112.478,52.27,119,125.208C566.517,238.242,569.379,254.908,562.413,284.393z"/></svg></button>
                    </div>
                  </div>
          
                  <div class="card-rating">
                    <img src="images/star-icon.png" class="star-icon" />
                    <span>${moviesListData.imdbRating}</span>
                  </div>
          
              </div>
              `
      moviesList.appendChild(movieEl)

      const addToWatchlistBtn = document.getElementById(
        `${watchlistBtnKey}watchlistBtn`,
      )
      addToWatchlistBtn.addEventListener('click', fn => {
        Watchlist.addToWatchlist(fn)
      })
      const cards = document.querySelectorAll('.card')
      this.fillHeartsIfInLocalStorage(cards)
    })
  }

  clearSearchInput() {
    searchInput.value = ''
  }

}

export default new Drawer(new Storage());