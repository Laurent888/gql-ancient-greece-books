import React, { useState } from "react";
import FormNewBook from "../components/formCreateBook/FormNewBook";
import { Container } from "@material-ui/core";

const CreateBookPage = () => {
  return (
    <Container maxWidth="xl">
      <h2>Create a book</h2>
      <FormNewBook />
    </Container>
  );
};

export default CreateBookPage;
