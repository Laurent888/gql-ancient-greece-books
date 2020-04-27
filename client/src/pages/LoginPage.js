import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Context } from "../context/context";

const useStyles = makeStyles({
  form: {
    margin: "5rem auto",
    width: "300px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formInput: {
    margin: "20px 0",
  },
});

const LoginPage = (props) => {
  const classes = useStyles();
  const { loginContext } = useContext(Context);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN, {
    update(cache, { data }) {
      loginContext(data.login.token);
      props.history.push("/books");
    },
    variables: { email: user.email, password: user.password },
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (user.email === "" || user.password === "") {
      return;
    }
    loginUser();
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <Paper className={classes.form}>
      <Typography variant="h3" color="primary">
        Log in
      </Typography>
      <TextField
        className={classes.formInput}
        name="email"
        label="Email"
        variant="outlined"
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        className={classes.formInput}
        name="password"
        label="Password"
        variant="outlined"
        value={user.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Log in
      </Button>
    </Paper>
  );
};

const LOGIN = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default LoginPage;
