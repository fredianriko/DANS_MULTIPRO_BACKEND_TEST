const jwt = require("jsonwebtoken");

exports.signJWT = async (payload) => {
  const result = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1y",
  });

  return result;
};
