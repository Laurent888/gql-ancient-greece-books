exports.validateCreateUserInput = (input) => {
  const { username, firstName, lastName, email, password } = input;
  let errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (firstName.trim() === "") {
    errors.firstName = "Firstname must not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Lastname must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length !== 0 ? false : true,
  };
};

exports.validateLoginInput = (email, password) => {
  let errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length !== 0 ? false : true,
  };
};

exports.validateCreateBookInput = (input) => {
  const { title, author, description, publishedYear, imageUrl } = input;

  let errors = {};
  if (title.trim() === "") {
    errors.title = "Title must not be empty";
  }
  if (author.trim() === "") {
    errors.author = "Author must not be empty";
  }
  if (description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (publishedYear.trim() === "") {
    errors.publishedYear = "Published year must not be empty";
  }
  if (imageUrl.trim() === "") {
    errors.imageUrl = "Image url must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length !== 0 ? false : true,
  };
};
