import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    objectFit: "contain",
    objectPosition: "center",
    margin: "0 auto",
    width: 200,
    height: 260,
  },
});

const BookCard = ({ book }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => {
            history.push(`/books/${book.title.replace(" ", "-")}`, {
              bookId: book.id,
            });
          }}
        >
          <CardMedia
            className={classes.media}
            image={book.imageUrl}
            title={book.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <span
                style={{
                  color: "#8b8b8b",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
              >
                Title:
              </span>
              {book.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="p">
              <span
                style={{
                  color: "#8b8b8b",
                  fontSize: "15px",
                  marginRight: "5px",
                }}
              >
                Author:
              </span>
              {book.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default BookCard;
