'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Survey = require('./modules/SurveyModel.js');

async function seed() {
    mongoose.connect(process.env.MONGO_DB);
    console.log('seed.js: seeding db with test data.');

    await Survey.create ({
        surveyID: '000005',
        createdOn: '2021-12-21 12:50:47',
        submissionCount: 9,
        results: [0, 0, 0, 0, 1, 2, 0, 0, 3, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        active: false,
    })
    await Survey.create ({
        surveyID: '000004',
        createdOn: '2021-12-19 12:03:41',
        submissionCount: 12,
        results: [0, 0, 0, 0, 1, 2, 0, 2, 3, 1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        active: false,
    })
    await Survey.create ({
        surveyID: '000003',
        createdOn: '2021-12-18 11:21:32',
        submissionCount: 15,
        results: [0, 0, 0, 0, 1, 2, 0, 0, 6, 2, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        active: false,
    })
    await Survey.create ({
        surveyID: '000002',
        createdOn: '2021-12-17 11:01:55',
        submissionCount: 9,
        results: [1, 0, 0, 0, 0, 2, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        active: false,
    })
    await Survey.create ({
        surveyID: '000001',
        createdOn: '2021-12-16 10:10:10',
        submissionCount: 5,
        results: [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        active: false,
    })

    mongoose.disconnect();
    console.log('seed.js: completed seeding data.');
}

seed();