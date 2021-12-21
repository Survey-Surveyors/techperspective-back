'use strict';

// const verifyUser = require('../auth');
const Survey = require('./SurveyModel');

async function handlePostSurveyResults(req, res) {
    //   verifyUser(req, async (err, user) => {
    //     if (err) {
    //       console.error(err);
    //       res.send("Invalid Token");
    //     } else {
    try {
        const newSurvey = await Survey.create({ ...req.body });
        res.status(201).send("New Survey Answers");
    } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
    }
}
//   });
// }

module.export = handlePostSurveyResults;