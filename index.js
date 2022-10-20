// initial config
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// User login - Database
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);

// Random port Heroku
const port = process.env.PORT || 3000;

// Read JSON / Middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cors());

// Initial Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Acesse /books' });
});

// API Routes
const booksRoutes = require('./routes/booksRoutes');
app.use('/books', booksRoutes);

// Send port and connect to database
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.waghblk.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
