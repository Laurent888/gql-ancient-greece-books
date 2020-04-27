const mongoose = require("mongoose");

const BookSchama = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("book", BookSchama);

module.exports = Book;
