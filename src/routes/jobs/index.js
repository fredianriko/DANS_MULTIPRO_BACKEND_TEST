const express = require("express");
const router = express.Router();
const { parseAuth } = require("../../authmiddleware/parseAuth");
const axios = require("axios");
const { Search } = require("../../lib/search");

// get data by auth, pagination, location, description, fulltime
router.get("/getJobList", parseAuth, async (req, res) => {
  //validate input type and existance
  const location = req.query.location ? req.query.location.toString() : "";
  const description = req.query.description ? req.query.description.toString() : "";
  const fulltime = req.query.full_time ? req.query.full_time.toString() : "";
  const page = req.query.page ? req.query.page : 1;
  const id = req.params.id ? req.params.id.toString() : null;
  console.log(id);

  let getData = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${page}`).then((response) => {
    return response.data;
  });

  //re-construct into array
  const data = [...getData];

  //   search function
  const searchData = await Search({ data, location, description, fulltime });

  res.send({ status: 200, message: "success get data", data: searchData }).status(200);
});

// get data by id
router.get("/getJobList/:id", parseAuth, async (req, res) => {
  const id = req.params.id ? req.params.id.toString() : "";
  let getData = await axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`).then((response) => {
    return response.data;
  });
  res.send(getData).status(200);
});

module.exports = router;
