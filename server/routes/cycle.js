const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');
const url = process.env.MONGO_URL;


router 
.route("/all")
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
        let mongoRes = await db.collection("cycle").find({username: username});

        res.status(200).send(mongoRes);

    } catch (e) {
        res.status(500).send({err: "Internal db error on query: " + e})

    } finally {
        db.close();
    }

})

router
.route('/end') //THIS IS TO SHOW THE MONTH VIEW OF THE CALENDAR
.get((req, res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})

router
.route('/average')
.get((req,res) => {
     //DB QUERY COMES HERE
     
    //res.send()
})

router
.route('length')
.get((req,res) => {
    //DB QUERY COMES HERE
     
    //res.send()
})

module.exports = router;