const express = require("express");
//const { route } = require('./calendar');
const router = express.Router();

//DB CONNECTION
const { getConnection } = require("../connection");

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

const symptomsObject = [
  "Cramps",
  "Bloating",
  "Body Aches",
  "Breakouts",
  "Cravings",
  "Headaches",
  "Insomnia",
  "Mood Swings",
  "Tender Breasts",
];

const moodObject = [
  "Angry",
  "Annoyed",
  "Excited",
  "Happy",
  "Neutral",
  "Sad",
  "Sick",
  "Tired",
  "Worried",
];

const flowStrengthObj = ["Light", "Medium", "Heavy"];

function validateMood(moodObj) {
  if (!!moodObj) {
    let isMoodValid = false;

    moodObject.forEach((moods) => {
      if (moods == moodObj) {
        isMoodValid = true;
      }
    });

    if (isMoodValid) {
      return moodObj;
    } else {
      throw "The mood you are trying to insert is invalid.";
    }
  }
}

function validateSymptoms(symptomsObj) {
  if (!!symptomsObj) {
    let symptomsCounter = 0;
    let symptomsLength = symptomsObj.length;
    for (let i = 0; i < symptomsLength; i++) {
      symptomsObject.forEach((symptoms) => {
        if (symptoms == symptomsObj[i]) {
          symptomsCounter++;
        }
      });
    }

    if (symptomsCounter !== symptomsLength) {
      throw "The symptom being inserted into the database is not found";
    } else {
      return symptomsObj;
    }
  }
}

function validateFlowStrength(flowStrength) {
  let isFlowValid = false;
  flowStrengthObj.forEach((flow) => {
    if (flowStrength.toUpperCase() == flow.toUpperCase()) {
      isFlowValid = true;
    }
  });

  if (!isFlowValid) {
    throw "The period flow is invalid.";
  } else {
    return flowStrength;
  }
}

router
  .route("/") //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
  .get(async (req, res) => {
    let username = res.locals.username;

    const conn = new MongoClient(url);
    await conn.connect();

    db = conn.db("PeriodTracker");

    if (!db) {
      res.status(500).send({ err: "Internal db error on get connection" });
      return;
    }

    try {
      let mongoRes = await db
        .collection("journal")
        .find({ username: username })
        .toArray();

      res.status(200).send(JSON.stringify(mongoRes));
    } catch (e) {
      res.status(500).send({ err: "Internal db error on query: " + e });
    }
  })
  .post(async (req, res) => {
    try {
      let username = res.locals.username;
      let date = new Date(req.body.date);
      let journalObject = req.body;
      let symptoms = [];
      let mood = "";
      let periodDateType = journalObject.periodDateType;

      let flowStrength = "";

      const conn = new MongoClient(url);
      await conn.connect();

      db = conn.db("PeriodTracker");

      if (!db) {
        res.status(500).send({ err: "Internal db error on get connection" });
        return;
      }

      if (journalObject.mood)
        try {
          mood = validateMood(journalObject.mood);
        } catch (e) {
          res.status(400).send(e);
          return;
        }

      try {
        symptoms = validateSymptoms(journalObject.symptoms);
      } catch (e) {
        res.status(400).send(e);
        return;
      }

      if (periodDateType < 0 || periodDateType > 3) {
        res.status(400).send("The period date type is invalid");
        return;
      }

      try {
        if (
          periodDateType > 0 &&
          periodDateType < 4 &&
          !!journalObject.flowStrength
        ) {
          flowStrength = validateFlowStrength(journalObject.flowStrength);
        }
      } catch (e) {
        res.status(400).send(e);
        return;
      }

      let journal = {
        username: username,
        date: date,
        notes: journalObject.notes,
        symptoms: symptoms,
        mood: mood,
        periodDateType: periodDateType,
        flowStrength: flowStrength,
      };

      await db.collection("journal").insertOne(journal, (err, res) => {
        err ? console.log(err) : console.log("INSERTED");
      });
      res.status(200).send("Period Cycle have been recorded");
    } catch (e) {
      res.status(500).send({ err: "Internal db error on query: " + e });
    }
  })

  .patch(async (req, res) => {
    try {
      let journalObject = req.body;
      let date = new Date(journalObject.date);
      let username = res.locals.username;
      let mood = undefined;
      let symptoms = undefined;
      let periodDateType = journalObject.periodDateType;
      let flowStrength = "";

      const conn = new MongoClient(url);
      await conn.connect();

      db = conn.db("PeriodTracker");

      if (!db) {
        res.status(500).send({ err: "Internal db error on get connection" });
        return;
      }

      if (!!journalObject.mood) {
        try {
          mood = validateMood(journalObject.mood);
        } catch (e) {
          res.status(400).send(e);
          return;
        }
      }

      if (!!journalObject.symptoms) {
        try {
          symptoms = validateSymptoms(journalObject.symptoms);
        } catch (e) {
          res.status(400).send(e);
          return;
        }
      }

      if (periodDateType < 0 || periodDateType > 3) {
        res.status(400).send("The period date type is invalid");
        return;
      }

      try {
        if (
          periodDateType > 0 &&
          periodDateType < 4 &&
          !!journalObject.flowStrength
        ) {
          flowStrength = validateFlowStrength(journalObject.flowStrength);
        }
      } catch (e) {
        res.status(400).send(e);
        return;
      }

      let prevValues = { username: username, date: date };
      let query = {
        $set: {
          notes: journalObject.notes,
          symptoms: symptoms,
          mood: mood,
          periodDateType: periodDateType,
          flowStrength: flowStrength,
        },
      };

      db.collection("journal").updateOne(
        prevValues,
        query,
        function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
        }
      );

      res.status(200).send("Document has been updated");
    } catch (e) {
      res.status(500).send({ err: "Internal db error on query: " + e });
    }
  });

module.exports = router;
