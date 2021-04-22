const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const artistRouter = require('./routes/artist.router.js');
app.use('/artist', artistRouter);

const songRouter = require('./routes/song.router.js');
app.use('/song', songRouter);

app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});