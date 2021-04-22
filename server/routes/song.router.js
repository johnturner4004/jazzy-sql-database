const express = require('express');
const router = express.Router();

const pool = require('../modules/pool')

router.get('/', (req, res) => {
    console.log(`In /song GET`);
    // res.send(artistList);
    const sqlText = `SELECT * FROM song ORDER BY release;`;
    pool.query(sqlText)
        .then(results => {
            console.log('Got song from database', results);
            res.send(results.rows);
        })
        .catch(error => {
            console.log(`Error making query ${sqlText}`, error);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {
    let newSong = req.body;
    const queryText = `INSERT INTO "song" ("title", "length", "release")
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newSong.title, newSong.duration, newSong.released])
        .then(result => {
            console.log('Added a song to the database', result);
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;