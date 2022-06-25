import swiper from './swiper'
import storage from './modules/localStorage.js'
import response from './modules/Api.js'
import drawer from './modules/drawer.js'
import Watchlist from './modules/Watchlist.js'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const openWatchlistBtn = document.getElementById('favorites_btn')
const deleteSearchInputBtn = document.getElementById('deleteTextBtn')

deleteSearchInputBtn.addEventListener('click', drawer.clearSearchInput)

if (searchBtn) {
  searchBtn.addEventListener('click', response.getMovies)
}

document.addEventListener('DOMContentLoaded', () => {
  searchInput.value = 'marvel'
  response.getMovies()
  searchInput.value = ''
})

openWatchlistBtn.addEventListener('click', Watchlist.showWatchlist)
