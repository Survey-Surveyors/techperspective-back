'use strict'

const axios = require('axios');

async function handleCloneJotFormSurvey(request, response) {
    try {
        const templateFormID = 213535497610053; //ryan's form
        const url = `https://api.jotform.com/form/${templateFormID}/clone?apiKey=${process.env.JOTFORM_API}`;

        const result = await axios.post(url);

        const newSurveyData = {
            surveyID: result.data.content.id,
            createdOn: String(new Date()).split(' ').splice(1, 3).join('-'),
            submissionCount: 0,
            results: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }

        response.status(200).send(newSurveyData);

    } catch (error) {
        response.status(400).send(error);
    }
}

module.exports = handleCloneJotFormSurvey;