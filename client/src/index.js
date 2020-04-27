import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./app";
import { ContextProvider } from "./context/context";

const link = new HttpLink({
  uri: "http://localhost:4000",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </ApolloProvider>,
  document.querySelector("#root")
);
