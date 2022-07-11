const { json } = require("express");
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URL;

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
    let mongoRes = await db
      .collection("cycle")
      .find({ username: username })
      .toArray();

    res.status(200).send(JSON.stringify(mongoRes));
  } catch (e) {
    res.status(500).send({ err: "Internal db error on query: " + e });
  }
});

module.exports = router;
