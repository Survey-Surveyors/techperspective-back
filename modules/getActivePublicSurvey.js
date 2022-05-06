'use strict';

const Survey = require('./SurveyModel');
const axios = require('axios');

async function handleGetActivePublicSurvey(req, res) {
  try {
    console.log('Req body: ', req.params);
    const id = req.params.id;
    const activePubSurvey = await Survey.findOne({ surveyID: id }).where({ active: true });
    console.log('Url Test: ', activePubSurvey);
    if (activePubSurvey === null) {
      return res.status(204);
    }

    const apiKey = process.env.JOTFORM_API;
    const pubUrl = `https://api.jotform.com/form/${activePubSurvey.surveyID}/submissions?apiKey=${apiKey}`;
    const results = await axios.get(pubUrl);
    console.log('got the following from JotForm.com: ', results.data.content);

    res.status(200).send(results.data.content);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
}


module.exports = handleGetActivePublicSurvey;
