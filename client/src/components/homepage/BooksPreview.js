import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
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
    <Paper elevation={2} style={{ padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
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

      <div style={{ display: "flex", marginTop: "20px" }}>
        {data.books.map((item, index) => (
          <Grow in={true} timeout={index * 300}>
            <div
              key={item.id}
              style={{ width: "130px", height: "250px", marginRight: "2rem" }}
            >
              <img
                src={item.imageUrl}
                alt={item.id}
                style={{
                  width: "100%",
                  objectPosition: "top",
                  objectFit: "contain",
                }}
              />
              <p>{item.title}</p>
            </div>
          </Grow>
        ))}
      </div>
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
