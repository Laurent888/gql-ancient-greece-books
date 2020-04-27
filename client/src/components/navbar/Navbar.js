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
    fontSize: "1.5rem",
    marginRight: "auto",
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
            <div style={{ width: "50px", height: "50px" }}>
              <img
                src="https://previews.123rf.com/images/kannaa123rf/kannaa123rf1705/kannaa123rf170500110/79262385-bank-courthouse-parthenon-architecture-icon.jpg"
                alt="logo"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
            </div>
            <Button
              color="primary"
              className={classes.title}
              component={RouterLink}
              to="/"
            >
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
                style={{ marginLeft: "2rem" }}
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
