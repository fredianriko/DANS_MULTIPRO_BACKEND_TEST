const express = require("express");
const router = express.Router();
const { user_model } = require("../../model/index");
const { decryptPassword } = require("../../lib/decryption");
const { signJWT } = require("../../lib/signJWT");

router.post("/login", async (req, res) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();

  // find user
  const findUser = await user_model.findOne({ where: { username: username } });

  //throw error if user not exists
  if (!findUser) {
    res.send({ message: `User ${username} not existed, please register first` });
  }

  //   compare password with decrypted function
  const comparePasswordd = await decryptPassword(password, findUser.dataValues.password);
  if (comparePasswordd === false) {
    res.send({ message: `You input wrong password for user ${username}` }).status(400);
  }

  //   sign jwt token
  const jwtPayload = {
    username: username,
  };

  const signedJWT = await signJWT(jwtPayload);

  let result;
  if (signedJWT) {
    result = {
      username: username,
      access_token: signedJWT,
    };
  }
  res.send(result).status(201);
});

module.exports = router;
