'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

const surveySchema = new Schema({
    ClassNumber : Number,
    Identifier : String,
    ClassCount : Number,
    Instructor : String,
    Thumbnail : String, //url
    Note: String //optional
  });

  const Survey = mongoose.model('Survey', surveySchema);

  module.exports = Survey;