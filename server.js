"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Survey = require("./BookModel");
const verifyUser = require("./auth.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_MONGO);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

app.get("/test", (req, res) => {
    response.send("test request received");
  });



app.listen(PORT, () => console.log("server is listening to port ", PORT));