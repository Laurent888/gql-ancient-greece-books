import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CircularProgress } from "@material-ui/core";

import { Context } from "../context/context";
import { GET_BOOK, GET_BOOKS } from "../utils/graphql";

const useStyles = makeStyles({
  container: {
    display: "flex",
    padding: "20px",
  },
  left: {
    width: "50%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "contain",
    objectPosition: "center",
  },
  right: {
    width: "50%",
    height: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: "1rem",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "10px",
  },
  buttonsModal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
});

const BookDetailPage = (props) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(Context);

  const bookId = props.location.state.bookId;
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache, result) {
      setOpen(false);
      props.history.push("/books");

      const data = cache.readQuery({
        query: GET_BOOKS,
      });

      cache.writeData({
        query: GET_BOOKS,
        data: {
          ...data,
          getBooks: [...data.getBooks.filter((book) => book.id !== bookId)],
        },
      });
    },
    variables: { bookId },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error...</p>;

  const {
    id,
    description,
    imageUrl,
    publishedYear,
    title,
    author,
  } = data.getBookById;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl" style={{ paddingTop: "3rem" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Delete Book</h2>
            <p>Are you sure you want to delete this book ?</p>
            <div className={classes.buttonsModal}>
              <Button
                variant="contained"
                color="default"
                disableElevation
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => {
                  deleteBook();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Paper className={classes.container}>
        <div className={classes.left}>
          <img className={classes.image} src={imageUrl} alt={title} />
        </div>
        <div className={classes.right}>
          <Typography variant="body2" color="textSecondary">
            id: {id}
          </Typography>
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
          <Typography variant="subtitle1">By {author}</Typography>
          <Typography
            variant="body1"
            style={{ paddingTop: "20px", color: "#8b8b8b" }}
          >
            {description}
          </Typography>
        </div>
      </Paper>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "flex-end",
          padding: "0 20px",
        }}
      >
        {/* SHOW DELETE BUTTON IF USER */}
        {user && (
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Delete book
          </Button>
        )}
      </div>
    </Container>
  );
};

const DELETE_BOOK = gql`
  mutation($bookId: ID!) {
    deleteBook(id: $bookId)
  }
`;

export default BookDetailPage;
