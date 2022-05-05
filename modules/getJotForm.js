'use strict';

const axios = require('axios');
const verifyUser = require('../auth');

async function handleGetJotFormSurvey(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      console.error(err);
      response.send('Invalid Token');
    } else {
      console.log('entered handdleGetJotFormSurvey');
      const apiKey = process.env.JOTFORM_API;
      const formID = request.query.surveyid;
      const url = `https://api.jotform.com/form/${formID}/submissions?apiKey=${apiKey}`;

      try {
        const result = await axios.get(url);
        console.log('axios call returned: ', result.data.content);

        if (result.data.content.length > 0) {
          const surveyResponseArr = result.data.content.map(userReponseObj => Object.entries(userReponseObj.answers));
          const surveyTrueCountArr = surveyResponseArr.map(answerArr => {
            return answerArr.reduce((cntTrue, curVal) => {
              return cntTrue + (curVal[1].answer === 'TRUE' ? 1 : 0);
            }, 0);
          });

          console.log('surveyresponseArr and surveyTrueCountArr: ', surveyResponseArr, surveyTrueCountArr);

          const surveyResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

          for (let i = 0; i < surveyTrueCountArr.length; i++) {
            surveyResults[surveyTrueCountArr[i] - 1]++;
          }

          const surveyData = {
            surveyID: result.data.content[0].form_id, // 213494408669063 url can be built in front end
            createdOn: result.data.content[0].created_at.split(' ')[0], //date survey was created
            submissionCount: result.data.resultSet.count, // count of total survey submissions
            results: surveyResults, //array of total true counts
            ownerID: user.email
          };

          console.log('sent response to front-end: ', surveyData);
          response.status(200).send(surveyData);
        } else {
          const surveyData = {
            surveyID: formID,
            createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
            submissionCount: 0,
            results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ownerID: user.email
          };
          response.status(200).send(surveyData);
        }

      } catch (error) {
        response.status(400).send(error);
      }
    }
  });
}

module.exports = handleGetJotFormSurvey;

