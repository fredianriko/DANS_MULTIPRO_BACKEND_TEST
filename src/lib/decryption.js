const bcrypt = require("bcrypt");
// const user_model = require("../model/index");

exports.decryptPassword = async (password, savedPassword) => {
  const result = await bcrypt.compare(password, savedPassword);
  console.log(result);
};
