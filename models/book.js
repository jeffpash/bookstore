const mongoose = require('mongoose');

//Book Schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: false
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
  },
  pages: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  buy_url: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

//Get Books
module.exports.getBooks = (callback, limit) => {
  Book.find(callback).limit(limit);
}

//Get Book
module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
}

//Add Book
module.exports.addBook = (book, callback) => {
  Book.create(book, callback);
}

//Update Book
module.exports.updateBook = (id, book, options, callback) => {
  const query = {_id: id};
  const update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    publisher: book.publisher,
    pages: book.pages,
    image_url: book.image_url,
    buy_url: book.buy_url
  }
  Book.findOneAndUpdate(query, update, options, callback);
}

//Delete Book
module.exports.removeBook = (id, callback) => {
  const query = {_id: id};
  Book.remove(query, callback);
}
