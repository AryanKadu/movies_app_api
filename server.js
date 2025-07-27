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
