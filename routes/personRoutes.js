const router = require('express').Router();
const Person = require('../models/Person');

// API Routes

// POST Method - Create person
router.post('/', async (req, res) => {
  // Body of request
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatório!' });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' });
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

// GET method - Read all persons
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

// GET Method - Read a unique person
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res.status(422).json({ message: 'O usuário não foi encontrado.' });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// PUT Method - Update a person
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    // Check if the update was not concluded
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'O usuário não foi encontrado.' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE Method - delete a person
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: 'O usuário não foi encontrado.' });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: 'Usuário removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
