const express = require('express');
const cors = require('cors');
const movies = require('./data'); // This imports your exported movies array from data.js

const app = express();
const PORT = 8080;

// CORS middleware - MUST be applied BEFORE routes
app.use(cors({
  origin: true, // Allow all origins for now (you can restrict this later)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

// Endpoint to get all movies
app.get('/api/movies', (req, res) => {
  console.log('Movies endpoint hit!');
  console.log('Origin:', req.headers.origin);
  res.json(movies);
});

// Endpoint to get movie IDs and their genres
app.get('/api/movies/genres', (req, res) => {
  console.log('Genres endpoint hit!');
  const movieGenres = movies.map(movie => ({
    movie_id: movie.id,
    genres: movie.genre.split(', ').map(genre => genre.trim())
  }));
  res.json(movieGenres);
});

// Endpoint to filter movies by genre
app.get('/api/genre', (req, res) => {
  const { genre } = req.query;
  
  if (!genre) {
    return res.status(400).json({ message: 'Genre parameter is required' });
  }
  
  console.log(`Filtering movies by genre: ${genre}`);
  
  const filteredMovies = movies.filter(movie => {
    const movieGenres = movie.genre.split(', ').map(g => g.trim());
    return movieGenres.some(g => g.toLowerCase() === genre.toLowerCase());
  });
  
  res.json(filteredMovies);
});

// (Optional) Endpoint to get a specific movie by ID
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
