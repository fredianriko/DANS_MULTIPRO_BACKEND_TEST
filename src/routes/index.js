const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const subRouters = [];
const getAllSubroutes = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      getAllSubroutes(fullPath);
    } else {
      if (fullPath !== __filename) {
        subRouters.push(require(fullPath));
      }
    }
    return subRouters;
  });
};

 getAllSubroutes(__dirname)
router.use(subRouters);

module.exports = router;