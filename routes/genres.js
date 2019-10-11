const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');
const { validateGenre } = require('../helpers/auth');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET INDEX GENRES
router.get('/', async (req, res) => {
    const genres = await Genre.find({})
        .sort('name')
        .limit(3);

    res.send(genres);
});

// GET MORE-GENRES ROUTE
router.get('/more-genres', async (req, res) => {
    const genres = await Genre.find({})
        .sort('name')
        .select('name')

    res.send(genres);
});

// POST GENRES ROUTE/LOGIC
router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

// UPDATE GENRE LOGIC/ROUTE
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

// DELETE GENRE ROUTE
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);

        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        res.send(genre);
    } catch (ex) {

    }
});

// GET SINGLE GENRE ROUTE
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        res.send(genre);
    } catch (ex) {
        res.send(ex.message);
        return;
    }
});




module.exports = router;