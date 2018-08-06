const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Genre = require('./models/genre');
const Book = require('./models/book');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//mongoose connect
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

app.get('/', (req, res)=> {
  res.send('use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
  Genre.find((err, genres) => {
    if (err) return res.json(err)
    res.json(genres);
  });
});

app.post('/api/logins', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
});
}
  });
  });


app.post('/api/login', (req, res) => {
const user = {
  id: 5,
  name: 'jeffpash',
  email: 'jeff@gmail.com'
}
jwt.sign({ user}, 'secretkey', {expiresIn: '20s'}, (err, token) => {
  res.json({ token });
});
});

app.post('/api/genres', (req, res) => {
  const genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    if (err) return res.json(err)
    res.json(genre);
  });
});

app.put('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  const genre = req.body;
  Genre.updateGenre(id, genre, {}, (err, genre) => {
    if (err) return res.json(err)
    res.json(genre);
  });
});

app.get('/api/genres/:name', (req, res) => {
  Genre.findOne({name: req.params.name})
.populate('books')
.exec((err, genre) => {
  if (err) return res.json(err)
  res.json(genre)
});
});

app.get('/api/books', (req, res) => {
  Book.find((err, books) => {
    if (err) return res.json(err)
    res.json(books);
  });
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  // book.genre= mongoose.Types.ObjectId(book.genre);
  Book.addBook(book, (err, book) => {
    if (err) res.json(err)
    else res.json(book);
  });
});

app.put('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  const book = req.body;
  Book.updateBook(id, book, {}, (err, book) => {
    if (err) return res.json(err)
    res.json(book);
  });
});

app.get('/api/books/:_id', (req, res) => {
  Book.findById(req.params._id)
  .populate('genre', 'name')
  .exec((err, book) => {
    if (err) return res.json(err)
    res.json(book)
  });
});
app.get('/api/books/:genre:_id', (req, res) => {
  Book.findByGenre(req.params.genre_id)
  .populate('genre')
  .exec((err, book) => {
    if (err) return res.json(err)
    res.json(book)
  });
});

app.delete('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  Genre.removeGenre(id, (err, genre) => {
    if (err) return res.json(err)
    res.json(genre);
  });
});

app.delete('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  Book.removeBook(id, (err, book) => {
    if (err) return res.json(err)
    res.json(book);
  });
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(3000, () =>{
  console.log('Running server on port 3000...');
});
