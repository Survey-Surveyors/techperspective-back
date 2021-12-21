'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Survey = require('./modules/SurveyModel.js');

async function seed() {
    mongoose.connect(process.env.MONGO_DB);

    await Survey.create ({
        ClassNumber: 'Unknown Class',
        ClassCount: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        Instructor: 'Unknown Instructor',
        Survey_URL: '', //url
        Created_On: Date,
    })

    mongoose.disconnect();
}

seed();