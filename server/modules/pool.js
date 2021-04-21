const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432',
    max:10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
  console.log('Postgresql connected!');
});

pool.on('error', error => {
  console.log('Error with postgresql', error);
});

app.get('/', (req, res) => {
  let queryText = 'SELECT * FROM jazzy_sql'
  pool.query(queryText)
      .then(dbResult =>{
          res.send(dbResult.rows);
      })
      .catch((error) => {
          console.log(`Error! It broke trying to query ${queryText}`, error);
          res.sendStatus(500);
          
      });
});

app.get('/artist', (req, res) => {
  console.log(`In /artist GET`);
  // res.send(artistList);
  const sqlText = `SELECT * FROM artist ORDER BY birthdate;`;
  pool.query(sqlText)
      .then( results => {
          console.log('Got artists from database', results);
          res.send(results.rows);
      })
      .catch( error => {
          console.log(`Error making query ${sqlText}`, error);
          res.sendStatus(500);
      })
});

app.post('/artist', (req, res) => {
  // artistList.push(req.body);
  const newArtist = {
      name: req.body.name,
      birthdate: req.body.birthdate
  };

  const queryText = `INSERT INTO "artist" ("name", "birthdate")
  VALUES($1, $2);`;
  pool.query(queryText, [req.body.name, req.body.birthdate])
  .then(results => {
      console.log('new artist is:', results);
      res.sendStatus(201);
  })
  .catch(err => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
      
  });
});

app.get('/song', (req, res) => {
  console.log(`In /song GET`);
  // res.send(artistList);
  const sqlText = `SELECT * FROM song ORDER BY release;`;
  pool.query(sqlText)
      .then( results => {
          console.log('Got song from database', results);
          res.send(results.rows);
      })
      .catch( error => {
          console.log(`Error making query ${sqlText}`, error);
          res.sendStatus(500);
      })
});

app.post('/song', (req, res) => {
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

module.exports = router;