const express = require('express');
const cors = require('cors');
const movies = require('./data'); // This imports your exported movies array from data.js

const app = express();
const PORT = 8080;

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/genres', (req, res) => {
  const movieGenres = movies.map(movie => ({
    movie_id: movie.id,
    genres: movie.genre.split(', ').map(genre => genre.trim())
  }));
  res.json(movieGenres);
});

app.get('/api/genres', (req, res) => {
  const allGenres = new Set();
  movies.forEach(movie => {
    const movieGenres = movie.genre.split(', ').map(genre => genre.trim());
    movieGenres.forEach(genre => allGenres.add(genre));
  });
  const genresArray = Array.from(allGenres).map(genre => ({ genre }));
  res.json(genresArray);
});

app.get('/api/genre', (req, res) => {
  const { genre } = req.query;
  if (!genre) {
    return res.status(400).json({ message: 'Genre parameter is required' });
  }
  const filteredMovies = movies.filter(movie => {
    const movieGenres = movie.genre.split(', ').map(g => g.trim());
    return movieGenres.some(g => g.toLowerCase() === genre.toLowerCase());
  });
  res.json(filteredMovies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
