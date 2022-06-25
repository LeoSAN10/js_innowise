/**
 * @jest-environment jsdom
 */

import Drawer from '../js/modules/drawer'

it('clearInput', () => {
  document.body.innerHTML = `
    <input type="text" for="submit" id="searchInput" placeholder="Search for a movie">
    `
  const searchInput = document.getElementById('searchInput')
  searchInput.value = 'ddd'
  Drawer.clearSearchInput()

  expect(searchInput.value).toBe('')
})
