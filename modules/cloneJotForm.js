'use strict';

const axios = require('axios');
const Survey = require('./SurveyModel');
const verifyUser = require('../auth');

async function handleCloneJotFormSurvey(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      console.error(err);
      response.send('Invalid Token');
    } else {
      try {
        console.log(user);
        console.log('entered handledCloneJotFormSurvey');
        const templateFormID = 213535497610053; //ryan's form
        const url = `https://api.jotform.com/form/${templateFormID}/clone?apiKey=${process.env.JOTFORM_API}`;

        const result = await axios.post(url);

        const newSurveyData = {
          surveyID: result.data.content.id,
          createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
          submissionCount: 0,
          results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          active: true,
          ownerID: user.email
        };

        const addedSurvey = await Survey.create(newSurveyData);
        response.status(200).send(addedSurvey);
        console.log('sent new survey data to front-end: ', newSurveyData);

      } catch (error) {
        response.status(400).send(error);
      }
    }
  });
}

// async function handleCloneJotFormSurvey(request, response) {
//     verifyUser(req, async (err, user) => {
//         if (err) {
//             console.error(err);
//             res.send("Invalid Token");
//         } else {
//     try {
//         console.log('entered handledCloneJotFormSurvey');
//         const templateFormID = 213535497610053; //ryan's form
//         const url = `https://api.jotform.com/form/${templateFormID}/clone?apiKey=${process.env.JOTFORM_API}`;

//         const result = await axios.post(url);

//         const newSurveyData = {
//             surveyID: result.data.content.id,
//             createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
//             submissionCount: 0,
//             results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             active: true,
//             ownerID: user.email
//         }

//         const addedSurvey = await Survey.create(newSurveyData);
//         response.status(200).send(addedSurvey);
//         console.log('sent new survey data to front-end: ', newSurveyData);

//     } catch (error) {
//         response.status(400).send(error);
//     }
//     }
//     });
// }

module.exports = handleCloneJotFormSurvey;
