import {searchMovies} from './api.js';

searchMovies('Guardians of the Galaxy').then((result) => console.log(result));

/* autre Exemple d'utilisation
searchMovies('Inception').then(({ movies, total }) => {
  console.log(`Total de films trouvés : ${total}`);
  movies.forEach((movie) => {
    console.log(`- ${movie.Title} (${movie.Year})`);
  });
});*/