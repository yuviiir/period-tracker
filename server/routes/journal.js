const express = require('express');
const { route } = require('./calendar');
const router = express.Router();

//DB CONNECTION
const {getConnection} = require('../connection');
const dbo = await getConnection();

router 
.route("/:date")
.get((req, res) => { //NEEDS MODIFICATION, THIS IS TO GET A DAYS JOURNAL ENTRY
    let calendarDate = req.params.date;
    
    //DB QUERY COMES HERE
})
.post((req,res) => {
    let calendarDate = req.params.date;
    //POST JOUNRAL ENTRY
})
.put((req,res) => {
    let calendarDate = req.params.date;
    //CHANGE ENTIRE JOURNAL ENTRY
})

router
route("/")
.patch((req, res) => {
    let journalObject = req.body;
    let mood = req.body.mood;
    let symptoms = req.body.symptoms;
    let entry = req.body.entry;

    const query = {};

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

    dbo.collection("journal").updateOne(prevValues, {$set: {query}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
})


module.exports = router;