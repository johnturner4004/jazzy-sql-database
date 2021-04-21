const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

let jazzyRouter = require('./modules/pool');
app.use('/', jazzyRouter);



app.listen(PORT, () => {
    console.log('listening on port', PORT)
});
