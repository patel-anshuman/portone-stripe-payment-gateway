const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Imported DB connection
const { connection } = require("./database/db");

//Imported Middleware
const { loggerMiddleware } = require("./middlewares/logger.middleware"); // Middleware to log incoming requests

//Imported routes
const paymentIntentRoute = require("./routes/paymentIntent.route");

const app = express(); //Created Express App

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.use("/", paymentIntentRoute); // Diverted to payment intent routes

process.on("unhandledRejection", (ex) => {
  throw ex;
});

process.on("uncaughtException", (ex) => {
  logger.error(`Uncaught Exception: ${ex.message}`);
  process.exit(1);
});

//Establishing Atlas DB connection
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to Mongo DB");
    console.log(`Server running at port ${port}`);
  } catch (error) {
    console.log("Error connecting to database");
  }
});

module.exports = app; //Exported Express App
