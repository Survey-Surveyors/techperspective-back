'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Survey = require('./SurveyModel.js');

async function clear() {
  mongoose.connect(process.env.MONGO_DB);
  try {
    await Survey.deleteMany({});
    console.log('And there goes all the answers');
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}

clear();
