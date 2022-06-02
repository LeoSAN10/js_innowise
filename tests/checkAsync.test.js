async function getMovies(value) {
  const res = await fetch(`https://www.omdbapi.com/?s=${value}&apikey=d1075702`)
  const data = await res.json()
  return data
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('Thor'),
  }),
)

beforeEach(() => {
  fetch.mockClear()
})

it('work async/await', async () => {
  const data = await getMovies('marvel')
  expect(data).toEqual('Thor')
})
