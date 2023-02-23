const express = require('express');
const router = express.Router();

const pool = require('./query.js');

pool.connect((err) => {
    if (err) {
        throw new Error(err.message);
    } else {
        console.log('Connected to database on 5432...');
    }
});

// Homepage
router.get('/', (req, res) => {
    res.send('Welcome to DVD Rental!').end();
});

// Get all film
router.get('/film', (req, res) => {
    const getFilm = 'SELECT * FROM film ORDER BY film_id ASC';
    pool.query(getFilm, (err, result) => {
        if (err) {
            throw new Error(err.message);
        } else {
            res.status(200).json(result.rows).end();
        }
    })
});

// Get film by id
router.get('/film/:id', (req, res) => {
    const getFilmById = `SELECT * FROM film WHERE film_id = ${req.params.id}`;
    pool.query(getFilmById, (err, result) => {
        if (err) {
            throw new Error(err.message);
        } else {
            res.status(200).json(result.rows).end();
        }

    })
});

// Get all category
router.get('/category', (req, res) => {
    const getCategory = 'SELECT * FROM category';
    pool.query(getCategory, (err, result) => {
        if (err) {
            throw new Error(err.message);
        } else {
            res.status(200).json(result.rows).end();
        }
    })
});

// Get film by category
router.get('/category/:id/film', (req, res) => {
    const getFilmByCategory = `SELECT * FROM film f LEFT JOIN film_category fc ON f.film_id = fc.film_id RIGHT JOIN category c ON fc.category_id = c.category_id WHERE fc.category_id = ${req.params.id}`;
    pool.query(getFilmByCategory, (err, result) => {
        if (err) {
            throw new Error(err.message);
        } else {
            console.log(`Banyak Film pada Category ${req.params.id} adalah ${result.rows.length}`);
            res.status(200).json(result.rows).end();
        }
    })
});

// Handle if path doesn't exists, return 404 Not Found
router.use('/', (req, res) => {
    const url = req.hostname + req.originalUrl;
    res.status(404).send(`${url} Not Found!`).end();
})

module.exports = router;