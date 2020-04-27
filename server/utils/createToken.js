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
