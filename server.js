const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);


//Question for self: does this part need to be changed for Heroku?
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);