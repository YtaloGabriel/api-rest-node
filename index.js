// initial config
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// User login - Database
const DB_USER = process.env.DB_USER;
const DB_PASS = encodeURIComponent(process.env.DB_PASS);

// Read JSON / Middlewares
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// Initial Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' });
});

// API Routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Send port and connect to database
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.waghblk.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
