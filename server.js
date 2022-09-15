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

//These are the html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Below are the API routes
//This route will call the notes from the JSON and return them. Set up for repeat calls.
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', function (err, data) {
    var gotFile = JSON.parse(data);
    res.json(gotFile)
  });
  });  

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
);

//This route will take the user entry and add it to the notes JSON array
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
    });    
  };
});

//This route will call the stored notes, find the matching one, and recreate the array without it
app.delete('/api/notes/:id', (req, res) => {
  let targetId = req.params.id
  fs.readFile('./db/db.json', function (err, data) {
    var stagedArray = JSON.parse(data);
    trimmedArray = stagedArray.filter(object => object.id !== targetId);    
    fs.writeFile('./db/db.json', JSON.stringify(trimmedArray), (err) =>
        err
        ? console.error(err)
        : res.json(trimmedArray)    
        ); 
    });
});

//This tells the app what port to listen on
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);