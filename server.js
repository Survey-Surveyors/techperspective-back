"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Survey = require("./SurveyModel");
// const verifyUser = require("./auth.js");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

app.get("/test", (req, res) => {
  response.send("test request received");
});
app.get("/survey", handleGetSurvey);
app.post("/survey", handlePostSurvey);
app.delete("/survey/:id", handleDeleteSurvey);
// app.get("/user", handleGetUser);

// function handleGetUser(req, res) {
//   verifyUser(req, (err, user) => {
//     if (err) {
//       res.send("Invalid Token");
//     } else {
//       res.send(user);
//     }
//   });
// }

async function handleGetSurvey(req, res) {
//   verifyUser(req, async (err, user) => {
//     if (err) {
//       console.error(err);
//       res.send("Invalid Token");
//     } else {
      try {
        const answersFromSurveys = await Survey.find({  });
        if (answersFromSurveys) {
          res.status(200).send(answersFromSurveys);
        } else {
          res.status(404).send("Issue thinking of questions");
        }
      } catch (e) {
        console.error(e);
        res.status(500).send("Server Error");
      }
    }
//   });
// }

async function handlePostSurvey(req, res) {
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

async function handleDeleteSurvey(req, res) {
    const { id } = req.params;
    // const { email } = req.query;
    // verifyUser(req, async (err, user) => {
    //   if (err) {
    //     console.error(err);
    //     res.send("Invalid Token");
    //   } else {
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
//     });
//   }

app.listen(PORT, () => console.log("server is listening to port ", PORT));
