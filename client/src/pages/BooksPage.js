import React from "react";
import Container from "@material-ui/core/Container";

import BookList from "../components/bookPage/bookList/BookList";

const BooksPage = () => {
  return (
    <Container maxWidth="xl" style={{ paddingTop: "3rem" }}>
      <BookList />
    </Container>
  );
};

export default BooksPage;
