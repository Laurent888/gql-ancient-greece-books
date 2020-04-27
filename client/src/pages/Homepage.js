import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Hero from "../components/homepage/Hero";
import CategoryNav from "../components/homepage/CategoryNav";
import BooksPreview from "../components/homepage/BooksPreview";

const useStyles = makeStyles({
  gridContainer: {
    padding: "1rem",
  },
});

const Homepage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item sm={12} style={{ maxHeight: "300px" }}>
          <Hero />
        </Grid>
        <Grid item xm={12} sm={3} style={{ maxHeight: "600px" }}>
          <CategoryNav />
        </Grid>
        <Grid item xm={12} sm={9} style={{ maxHeight: "600px" }}>
          <BooksPreview />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
