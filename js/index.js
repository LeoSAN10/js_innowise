import swiper from './swiper'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const moviesList = document.getElementById('moviesList')
const watchlist = document.getElementById('watchlist')
const watchlistMovies = document.getElementById('favorites')
const openWatchlistBtn = document.getElementById('favorites_btn')
const mainBlock = document.getElementById('mainBlock')
const deleteSearchInputBtn = document.getElementById('deleteTextBtn')

function checkAvailability(arr, val) {
  return arr.some(function (arrVal) {
    return val == arrVal
  })
}

function clearSearchInput() {
  searchInput.value = ''
}

deleteSearchInputBtn.addEventListener('click', clearSearchInput)

function addToWatchlist(fn) {
  const buttonCard = fn.target.closest('path')
  const html = buttonCard.closest('div.swiper-slide')
  const movieKey = buttonCard.closest('div.card')
  const keys = Object.keys(localStorage)
  if (checkAvailability(keys, `${movieKey.id}key`)) {
    localStorage.removeItem(`${movieKey.id}key`, html.innerHTML)
    fn.target.closest('path').classList.remove('inWatchlist')
  } else {
    fn.target.closest('path').classList.add('inWatchlist')
    localStorage.setItem(`${movieKey.id}key`, html.innerHTML)
  }
}

function fillHeartsIfInLocalStorage(cards) {
  if (localStorage.length) {
    const keys = Object.keys(localStorage)
    for (let j = 0; j < cards.length; j++) {
      let item = cards[j]
      if (checkAvailability(keys, `${item.id}key`)) {
        item.childNodes[7].childNodes[1].childNodes[3].childNodes[0].childNodes[0].classList.add(
          'inWatchlist',
        )
      }
    }
  }
}

async function getMovies() {
  const res = await fetch(
    `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=d1075702`,
  )
  const data = await res.json()

  if (data.Response == 'False') {
    alert(data.Error)
  }
  moviesList.innerHTML = ''
  showMovies(data)
}

function showMovies(data) {
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
      addToWatchlist(fn)
    })
    const cards = document.querySelectorAll('.card')
    fillHeartsIfInLocalStorage(cards)
  })

}

if (searchBtn) {
  searchBtn.addEventListener('click', getMovies)
}

document.addEventListener('DOMContentLoaded', () => {
  searchInput.value = 'marvel'
  getMovies()
  searchInput.value = ''
})

function showWatchlist() {
  if (watchlist.style.display === 'block') {
    watchlistMovies.innerHTML = ''
    history.go(-1)
    watchlist.style.display = 'none'
    mainBlock.style.minHeight = '900px'
  } else {
    history.pushState(null, null, '#favorites')
    for (let i = 0; i < localStorage.length; i++) {
      const getLocalStorage = localStorage.getItem(localStorage.key(i))
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

  const keys = Object.keys(localStorage)

  const cards = document.querySelectorAll('#favorites > .card')
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const likeInWatchlist =
      card.childNodes[1].childNodes[7].childNodes[1].childNodes[3]
    likeInWatchlist.addEventListener('click', fn => {
      const watchlistItem = fn.target.closest('path')
      watchlistItem.classList.remove('inWatchlist')
      const activeCard = fn.target.closest('div.card')
      console.log(checkAvailability(keys, `${activeCard.id}key`))
      if (checkAvailability(keys, `${activeCard.id}key`)) {
        localStorage.removeItem(`${activeCard.id}key`)
      }
    })
  }
}

openWatchlistBtn.addEventListener('click', showWatchlist)
