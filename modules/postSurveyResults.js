"use strict";

require("dotenv").config();
const axios = require("axios");
const { update } = require("./SurveyModel");
const verifyUser = require("../auth");
const Survey = require("./SurveyModel");

async function handlePostSurveyResults(req, res) {
    const formID = req.body.surveyID;
    if (formID === process.env.JOTFORM_TEMPLATE) {
    console.log("Can Not Delete Template");
    } else {
    const apiKey = process.env.JOTFORM_API;
    const url = `https://api.jotform.com/form/${formID}?apiKey=${apiKey}`;
    verifyUser(req, async (err, user) => {
        if (err) {
        console.error(err);
        res.send("Invalid Token");
        } else {
        try {
            const updatedSurvey = await Survey.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true, overwrite: true }
            );
            await axios.delete(url);
            res.status(202).send(updatedSurvey);
        } catch (e) {
            console.error(e);
            res.status(500).send("Server Error");
        }
        }
    });
    }
}

module.exports = handlePostSurveyResults;
