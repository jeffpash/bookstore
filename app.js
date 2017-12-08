const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Genre = require('./models/genre');
const Book = require('./models/book');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//mongoose connect
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

app.get('/', (req, res)=> {
  res.send('use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
  Genre.find((err, genres) => {
    res.json(genres);
  });
});

app.post('/api/genres', (req, res) => {
  const genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    res.json(genre);
  });
});

app.put('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  const genre = req.body;
  Genre.updateGenre(id, genre, {}, (err, genre) => {
    res.json(genre);
  });
});

app.get('/api/genres/:name', (req, res) => {
  Genre.findOne({
        name: req.params.name
    },(err, genre) => {
    res.json(genre);
  });
});

app.get('/api/books', (req, res) => {
  Book.find((err, books) => {
    res.json(books);
  });
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  Book.addBook(book, (err, book) => {
    res.json(book);
  });
});

app.put('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  const book = req.body;
  Book.updateBook(id, book, {}, (err, book) => {
    res.json(book);
  });
});

app.get('/api/books/:_id', (req, res) => {
  Book.findById(req.params._id, (err, book) => {
    res.json(book);
  });
});

app.delete('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  Genre.removeGenre(id, (err, genre) => {
    res.json(genre);
  });
});

app.delete('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  Book.removeBook(id, (err, book) => {
    res.json(book);
  });
});

app.listen(3000, () =>{
  console.log('Running server on port 3000...');
});
