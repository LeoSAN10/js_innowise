/**
 * @jest-environment jsdom
 */

function clearSearchInput() {
  searchInput.value = ''
  return searchInput.value
}

it('clearInput', () => {
  document.body.innerHTML = `
    <input type="text" for="submit" id="searchInput" placeholder="Search for a movie">
    `
  const searchInput = document.getElementById('searchInput')
  searchInput.value = 'ddd'

  expect(clearSearchInput()).toBe('')
})
