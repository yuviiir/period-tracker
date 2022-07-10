const express = require('express');
const router = express.Router();
const {getConnection} = require('../connection');


router 
.route("/cycle/all")
.get((req, res) => {
    let username = res.locals.username;
    let db = getConnection();

    if (!db) {
        res.status(500).send({ err: "Internal db error on get connection" });
        return;
    }

    try {
        res.status(200).send(db.cycle.find({username: username}));

    } catch (e) {
        res.status(500).send({err: "Internal db error on query"})

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