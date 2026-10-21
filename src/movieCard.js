const PLACEHOLDER = 'https://placehold.co/300x445?text=Pas+d%27affiche';

// Crée la carte HTML d'un film (réutilisée sur l'accueil et la recherche)
export function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  // Poster (avec une image de remplacement si absent ou cassé)
  const img = document.createElement('img');
  img.src = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;
  img.alt = `Affiche de ${movie.Title}`;
  img.loading = 'lazy';
  img.addEventListener('error', () => { img.src = PLACEHOLDER; }, { once: true });

  const body = document.createElement('div');
  body.className = 'movie-card__body';

  // Titre
  const title = document.createElement('h3');
  title.textContent = `${movie.Title} (${movie.Year})`;
  body.append(title);

  // Résumé (seulement s'il existe)
  if (movie.Plot && movie.Plot !== 'N/A') {
    const plot = document.createElement('p');
    plot.className = 'movie-card__plot';
    plot.textContent = movie.Plot;
    body.append(plot);
  }

  // Lien vers la page détail
  const link = document.createElement('a');
  link.className = 'btn';
  link.href = `movie.html?id=${encodeURIComponent(movie.imdbID)}`;
  link.textContent = 'En savoir plus';
  body.append(link);

  card.append(img, body);
  return card;
}