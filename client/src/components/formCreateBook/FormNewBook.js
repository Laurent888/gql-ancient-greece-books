import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { CREATE_BOOK } from "../../utils/graphql";

const useStyles = makeStyles({
  formContainer: {
    width: "600px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    width: "100%",
    margin: "20px 0",
  },
});

const FormNewBook = () => {
  const classes = useStyles();
  const [bookInput, setBookInput] = useState({
    title: "",
    author: "",
    description: "",
    publishedYear: "",
    imageUrl: "",
  });

  const [createBook] = useMutation(CREATE_BOOK, {
    update(cache, result) {
      console.log(result);
    },
    variables: {
      title: bookInput.title,
      author: bookInput.author,
      description: bookInput.description,
      publishedYear: bookInput.publishedYear,
      imageUrl: bookInput.imageUrl,
    },
  });

  const handleChange = (e) => {
    setBookInput({
      ...bookInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook();
  };

  return (
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      <TextField
        className={classes.formInput}
        label="Title"
        name="title"
        value={bookInput.title}
        onChange={handleChange}
      />
      <TextField
        className={classes.formInput}
        label="Author"
        name="author"
        value={bookInput.author}
        onChange={handleChange}
      />
      <TextField
        className={classes.formInput}
        label="Published Year"
        name="publishedYear"
        value={bookInput.publishedYear}
        onChange={handleChange}
      />
      <TextField
        className={classes.formInput}
        multiline
        name="description"
        variant="outlined"
        rows={6}
        label="Description"
        value={bookInput.description}
        onChange={handleChange}
      />
      <TextField
        className={classes.formInput}
        label="Image Url"
        name="imageUrl"
        value={bookInput.imageUrl}
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" type="submit">
        Submit new book
      </Button>
    </form>
  );
};

export default FormNewBook;
