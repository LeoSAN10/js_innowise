import drawer from './drawer.js';

class Response {
  async getMovies() {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=d1075702`,
    )
    const data = await res.json()

    if (data.Response == 'False') {
      alert(data.Error)
    }
    moviesList.innerHTML = ''
    drawer.showMovies(data)
  }
}


export default new Response