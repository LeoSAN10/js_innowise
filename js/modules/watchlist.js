import { checkAvailability } from './utils.js'
import Storage from './localStorage.js'

class Watchlist {
  constructor(storage) {
    this._storage = storage
    this.showWatchlist = this.showWatchlist.bind(this)
  }
  addToWatchlist(fn) {
    const buttonCard = fn.target.closest('path')
    const html = buttonCard.closest('div.swiper-slide')
    const movieKey = buttonCard.closest('div.card')
    const keys = this._storage.getAllItems()
    if (checkAvailability(keys, `${movieKey.id}key`)) {
      this._storage.removeItem(`${movieKey.id}key`, html.innerHTML)
      fn.target.closest('path').classList.remove('inWatchlist')
    } else {
      fn.target.closest('path').classList.add('inWatchlist')
      this._storage.setItem(`${movieKey.id}key`, html.innerHTML)
    }
  }

  showWatchlist() {
    const watchlistMovies = document.getElementById('favorites')
    if (watchlist.style.display === 'block') {
      watchlistMovies.innerHTML = ''
      history.go(-1)
      watchlist.style.display = 'none'
      mainBlock.style.minHeight = '900px'
    } else {
      history.pushState(null, null, '#favorites')
      for (let i = 0; i < this._storage.getStorageLength(); i++) {
        const getLocalStorage = this._storage.getItem(localStorage.key(i))
        // Display every key's value to the watchlist
        watchlistMovies.innerHTML += `<div class="card">${getLocalStorage}</div>`
      }
      const watchlistBtn = document.querySelectorAll(
        '#favorites .card-btn-favorietes',
      )
      watchlistBtn.forEach(el => {
        el.style.backgroundColor = '#F2DD92'
      })
      watchlist.style.display = 'block'
      mainBlock.style.minHeight = watchlist.offsetHeight + 'px'
    }

    const keys = this._storage.getAllItems()

    const cards = document.querySelectorAll('#favorites > .card')
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const likeInWatchlist = card.querySelector('.card-btn-favorietes')
      likeInWatchlist.addEventListener('click', fn => {
        const watchlistItem = fn.target.closest('path')
        watchlistItem.classList.remove('inWatchlist')
        const activeCard = fn.target.closest('div.card')
        if (checkAvailability(keys, `${activeCard.id}key`)) {
          this._storage.removeItem(`${activeCard.id}key`)
        }
      })
    }
  }
}

export default new Watchlist(new Storage())
