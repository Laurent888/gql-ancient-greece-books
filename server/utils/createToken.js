const jwt = require("jsonwebtoken");

exports.createToken = async (user) => {
  const { id, username, email } = user;

  const payload = {
    user: {
      id,
      username,
      email,
    },
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

exports.decodeToken = async (token) => {
  try {
    const tokenData = token.split(" ")[1];
    const user = await jwt.verify(tokenData, process.env.JWT_SECRET);

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
