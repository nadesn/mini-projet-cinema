import './style.css';
import { searchMovies } from './api.js';
import { createMovieCard } from './movieCard.js';

const input = document.querySelector('#search-input');
const results = document.querySelector('#results');
const message = document.querySelector('#message');
const loadMoreBtn = document.querySelector('#load-more');

let currentQuery = '';
let currentPage = 1;
let debounceTimer = null;
let requestId = 0; // numéro de la dernière requête lancée

// Récupère une page de résultats pour la recherche en cours
async function fetchPage() {
  const id = ++requestId;

  try {
    const { movies, total } = await searchMovies(currentQuery, currentPage);

    // Une recherche plus récente a été lancée entre-temps : on ignore celle-ci
    if (id !== requestId) return;

    if (currentPage === 1 && movies.length === 0) {
      message.textContent = `Aucun film trouvé pour « ${currentQuery} ».`;
      return;
    }

    message.textContent = `${total} résultat(s) pour « ${currentQuery} »`;
    movies.forEach((movie) => results.append(createMovieCard(movie)));

    // On cache le bouton quand tous les résultats sont affichés
    loadMoreBtn.hidden = results.children.length >= total;
  } catch (error) {
    console.error(error);
    if (id === requestId) {
      message.textContent = 'Erreur lors de la recherche, réessayez.';
    }
  }
}

// Lance une nouvelle recherche à partir du texte saisi
function newSearch() {
  currentQuery = input.value.trim();
  currentPage = 1;
  results.replaceChildren(); // vide les anciens résultats
  loadMoreBtn.hidden = true;

  if (currentQuery.length === 0) {
    requestId++; // annule une éventuelle requête en cours
    message.textContent = "Tapez le titre d'un film (en anglais).";
    return;
  }
  if (currentQuery.length < 3) {
    requestId++;
    message.textContent = 'Tapez au moins 3 caractères.';
    return;
  }

  message.textContent = 'Recherche en cours...';
  fetchPage();
}

// Recherche en temps réel, avec un délai de 400 ms (debounce)
input.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(newSearch, 400);
});

// Bouton "Charger plus"
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = 'Chargement...';

  await fetchPage();

  loadMoreBtn.disabled = false;
  loadMoreBtn.textContent = 'Charger plus de résultats';
});