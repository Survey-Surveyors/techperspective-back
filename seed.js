'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Survey = require('./SurveyModel.js');

async function seed() {
    mongoose.connect(process.env.DB_MONGO);

    await Survey.creat ({
        
    })

    mongoose.disconnect();
}

seed();