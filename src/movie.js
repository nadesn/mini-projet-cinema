import './style.css';
import { getMovieById } from './api.js';
import { PLACEHOLDER } from './movieCard.js';

const container = document.querySelector('#movie-details');
const message = document.querySelector('#message');

const MONTHS = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

// Convertit "08 Dec 2015" (format OMDb) en "08/12/2015"
function formatDateFr(omdbDate) {
  if (!omdbDate || omdbDate === 'N/A') return 'Non disponible';

  const [day, month, year] = omdbDate.split(' ');
  const monthNumber = MONTHS[month];
  if (!monthNumber) return omdbDate; // format inattendu : on l'affiche tel quel

  return `${day.padStart(2, '0')}/${String(monthNumber).padStart(2, '0')}/${year}`;
}

// Crée une ligne "Libellé : valeur"
function createInfo(label, value) {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label} : `;
  p.append(strong, value && value !== 'N/A' ? value : 'Non disponible');
  return p;
}

// Crée un titre de section
function createHeading(text) {
  const h2 = document.createElement('h2');
  h2.textContent = text;
  return h2;
}

// Affiche toutes les informations du film
function renderMovie(movie) {
  document.title = `${movie.Title} - Cinéma`;

  // Poster
  const poster = document.createElement('img');
  poster.className = 'movie-detail__poster';
  poster.src = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;
  poster.alt = `Affiche de ${movie.Title}`;
  poster.addEventListener('error', () => { poster.src = PLACEHOLDER; }, { once: true });

  const info = document.createElement('div');
  info.className = 'movie-detail__info';

  // Titre
  const title = document.createElement('h1');
  title.textContent = `${movie.Title} (${movie.Year})`;

  // Résumé complet
  const plot = document.createElement('p');
  plot.textContent = movie.Plot !== 'N/A' ? movie.Plot : 'Aucun résumé disponible.';

  // Notes (bonus)
  const ratings = document.createElement('ul');
  ratings.className = 'ratings';
  if (movie.Ratings && movie.Ratings.length > 0) {
    movie.Ratings.forEach((rating) => {
      const li = document.createElement('li');
      li.textContent = `${rating.Source} : ${rating.Value}`;
      ratings.append(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Aucune note disponible';
    ratings.append(li);
  }

  info.append(
    title,
    createInfo('Genre', movie.Genre),
    createInfo('Acteurs', movie.Actors),
    createInfo('Réalisateur', movie.Director),
    createInfo('Durée', movie.Runtime),
    createInfo('Sortie DVD', formatDateFr(movie.DVD)),
    createHeading('Résumé'),
    plot,
    createHeading('Notes'),
    ratings
  );

  container.replaceChildren(poster, info);
}

// Point d'entrée : lit l'id dans l'URL et charge le film
async function init() {
  const id = new URLSearchParams(window.location.search).get('id');

  if (!id) {
    message.textContent = 'Aucun film sélectionné.';
    return;
  }

  try {
    const movie = await getMovieById(id, 'full');
    message.hidden = true;
    renderMovie(movie);
  } catch (error) {
    console.error(error);
    message.textContent = 'Film introuvable.';
  }
}

init();