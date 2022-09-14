const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notes));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile('./db/db.json', function (err, data) {
      var parsedobj = JSON.parse(data);
      parsedobj.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(parsedobj), (err) =>
        err
        ? console.error(err)
        : res.json(parsedobj)    
        );  
      
    })
    
    
    };
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);