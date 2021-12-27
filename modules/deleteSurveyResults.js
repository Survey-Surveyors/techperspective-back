"use strict";

const verifyUser = require('../auth');
const Survey = require("./SurveyModel");

async function handleDeleteSurveyResults(req, res) {
    const { id } = req.params;
    const { email } = req.query;
    verifyUser(req, async (err, user) => {
    if (err) {
        console.error(err);
        res.send("Invalid Token");
    } else {
        try {
        const survey = await Survey.findOne({ _id: id });
        if (!survey) res.status(400).send("Sorry but you can not do that");
        else {
            await Survey.findByIdAndDelete(id);
            res.status(204).send("Bye Bye Answers");
        }
        } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
        }
    }
    });
}

module.exports = handleDeleteSurveyResults;
