"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

const { Schema } = mongoose;

const surveySchema = new Schema({
  ClassNumber: String,
  ClassCount: [Number],
  Instructor: String,
  Survey_URL: String, //url
//   Note: String, optional
  Created_On: Date,
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;

