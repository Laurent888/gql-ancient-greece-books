const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    token: String
    favorites: [Book]!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    publishedYear: String!
    imageUrl: String!
  }

  input CreateUserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input CreateBookInput {
    title: String
    author: String
    description: String
    publishedYear: String
    imageUrl: String
  }

  type Query {
    getUsers: [User]!
    getUserById(id: ID!): User
    getBooks: [Book]!
    getBookById(id: ID!): Book
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    login(email: String, password: String): User
    createBook(input: CreateBookInput): Book
    deleteBook(id: ID!): String
    deleteUser(id: ID!): String
  }
`;

module.exports = typeDefs;
