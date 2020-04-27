import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";

import { Context } from "../../context/context";

const authors = ["Plato", "Aristotle", "Seneca"];

const CategoryNav = () => {
  const { setAuthorPreview } = useContext(Context);

  const handleClick = (author) => {
    setAuthorPreview(author);
  };

  return (
    <Paper elevation={3}>
      <List>
        <ListItem>
          <Typography color="primary" variant="h6">
            Authors Categories
          </Typography>
        </ListItem>
        <Divider />
        {authors.map((item) => (
          <ListItem
            button
            key={item}
            onClick={() => {
              handleClick(item);
            }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryNav;
