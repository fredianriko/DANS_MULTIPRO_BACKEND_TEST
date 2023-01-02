const express = require("express");
const router = express.Router();
const { encryptPassword } = require("../../lib/encryption");
const { user_model } = require("../../model/index");

router.post("/register", async (req, res) => {
  const username = req.body.username.toString();
  const password = req.body.password.toString();
  const passwordConfirmation = req.body.passwordConfirmation.toString();

  if (password !== passwordConfirmation) {
    res.send({ message: "password confirmation not match with password" }).status(401);
  }

  // hash password
  let encryptedPass = await encryptPassword(password);
  let createdUser;

  try {
    createdUser = await user_model.create({
      username: username,
      password: encryptedPass.toString(),
    });
    const result = {
      id: createdUser.dataValues.id,
      username: createdUser.dataValues.username,
      created_at: createdUser.dataValues.created_at,
      updated_at: createdUser.dataValues.updated_at,
    };

    res
      .send({
        message: `Success creating ${username} user`,
        data: result,
      })
      .status(201);
  } catch (err) {
    res.status(400).send({ message: `User ${username} already exists` });
  }
});

module.exports = router;
