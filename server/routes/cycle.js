const express = require("express");
const router = express.Router();
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

router.route("/all").get(async (req, res) => {
  let username = res.locals.username;

  const conn = new MongoClient(url);
  await conn.connect();

  db = conn.db("PeriodTracker");

  if (!db) {
    res.status(500).send({ err: "Internal db error on get connection" });
    return;
  }

  try {
    let mongoRes = await db.collection("cycle").find({ username: username });

    res.status(200).send(mongoRes);
  } catch (e) {
    res.status(500).send({ err: "Internal db error on query: " + e });
  } finally {
    db.close();
  }
});

router
  .route("/:date") //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
  .post(async (req, res) => {
    let date = req.params.date;
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
      cycleObject.symptoms.forEach((symptom) => {
        if (!symptomsObject.find(symptom)) {
          return res
            .status(400)
            .send("The symptom being inserted into the database is not found.");
        } else {
          symptoms.push(symptom);
        }
      });
      if (!!cycleObject.mood) {
        if (!moodObject.find(cycleObject.mood)) {
          return res
            .status(400)
            .send("The mood being inserted into the database is not found.");
        } else {
          mood = cycleObject.mood;
        }
      }
      let cycleDetails = {
        username: cycleObject.username,
        date: date,
        entry: cycleObject.entry,
        symptoms: symptoms,
        mood: mood,
      };
      db.collection("cycle").insertOne(cycleDetails, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
    }

    try {
      await db.collection("cycle").insertOne({ cycleDetails });

      res.status(200).send("Period Cycle Details have been recorded");
    } catch (e) {
      res.status(500).send({ err: "Internal db error on query: " + e });
    } finally {
      db.close();
    }
  });

module.exports = router;
