'use strict';

const Survey = require('./SurveyModel');
const axios = require('axios');

async function handleGetActiveSurvey(req, res) {
    //   verifyUser(req, async (err, user) => {
    //     if (err) {
    //       console.error(err);
    //       res.send("Invalid Token");
    //     } else {
    try {
        const activeSurvey = await Survey.findOne({ active: true });
        console.log(activeSurvey.surveyID);

        const apiKey = process.env.JOTFORM_API;
        const url = `https://api.jotform.com/form/${activeSurvey.surveyID}/submissions?apiKey=${apiKey}`;
        console.log(url);
        // try {
        const result = await axios.get(url);
        // console.log(result.data);
        if (result.data.content.length > 0) {
            const surveyResponseArr = result.data.content.map(userReponseObj => Object.entries(userReponseObj.answers));
            const surveyTrueCountArr = surveyResponseArr.map(answerArr => {
                return answerArr.reduce((cntTrue, curVal) => {
                    return cntTrue + (curVal[1].answer === 'TRUE' ? 1 : 0);
                }, 0);
            });

            const surveyResults = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (let i = 0; i < surveyTrueCountArr.length; i++) {
                surveyResults[surveyTrueCountArr[i] - 1]++;
            }

            const surveyData = {
                surveyID: result.data.content[0].form_id, // 213494408669063 url can be built in front end
                createdOn: result.data.content[0].created_at.split(' ')[0], //date survey was created
                submissionCount: result.data.resultSet.count, // count of total survey submissions
                results: surveyResults, //array of total true counts
            }

            res.status(200).send(surveyData);

        } else {
            const surveyData = {
                surveyID: formID,
                createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
                submissionCount: 0,
                results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            res.status(200).send(surveyData);
        }

    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
}

module.exports = handleGetActiveSurvey;