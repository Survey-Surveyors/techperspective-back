"use strict";

require("dotenv").config();
const axios = require("axios");
// const verifyUser = require('../auth');
const Survey = require("./SurveyModel");

async function handlePostSurveyResults(req, res) {
    if (req.body.surveyid === process.env.JOTFORM_TEMPLATE) {
    console.log("Unauthorized");
    } else {
        const formID = req.body.surveyid;
        const apiKey = process.env.JOTFORM_API;
        const url = `https://api.jotform.com/form/${formID}?apiKey=${apiKey}`;

        //   verifyUser(req, async (err, user) => {
        //     if (err) {
        //       console.error(err);
        //       res.send("Invalid Token");
        //     } else {
        try {
            const newSurvey = await Survey.create({ ...req.body });
            newSurvey.then(await axios.delete(url));
            console.log("JotForm url is ", url);
            res.status(201).send("New survey results moved from JotForm to the database");
        } catch (e) {
            console.error(e);
            res.status(500).send("Server Error");
        }
    }
}
//   });
// }

module.exports = handlePostSurveyResults;
