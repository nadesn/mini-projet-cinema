# 🎬 Mini-Projet Cinéma

Application web permettant aux clients du cinéma du village de consulter les films à l'affiche, de rechercher des films et d'afficher leurs détails. Les données proviennent de l'API [OMDb](https://www.omdbapi.com/).

**Réalisé par :** Nade SN

**Dépôt GitHub :** https://github.com/nadesn/mini-projet-cinema

## Fonctionnalités

### Accueil (`index.html`)
- Affichage d'une sélection de films tendances (poster, titre, résumé, lien vers le détail)
- Bouton pour charger plus de films sortis en 2024

### Recherche (`search.html`)
- Recherche en temps réel pendant la saisie, sans rechargement de la page
- Délai de 400 ms (debounce) pour limiter le nombre de requêtes
- Bouton pour charger plus de résultats

### Détail d'un film (`movie.html`)
- Titre, poster, résumé complet, genre, acteurs, réalisateur, durée
- Notes obtenues (IMDb, Rotten Tomatoes, Metacritic)
- Date de sortie en DVD au format français (jj/mm/aaaa)

## Technologies
- HTML, CSS, JavaScript (modules ES)
- [Vite](https://vite.dev/) : bundler et serveur de développement, avec un point d'entrée JS par page
- API OMDb

## Installation et lancement

1. Installer les dépendances :
```bash
   npm install
```
2. Créer un fichier `.env` à la racine (en copiant `.env.example`) et y mettre une clé API OMDb :
```
   VITE_OMDB_API_KEY=votre_cle_api
```
   Une clé gratuite peut être obtenue sur https://www.omdbapi.com/apikey.aspx
3. Lancer le serveur de développement :
```bash
   npm run dev
```
   puis ouvrir http://localhost:5173

Version de production : `npm run build`, puis `npm run preview`.

## Structure du projet

```
├── index.html          Page d'accueil
├── search.html         Page de recherche
├── movie.html          Page de détail d'un film
├── vite.config.js      Configuration multi-pages de Vite
└── src/
    ├── api.js          Appels à l'API OMDb (partagé)
    ├── movieCard.js    Création des cartes de films (partagé)
    ├── index.js        Script de la page d'accueil
    ├── search.js       Script de la page de recherche
    ├── movie.js        Script de la page de détail
    └── style.css       Feuille de style commune
```

## Organisation Git

- `main` : version stable et finale du projet
- `develop` : branche d'intégration du travail en cours
- `feature/*` : une branche par fonctionnalité (`feature/api-omdb`, `feature/index`, `feature/search`, `feature/movie`)
- `docs/*` : documentation

Chaque fonctionnalité est développée sur sa propre branche, puis intégrée dans `develop` via une Pull Request. `develop` est fusionnée dans `main` pour la version finale.

Les messages de commit suivent la convention [Conventional Commits](https://www.conventionalcommits.org/fr/) :

| Préfixe | Utilisation |
|---|---|
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `style:` | mise en forme / CSS |
| `docs:` | documentation |
| `chore:` | configuration, maintenance |