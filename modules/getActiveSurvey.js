'use strict';

const Survey = require('./SurveyModel');
const axios = require('axios');
const verifyUser = require('../auth');

async function handleGetActiveSurvey(req, res) {
    // verifyUser(req, async (err, user) => {
    //     if (err) {
    //         console.error(err);
    //         res.send("Invalid Token");
    //     } else {
    try {
        const activeSurvey = await Survey.findOne({ active: true });
        // If there is no active survey send 204 and escape.
        if (activeSurvey === null) {
            return res.status(204);
        }

        // Active survey exsists, GET ths survey information from JotForm using the survey ID.
        const apiKey = process.env.JOTFORM_API;
        const url = `https://api.jotform.com/form/${activeSurvey.surveyID}/submissions?apiKey=${apiKey}`;
        const result = await axios.get(url);

        // If the survey has submissions, parse through result object to pull out relevent information
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
                _id: activeSurvey._id,
                surveyID: result.data.content[0].form_id, // 213494408669063 url can be built in front end
                createdOn: result.data.content[0].created_at.split(' ')[0], //date survey was created
                submissionCount: result.data.resultSet.count, // count of total survey submissions
                results: surveyResults, //array of total true counts
            }

            res.status(200).send(surveyData);

        // If the survey has no submissions yet, send back empty placeholder survey object
        } else {
            const surveyData = {
                _id: activeSurvey._id,
                surveyID: activeSurvey.surveyID,
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
//     })
// }

module.exports = handleGetActiveSurvey;