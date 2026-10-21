
// import.meta.env.VITE_OMDB_API_KEY lit la clé depuis .env et la rend disponible dans le code client
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = ' https://www.omdbapi.com/';

// Construit l'URL et récupère le JSON
async function request(params) {
  const query = new URLSearchParams({ apikey: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}?${query}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }
  return response.json();
}

// Recherche de films par titre (10 résultats par page)
// quand la recherche échoue, renvoie une liste vide et un total de 0
export async function searchMovies(title, page = 1, year = '') {
  const params = { s: title, type: 'movie', page };
  if (year) params.y = year;

  const data = await request(params);

  if (data.Response === 'False') {
    return { movies: [], total: 0 };
  }
  return { movies: data.Search, total: Number(data.totalResults) };
}

// Détails complets d'un film à partir de son identifiant IMDb
export async function getMovieById(imdbID, plot = 'full') {
  const data = await request({ i: imdbID, plot });

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }
  return data;
}