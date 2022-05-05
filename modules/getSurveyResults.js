'use strict';

const verifyUser = require('../auth');
const Survey = require('./SurveyModel');

async function handleGetSurveyResults(req, res) {
  console.log('handleGetSurveyResults called');
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.send('Invalid Token');
    } else {
      try {
        const answersFromSurveys = await Survey.find({ active: false });
        if (answersFromSurveys) {
          answersFromSurveys.sort((a, b) => {
            if (a.createdOn < b.createdOn) return 1;
            if (a.createdOn > b.createdOn) return -1;
            if (a.createdOn === b.createdOn) return 0;
          });
          console.log('Returning answersFromSurvey: ', answersFromSurveys);
          res.status(200).send(answersFromSurveys);
        } else {
          res.status(404).send('Issue thinking of questions');
        }
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    }
  });
}

module.exports = handleGetSurveyResults;
