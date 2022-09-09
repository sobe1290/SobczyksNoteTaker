const express = require('express');
const path = require('path');
const notes = require('./db/db.json')

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notes));

//Question for self: does this part need to be changed for Heroku?
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);