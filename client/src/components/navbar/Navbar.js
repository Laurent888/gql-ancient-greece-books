import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Link as RouterLink } from "react-router-dom";

import { Context } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textAlign: "start",
    fontWeight: "bold",
    fontSize: "1.6rem",
    marginRight: "10rem",
  },
  link: {
    fontSize: "16px",
    padding: "5px 20px",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const { user, logoutContext } = useContext(Context);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Button className={classes.title} component={RouterLink} to="/">
              Ancient Greece Bookstore
            </Button>

            <Button className={classes.link} component={RouterLink} to="/books">
              Books
            </Button>

            {user !== null ? (
              <>
                <Button
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to="/admin/createbook"
                >
                  Publish Book
                </Button>
                <Button
                  className={classes.link}
                  color="inherit"
                  onClick={logoutContext}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className={classes.link}
                component={RouterLink}
                to="/login"
                color="inherit"
              >
                Login
              </Button>
            )}
            {user && (
              <Typography
                variant="body2"
                color="primary"
                style={{ marginLeft: "auto" }}
              >
                Welcome {user.username}
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
