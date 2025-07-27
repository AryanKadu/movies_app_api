const express = require('express');
const movies = require('./data'); // This imports your exported movies array from data.js

const app = express();
const PORT = 8080;

// Endpoint to get all movies
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

const cors = require('cors');

// Allow both localhost (dev) and any production frontend (like Netlify/Vercel)
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-domain.com', // put your actual deployed frontend URL here
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this origin'));
    }
  }
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
