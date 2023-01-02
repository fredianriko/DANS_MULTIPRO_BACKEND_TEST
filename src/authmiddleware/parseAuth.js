const jwt = require("jsonwebtoken");
const { user_model } = require("../model/index");

exports.parseAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.split("Bearer ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const checkUser = await user_model.findOne({ where: { username: decode.username } });
  if (!checkUser) {
    res.send({ message: `jwt token invalid , user ${decode.username} not existed` });
  }

  // console.log(decode);
  // console.log(Math.trunc(new Date() / 1000) > decode.exp);

  const getTodayEpochTime = Math.trunc(new Date() / 1000);

  if (decode) {
    if (getTodayEpochTime > decode.exp) {
      res.send({ message: `your token invalid, expired token` }).status(400);
    } else {
      req.user = { ...decode };
    }
  }
  await next();
};
