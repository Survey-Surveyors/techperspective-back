'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Survey = require('./modules/SurveyModel.js');

async function seed() {
    mongoose.connect(process.env.MONGO_DB);

    await Survey.create ({
        SurveyID: '000005',
        CreatedOn: '2021-12-21 12:50:47',
        SubmissionCount: 9,
        Results: [0,0,0,0,1,2,0,0,3,0,2,0,0,1,0,0,0,0,0,0,0],
    })
    await Survey.create ({
        SurveyID: '000004',
        CreatedOn: '2021-12-19 12:03:41',
        SubmissionCount: 12,
        Results: [0,0,0,0,1,2,0,2,3,1,2,0,0,1,0,0,0,0,0,0,0],
    })
    await Survey.create ({
        SurveyID: '000003',
        CreatedOn: '2021-12-18 11:21:32',
        SubmissionCount: 15,
        Results: [0,0,0,0,1,2,0,0,6,2,3,0,0,1,0,0,0,0,0,0,0],
    })
    await Survey.create ({
        SurveyID: '000002',
        CreatedOn: '2021-12-17 11:01:55',
        SubmissionCount: 9,
        Results: [1,0,0,0,0,2,0,0,3,0,2,0,0,0,0,0,0,0,0,0,1],
    })
    await Survey.create ({
        SurveyID: '000001',
        CreatedOn: '2021-12-16 10:10:10',
        SubmissionCount: 5,
        Results: [0,0,0,0,0,0,0,0,3,0,2,0,0,0,0,0,0,0,0,0,0],
    })

    mongoose.disconnect();
}

seed();