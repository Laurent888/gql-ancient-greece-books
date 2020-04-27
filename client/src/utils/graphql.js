import { gql } from "apollo-boost";

export const GET_BOOK = gql`
  query($bookId: ID!) {
    getBookById(id: $bookId) {
      id
      title
      description
      publishedYear
      imageUrl
      author
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    getBooks {
      id
      title
      author
      description
      publishedYear
      imageUrl
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation(
    $title: String
    $author: String
    $description: String
    $publishedYear: String
    $imageUrl: String
  ) {
    createBook(
      input: {
        title: $title
        author: $author
        description: $description
        publishedYear: $publishedYear
        imageUrl: $imageUrl
      }
    ) {
      id
      title
      author
      description
      publishedYear
      imageUrl
    }
  }
`;
