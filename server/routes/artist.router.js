const express = require('express');
const artistRouter = express.Router();

artistRouter.get('/', (req,res) => {
  res.send('Hello from artistRouter root route');
  
})

artistRouter.get('/', (req, res) => {
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

artistRouter.post('/', (req, res) => {
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


module.exports = artistRouter;