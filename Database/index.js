const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      dbName: "MechanicOnWheels"
    })
    .then(() => {
      console.log("Successfully connected to database ");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
