import React, { useState } from "react";
import FormNewBook from "../components/formCreateBook/FormNewBook";

import { Container, Typography } from "@material-ui/core";

import acropolis from "../image/acropolis.jpg";

const CreateBookPage = () => {
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        color="primary"
        style={{ marginTop: "40px", marginLeft: "40px" }}
      >
        Create a book here
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <FormNewBook />
        <div style={{ width: "50%", height: "100%" }}>
          <img
            src={acropolis}
            alt="acropolis"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default CreateBookPage;
