const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// modular route
const mainRoute = require("./routes/index");
const { sequelize } = require("./model/index");

// apply express middleware
app.use(bodyParser.json());
app.use(cors());

// console.log(sequelize)

//load database
const databaseConnection = async () => {
  try {
    sequelize.authenticate().then(() => {
      console.log("success connecting to database");
    });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

// test server
app.get("/", (req, res) => {
  res.send("Hello world");
});

//scallable route
app.use("/api", mainRoute);

// gracefull shutdown from user
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully");
  server.close(() => {
    console.log("Http server closed");
    process.exit(0);
  });
});

//  graceful shutdpwm from crash
process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully");
  server.close(() => {
    console.log("Http server closed");
    process.exit(0);
  });
});

// catch uncaught execption error
process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

// listening server
app.listen(3000, () => {
  databaseConnection();
  console.log("Server start at port 3000");
});
