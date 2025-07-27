const express = require('express');
const movies = require('./data'); // This imports your exported movies array from data.js

const app = express();
const PORT = 8080;

// Endpoint to get all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

const cors = require('cors');
app.use(cors()); // Allow all origins (for dev)


app.use(cors({
  origin: 'http://localhost:3000'
}));


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
