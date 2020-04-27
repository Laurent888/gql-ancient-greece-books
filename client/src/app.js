import React from "react";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import CreateBookPage from "./pages/CreateBookPage";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/books" component={BooksPage} />
        <Route exact path="/books/:title" component={BookDetailPage} />
        <Route exact path="/admin/createbook" component={CreateBookPage} />
      </Switch>
    </div>
  );
};

export default App;
