const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var auth = require('./routes/auth');

const Genre = require('./models/genre');
const Book = require('./models/book');
const users = require('./routes/users');
// const routes = require('./routes/index');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/users', users);
// app.use('/', routes);
app.use('/api/auth', auth);

 //mongoose connect
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/bookstore',
 { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successsful'))
  .catch((err) => console.error(err));

const db = mongoose.connection;

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

app.get('/', (req, res) => {
  res.send('use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
  Genre.find((err, genres) => {
    if (err)
      return res.json(err)
    res.json(genres);
  });
});

app.post('/api/genres', (req, res) => {
  const genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    if (err)
      return res.json(err)
    res.json(genre);
  });
});

app.put('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  const genre = req.body;
  Genre.updateGenre(id, genre, {}, (err, genre) => {
    if (err)
      return res.json(err)
    res.json(genre);
  });
});

app.get('/api/genres/:name', (req, res) => {
  Genre.findOne({name: req.params.name})
  .populate('books')
  .exec((err, genre) => {
    if (err)
      return res.json(err)
    res.json(genre)
  });
});
// app.post('/api/books', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     Book.addBook(req.body, function (err, book) {
//       if (err) return next(err);
//       res.json(book);
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });

app.post('/api/books', (req, res) => {
  const book = req.body;
  Book.addBook(book, (err, book) => {
    if (err)
      res.json(err)
    else
      res.json(book);
    }
  );
});
app.get('/api/books', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Book.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// app.get('/api/books', (req, res) => {
//   Book.find((err, books) => {
//     if (err)
//       return res.json(err)
//     res.json(books);
//   });
// });

app.get('/api/books/:_id', (req, res) => {
  Book.findById(req.params._id)
  .populate('genre', 'name')
  .exec((err, book) => {
    if (err)
      return res.json(err)
    res.json(book)
  });
});

app.put('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  const book = req.body;
  Book.updateBook(id, book, {}, (err, book) => {
    if (err)
      return res.json(err)
    res.json(book);
  });
});

app.delete('/api/books/:_id', (req, res) => {
  const id = req.params._id;
  Book.removeBook(id, (err, book) => {
    if (err)
      return res.json(err)
    res.json(book);
  });
});

// app.get('/api/books/:genre:_id', (req, res) => {
//   Book.findByGenre(req.params.genre_id)
// .then(genre =>{
//   genre.books.push(req.body.books)
//   return genre.save()
// })
//   .populate('genre')
//   .exec((err, book) => {
//     if (err)
//       return res.json(err)
//     res.json(book)
//   });
// });

app.delete('/api/genres/:_id', (req, res) => {
  const id = req.params._id;
  Genre.removeGenre(id, (err, genre) => {
    if (err)
      return res.json(err)
    res.json(genre);
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
//
// }


app.listen(3000, () => {
  console.log('Running server on port 3000...');
});
