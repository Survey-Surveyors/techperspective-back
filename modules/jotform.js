'use strict';

const axios = require('axios');

async function handleGetJotFormSurvey(request, response) {
    // const apiKey = '0f010291ac4a46a883a9f62c2bca969f';
    // const formID = 213494408669063;
    const apiKey = process.env.JOTFORM_API;
    const formID = request.query.surveyid;
    const url = `https://api.jotform.com/form/${formID}/submissions?apiKey=${apiKey}`;

    try {
        const result = await axios.get(url);
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
            createdOn: result.data.content[0].created_at, //date survey was created
            submissionCount: result.data.resultSet.count, // responseTrue
            results: surveyResults,
        }

        response.status(200).send(surveyData);

    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports = handleGetJotFormSurvey;
