const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log(`In /artist GET`);
  // res.send(artistList);
  const sqlText = `SELECT * FROM artist ORDER BY birthdate;`;
  pool.query(sqlText)
    .then(results => {
      console.log('Got artists from database', results);
      res.send(results.rows);
    })
    .catch(error => {
      console.log(`Error making query ${sqlText}`, error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
  // artistList.push(req.body);
  console.log(req.body);
  
  let newArtist = req.body;
  const queryText = `INSERT INTO "artist" ("name", "birthdate")
  VALUES($1, $2);`;
  console.log(newArtist);
  pool.query(queryText, [newArtist.name, newArtist.birthdate])
    .then(results => {
      console.log('new artist is:', results);
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

module.exports = router;