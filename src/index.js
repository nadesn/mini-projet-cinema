import './style.css';
import { getMovieById, searchMovies } from './api.js';
import { createMovieCard } from './movieCard.js';

// Films choisis comme "tendances" (identifiants IMDb)
const TRENDING_IDS = [
  'tt15239678', // Dune: Part Two
  'tt6263850',  // Deadpool & Wolverine
  'tt22022452', // Inside Out 2
  'tt15398776', // Oppenheimer
  'tt9218128',  // Gladiator II
  'tt1262426',  // Wicked
];

const trendingGrid = document.querySelector('#trending');
const grid2024 = document.querySelector('#movies-2024');
const loadMoreBtn = document.querySelector('#load-more');

let page2024 = 0;

// Charge les films tendances (avec résumé court)
async function loadTrending() {
  try {
    const movies = await Promise.all(
      TRENDING_IDS.map((id) => getMovieById(id, 'short'))
    );
    movies.forEach((movie) => trendingGrid.append(createMovieCard(movie)));
  } catch (error) {
    console.error(error);
    trendingGrid.textContent = 'Impossible de charger les films tendances.';
  }
}

// Charge la page suivante des films de 2024
async function load2024() {
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = 'Chargement...';

  try {
    page2024++;
    const { movies, total } = await searchMovies('love', page2024, 2024);
    movies.forEach((movie) => grid2024.append(createMovieCard(movie)));

    // Plus rien à charger : on cache le bouton
    if (movies.length === 0 || grid2024.children.length >= total) {
      loadMoreBtn.hidden = true;
    }
  } catch (error) {
    console.error(error);
    page2024--; // on pourra réessayer la même page
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Charger plus de films de 2024';
  }
}

loadTrending();
load2024();
loadMoreBtn.addEventListener('click', load2024);