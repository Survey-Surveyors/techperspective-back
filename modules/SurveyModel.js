"use strict";

require("dotenv").config();
const mongoose = require("mongoose");

const { Schema } = mongoose;

const surveySchema = new Schema({
  SurveyID: String,
  CreatedOn: String,
  SubmissionCount: Number,
  Results: [Number],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;

