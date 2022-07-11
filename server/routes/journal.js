const express = require("express");
//const { route } = require('./calendar');
const router = express.Router();

//DB CONNECTION
const { getConnection } = require("../connection");

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

const symptomsObject = [
  "abdominal-cramps",
  "bloating",
  "body-aches",
  "breakouts",
  "food-cravings",
  "headache",
  "insomnia",
  "mood-swings",
  "tender-breasts",
];

const moodObject = [
  "angry",
  "annoyed",
  "excited",
  "happy",
  "neutral",
  "sad",
  "sick",
  "tired",
  "worried",
];

router
  .route("/") //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
  .post(async (req, res) => {
    try {
      let username = res.locals.username;
      let date = req.body.date;
      let cycleObject = req.body;
      let symptoms = [];
      let mood = "";

      const conn = new MongoClient(url);
      await conn.connect();

      db = conn.db("PeriodTracker");

      if (!db) {
        res.status(500).send({ err: "Internal db error on get connection" });
        return;
      }

      if (!!cycleObject.symptoms) {
        let symptomsCounter = 0;
        let symptomsLength = cycleObject.symptoms.length;
        for (let i = 0; i < symptomsLength; i++) {
          symptomsObject.forEach((symptoms) => {
            if (symptoms == cycleObject.symptoms[i]) {
              symptomsCounter++;
            }
          });
        }

        if (symptomsCounter !== symptomsLength) {
          return res
            .status(400)
            .send("The symptom being inserted into the database is not found");
        } else {
          symptoms = cycleObject.symptoms;
        }
      }

      if (!!cycleObject.mood) {
        let isMoodValid = false;

        moodObject.forEach((moods) => {
          if (moods == cycleObject.mood) {
            isMoodValid = true;
          }
        });

        if (isMoodValid) {
          mood = cycleObject.mood;
        } else {
          return res
            .status(400)
            .send("The mood you are trying to inserted is invalid.");
        }
      }

      let cycleDetails = {
        username: username,
        date: date,
        entry: cycleObject.entry,
        symptoms: symptoms,
        mood: mood,
      };

      await db.collection("journal").insertOne(cycleDetails, (err, res) => {
        err ? console.log(err) : console.log("INSERTED");
      });
      res.status(200).send("Period Cycle have been recorded");
    } catch (e) {
      res.status(500).send({ err: "Internal db error on query: " + e });
    }
  });

// .put((req,res) => {
//     let calendarDate = req.params.date;
//     //CHANGE ENTIRE JOURNAL ENTRY
// })

// router
// .route("")
// .patch((req, res) => {
//     let journalObject = req.body;
//     let mood = req.body.mood;
//     let symptoms = req.body.symptoms;
//     let entry = req.body.entry;

//     const query = {};

//     if (!!mood){
//         query.mood = mood;
//     }

//     if(!!symptoms){
//         query.symptoms = symptoms;
//     }

//     if(!!entry){
//         query.entry = entry;
//     }

//     let prevValues = { _id: journalObject._id };

//     dbo.collection("journal").updateOne(prevValues, {$set: {query}}, function(err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//         db.close();
//       });
// })

module.exports = router;
