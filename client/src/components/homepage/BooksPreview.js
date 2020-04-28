import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Paper, Typography, CircularProgress, Grid } from "@material-ui/core";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import Grow from "@material-ui/core/Grow";

import { Context } from "../../context/context";

const BooksPreview = () => {
  const { authorPreview } = useContext(Context);

  const { loading, error, data } = useQuery(GET_BOOKSPREVIEW, {
    variables: { author: authorPreview },
  });

  if (loading) return <CircularProgress />;
  if (error) return <p>Error...</p>;

  return (
    <Paper elevation={2} style={{ padding: "20px", boxSizing: "border-box" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <MenuBookOutlinedIcon
          color="primary"
          style={{ marginRight: "1rem", fontSize: "40px" }}
        />
        <Typography variant="h5">
          Popular books{" "}
          <span style={{ color: "#aaa", fontWeight: "300", fontSize: "16px" }}>
            by {authorPreview}
          </span>
        </Typography>
      </div>

      <Grid container spacing={10}>
        {data.books
          .filter((item, index) => index < 5)
          .map((item, index) => (
            <Grow key={item.id} in={true} timeout={index * 300}>
              <Grid item sm={6} md={2}>
                <Paper
                  style={{
                    width: "140px",
                    height: "270px",
                  }}
                >
                  <div
                    style={{ display: "block", width: "100%", height: "210px" }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.id}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectPosition: "top",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      height: "auto",

                      padding: "5px 10px",
                    }}
                  >
                    {item.title}
                  </p>
                </Paper>
              </Grid>
            </Grow>
          ))}
      </Grid>
    </Paper>
  );
};

const GET_BOOKSPREVIEW = gql`
  query($author: String) {
    books: filterBooksByAuthor(author: $author) {
      id
      title
      author
      imageUrl
    }
  }
`;

export default BooksPreview;
