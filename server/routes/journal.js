const express = require('express');
//const { route } = require('./calendar');
const router = express.Router();

//DB CONNECTION
const {getConnection} = require('../connection');

const {MongoClient} = require('mongodb');
const url = process.env.MONGO_URL;


// router 
// .route("/:date")
// .get((req, res) => { //NEEDS MODIFICATION, THIS IS TO GET A DAYS JOURNAL ENTRY
//     let calendarDate = req.params.date;
    
//     //DB QUERY COMES HERE
// })

router.route("")
.post(async(req,res) => {
    console.log("Hit fucken route");
    
    const conn = new MongoClient(url);
    await conn.connect();

    db = conn.db("PeriodTracker");

    let username = res.locals.username;
    let calendarDate = req.body.calendarDate;
    let symptoms = req.body.symptoms;
    let mood = req.body.mood;

    const postQuery = {username, date:calendarDate, symptoms, mood};


    db.collection("journal").insertOne(postQuery, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });

    res.status(200).send("COOLIO");

})
// .put((req,res) => {
//     let calendarDate = req.params.date;
//     //CHANGE ENTIRE JOURNAL ENTRY
// })

router
.route("")
.patch(async(req, res) => {
  
    const conn = new MongoClient(url);
    await conn.connect();

    db = conn.db("PeriodTracker");

  
    let journalObject = req.body;
    let mood = req.body.mood;
    let symptoms = req.body.symptoms;
    let entry = req.body.entry;

    const query = {journalObject, mood, symptoms, entry};

    if (!!mood){
        query.mood = mood;
    }

    if(!!symptoms){
        query.symptoms = symptoms;
    }

    if(!!entry){
        query.entry = entry;
    }

    let prevValues = { _id: journalObject._id };

    db.collection("journal").update(prevValues, {$set: {query}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        //db.close();
      });
})

module.exports = router;