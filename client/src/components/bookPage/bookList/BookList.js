import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import BookCard from "../BookCard";
import { GET_BOOKS } from "../../../utils/graphql";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <CircularProgress />;
  if (error) return <p>There was an error....</p>;

  const renderBooks = data.getBooks.map((item) => (
    <BookCard key={item.id} book={item} />
  ));

  return (
    <Grid container spacing={5}>
      {renderBooks}
    </Grid>
  );
};

export default BookList;
