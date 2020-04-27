const { UserInputError } = require("apollo-server");

const Book = require("../models/bookModel");
const { validateCreateBookInput } = require("../utils/validators");
const { decodeToken } = require("../utils/createToken");

const bookResolvers = {
  Query: {
    getBooks: async (_, args, context) => {
      const books = await Book.find();

      return books;
    },
    getBookById: async (_, { id }, context) => {
      const res = await Book.findById(id);

      if (!res) throw new Error("No book has been found with this id");

      return {
        id: res._id,
        ...res._doc,
      };
    },
    filterBooksByAuthor: async (_, { author }, context) => {
      const books = await Book.find({ author });

      return books;
    },
  },
  Mutation: {
    createBook: async (_, { input }, { token }) => {
      const user = await decodeToken(token);

      if (!user) throw new Error("This action is not authorized");

      const { valid, errors } = validateCreateBookInput(input);

      if (valid === false)
        throw new UserInputError("One or more fields are empty", { errors });

      const { title, author, description, publishedYear, imageUrl } = input;

      // Check if Title already exists
      const titleBook = await Book.findOne({ title });

      if (titleBook)
        throw new Error(`A book with title "${title}" already exists`);

      // Create the new book
      const book = new Book({
        title,
        author,
        description,
        publishedYear,
        imageUrl,
      });

      const res = await book.save();

      return {
        id: res._id,
        ...book._doc,
      };
    },
    deleteBook: async (_, { id }, { token }) => {
      try {
        const user = await decodeToken(token);

        if (!user) throw new Error("This action is not authorized");
        const book = await Book.findById(id);

        if (!book) throw new Error("This book can't be found.");

        await Book.findByIdAndDelete(id);

        return `The book with id: ${id} has been successfully deleted.`;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = bookResolvers;
