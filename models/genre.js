const mongoose = require('mongoose');

//Genre Schema
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;

//Get Genres
module.exports.getGenres = (callback, limit) => {
  Genre.find(callback).limit(limit);
}

//Get Genre
module.exports.getGenreByName = (name, callback) => {
  Genre.findByName(name, callback);
}

//Add Genre
module.exports.addGenre = (genre, callback) => {
  Genre.create(genre, callback);
}

//Update Genre
module.exports.updateGenre = (id, genre, options, callback) => {
  const query = {_id: id};
  const update = {
    name: genre.name
  }
  Genre.findOneAndUpdate(query, update, options, callback);
}

//Delete Genre
module.exports.removeGenre = (id, callback) => {
  const query = {_id: id};
  Genre.remove(query, callback);
}
