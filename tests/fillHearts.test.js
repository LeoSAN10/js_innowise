/**
 * @jest-environment jsdom
 */

function fillHeartsIfInLocalStorage(cards) {
  if (localStorage.length) {
    const keys = Object.keys(localStorage)
    for (let j = 0; j <= cards.length; j++) {
      let item = cards[j]
      if (checkAvailability(keys, `${item.id}key`)) {
        item.childNodes[7].childNodes[1].childNodes[3].childNodes[0].childNodes[0].classList.add(
          'inWatchlist',
        )
      }
    }
  } else {
    const error = 'local storage is empty'
    return error
  }
}

it('checkAdress', () => {
  document.body.innerHTML = `
    <div class="card" id="tt4154664">

    <span id="tt4154664" class="hide movie-key">tt4154664key</span>
    <span class="card-title">Captain Marvel</span>
    <img src="https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg" class="card-poster">


    <div class="card-header">
      <div class="card-info">
        <span class="card-year">2019</span>
        <button class="card-btn-favorietes" id="tt4154664watchlistBtnwatchlistBtn"><svg class="like" viewBox="0 0 612 792" width="100%" height="100%"><path d="M562.413,284.393c-9.68,41.044-32.121,78.438-64.831,108.07L329.588,542.345l-165.11-149.843 c-32.771-29.691-55.201-67.076-64.892-108.12c-6.965-29.484-4.103-46.14-4.092-46.249l0.147-0.994 c6.395-72.004,56.382-124.273,118.873-124.273c46.111,0,86.703,28.333,105.965,73.933l9.061,21.477l9.061-21.477 c18.958-44.901,61.694-73.922,108.896-73.922c62.481,0,112.478,52.27,119,125.208C566.517,238.242,569.379,254.908,562.413,284.393z" class="inWatchlist"></path></svg></button>
      </div>
    </div>

    <div class="card-rating">
      <img src="../images/star-icon.png" class="star-icon">
      <span>6.8</span>
    </div>

</div>
      `
  const card = document.getElementById('tt4154664')
  const functionResult = fillHeartsIfInLocalStorage(card)
  const expectedResult = 'local storage is empty'
  expect(expectedResult).toEqual(functionResult)
})
