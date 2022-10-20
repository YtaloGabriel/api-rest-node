const router = require('express').Router();
const Book = require('../models/Book');

// API Routes

// POST Method - Create book
router.post('/', async (req, res) => {
  // Body of request
  const { imageLink, title, author, isbn, summary, releaseYear } = req.body;

  if (!title) {
    res.status(422).json({ error: 'O título é obrigatório!' });
    return;
  }

  const book = {
    imageLink,
    title,
    author,
    isbn,
    summary,
    releaseYear,
  };

  try {
    await Book.create(book);
    res.status(201).json({ message: 'Livro inserido no sistema com sucesso' });
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

// GET method - Read all books
router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

// GET Method - Read a unique book
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findOne({ isbn: id });
    if (!book) {
      res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// PUT Method - Update a book
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { imageLink, title, author, isbn, summary, releaseYear } = req.body;

  const book = {
    imageLink,
    title,
    author,
    isbn,
    summary,
    releaseYear,
  };

  try {
    const updatedBook = await Book.updateOne({ isbn: id }, book);

    // Check if the update was not concluded
    if (updatedBook.matchedCount === 0) {
      res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
      return;
    }

    res
      .status(200)
      .json({ message: `Livro ${id} atualizado no sistema com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE Method - delete a book
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const book = await Book.findOne({ isbn: id });
  if (!book) {
    res.status(422).json({ message: `O livro ${id} não foi encontrado.` });
    return;
  }

  try {
    await Book.deleteOne({ isbn: id });
    res.status(200).json({ message: `Livro ${id} removido com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
