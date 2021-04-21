const express = require('express');
const songRouter = express.Router();

songRouter.get('/song', (req, res) => {
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

songRouter.post('/song', (req, res) => {
    res.sendStatus(201);
    const newSong = {
        title: req.body.title,
        length: req.body.length,
        released: req.body.released
    };
    const queryText = `INSERT INTO "song" ("title", "length", "release")
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.title, req.body.length, req.body.released])
        .then(result => {
            console.log('Added a song to the database');
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        });
});

module.exports = songRouter;