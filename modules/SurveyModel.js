"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

const { Schema } = mongoose;

const surveySchema = new Schema({
  surveyID: String,
  createdOn: String,
  submissionCount: Number,
  results: [Number],
  active: Boolean,
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;

