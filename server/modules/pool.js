const express = require('express');
const jazzyPool = express.Router();
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 30000
});

let artistRouter = require('../routes/artist.router');
app.use('/artist', artistRouter);

// let songRouter = require('../routes/song.router');
// app.use('/song', songRouter);


jazzyPool.get('/', (req,res) => {
    res.send('hello from pool root route')
})

pool.on('connect', () => {
    console.log('Postgresql connected!');
});

pool.on('error', error => {
    console.log('Error with postgresql', error);
});

jazzyPool.get('/', (req, res) => {
    let queryText = 'SELECT * FROM jazzy_sql'
    pool.query(queryText)
        .then(dbResult => {
            res.send(dbResult.rows);
        })
        .catch((error) => {
            console.log(`Error! It broke trying to query ${queryText}`, error);
            res.sendStatus(500);

        });
});

module.exports = jazzyPool;