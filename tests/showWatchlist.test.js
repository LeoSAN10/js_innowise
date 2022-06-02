/**
 * @jest-environment jsdom
 */

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
  return location.href
}


it('checkAdress', () => {
    document.body.innerHTML = `
      <input type="text" for="submit" id="searchInput" placeholder="Search for a movie">
      <div id="mainBlock">
      <div id="watchlist"></div>
      </div>
      `
    const functionResult = showWatchlist()
    const expectedResult = 'http://localhost/#favorites'
    expect(expectedResult).toEqual(functionResult)
  })
